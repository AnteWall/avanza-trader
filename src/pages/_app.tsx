import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import type { AppProps } from "next/app";
import { Roboto, Montserrat } from "@next/font/google";
import { OrdersProvider } from "../context/OrdersContext";
import dynamic from "next/dynamic";
import Spotlight from "../components/Spotlight";
import { NotificationsProvider } from "@mantine/notifications";
const AvanzaContextProvider = dynamic(
  () => import("../context/AvanzaContext").then((m) => m.AvanzaContextProvider),
  { ssr: false }
);

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });
const montserrat = Montserrat({ weight: ["500"], subsets: ["latin"] });

const THEME: MantineThemeOverride = {
  colorScheme: "dark",
  fontFamily: roboto.style.fontFamily,
  primaryColor: "green",
  headings: {
    fontFamily: montserrat.style.fontFamily,
    fontWeight: 500,
  },
  globalStyles: () => ({
    html: {
      height: "100%",
    },
    "body, #__next": {
      height: "100%",
    },
  }),
};

function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={THEME}>
      <NotificationsProvider>
        <AvanzaContextProvider>
          <Spotlight>
            <OrdersProvider>
              <Component {...pageProps} />
            </OrdersProvider>
          </Spotlight>
        </AvanzaContextProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
