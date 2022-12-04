import { useMantineTheme } from "@mantine/core";
import { InstrumentType } from "avanza-ts";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Margin } from "recharts/types/util/types";
import { usePriceChart } from "../../hooks/usePriceChart";
import { format } from "date-fns";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

interface SecurityChartProps {
  instrumentType: InstrumentType;
  instrumentId: string;
  margin?: Margin;
  children?: React.ReactNode;
}

const formatXAxis = (tickItem: number) => {
  try {
    return format(new Date(tickItem), "yyyy-MM-dd");
  } catch (e) {
    return tickItem.toString();
  }
};

const SecurityChart: React.FC<SecurityChartProps> = ({
  instrumentId,
  instrumentType,
  margin,
  children,
}) => {
  const theme = useMantineTheme();
  const { data, isFetching, error } = usePriceChart(
    instrumentType,
    instrumentId
  );
  console.log(data, isFetching, error);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={300}
        data={data?.ohlc ?? []}
        margin={margin}
      >
        <defs>
          <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.colors.blue[6]}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={theme.colors.blue[6]}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.colors.green[6]}
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor={theme.colors.green[6]}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis
          type="number"
          domain={["dataMin", "dataMax"]}
          dataKey="timestamp"
          name="Time"
          tickFormatter={formatXAxis}
        />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.colors.dark[7],
            borderColor: theme.colors.gray[8],
          }}
        />
        <Area
          type="linear"
          dataKey="close"
          stroke={theme.colors.green[6]}
          dot={false}
          fill="url(#greenGradient)"
          activeDot={{ r: 8 }}
        />
        {children}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SecurityChart;
