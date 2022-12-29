from typing import List, Optional
from fastapi import FastAPI
import yfinance as yf
from pypfopt import risk_models
from pypfopt import CLA
from datetime import datetime, timedelta
from pandas import DataFrame
import requests
from pydantic import BaseModel

app = FastAPI()


class Optimize(BaseModel):
    tickers: List[str]
    start: Optional[str] = None
    end: Optional[str] = None
    allow_shorting: bool = False


@app.post(
    "/portfolio/optimize",
)
async def optimize(
    data: Optimize,
):
    start, end = fix_date_params(data.start, data.end)
    ohlc = yf.download(data.tickers + ["SPY"], start=start, end=end)
    convert_yf_ohlc_from_other_exhanges_to_USD(ohlc)

    prices = ohlc["Adj Close"].dropna(how="all")
    market = prices.pop("SPY")
    mu = capm_return(prices, market)
    S = risk_models.CovarianceShrinkage(prices).ledoit_wolf()

    weight_bounds = (-1, 1) if data.allow_shorting else (0, 1)

    cla = CLA(expected_returns=mu, cov_matrix=S, weight_bounds=weight_bounds)
    cla.max_sharpe()

    weights = cla.clean_weights()
    returns, volatility, sharpe = cla.portfolio_performance()

    return {
        "period": {"start": start, "end": end},
        "weights": dict(weights),
        "returns": returns,
        "volatility": volatility,
        "sharpe": sharpe,
    }


def fix_date_params(start: Optional[str], end: Optional[str]):
    if end is None:
        end = str(datetime.now().date())
    if start is None:
        start = str((datetime.strptime(end, "%Y-%m-%d") - timedelta(days=365)).date())
    return start, end


def ending_to_currency_mapping(ending: str):
    if ending == "ST":
        return "sek"
    if ending == "OL":
        return "nok"
    if ending == "L":
        return "gbp"
    return ending


def get_currency_exchange_factor(ending: str):
    response = requests.get(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json"
    )

    data = response.json()
    cur = ending_to_currency_mapping(ending)

    try:
        return data["usd"][cur]
    except:
        return None


def convert_yf_ohlc_from_other_exhanges_to_USD(yf_ohlc):
    for ticker in yf_ohlc["Adj Close"].columns:
        ticker_split = ticker.split(".")
        if len(ticker_split) == 2:
            ending = ticker_split[1]
            factor = get_currency_exchange_factor(ending)

            if factor is None:
                raise Exception(f"could not convert {ticker} to USD")

            yf_ohlc.loc[:, ("Adj Close", ticker)] = (
                yf_ohlc.loc[:, ("Adj Close", ticker)] * factor
            )


def capm_return(
    prices,
    market_prices,
    is_returns_not_prices=False,
    risk_free_rate=0.02,
    compounding=True,
):
    frequency = len(market_prices)
    returns = None

    if is_returns_not_prices:
        returns = prices
        market_returns = market_prices
    else:
        returns = returns_from_prices(prices)
        market_returns = returns_from_prices(market_prices)

    market_returns.name = "mkt"
    returns = returns.join(market_returns, how="left")

    cov = returns.cov()

    betas = cov["mkt"] / cov.loc["mkt", "mkt"]
    betas = betas.drop("mkt")

    if compounding:
        mkt_mean_ret = (1 + returns["mkt"]).prod() ** (
            frequency / returns["mkt"].count()
        ) - 1
    else:
        mkt_mean_ret = returns["mkt"].mean() * frequency

    return risk_free_rate + betas * (mkt_mean_ret - risk_free_rate)


def returns_from_prices(prices: DataFrame):
    return prices.pct_change().dropna(how="all")
