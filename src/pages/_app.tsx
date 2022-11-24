import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import type { AppProps } from "next/app";
import { Roboto, Montserrat } from "@next/font/google";
import { OrdersProvider } from "../context/OrdersContext";
import dynamic from "next/dynamic";
import { SpotlightProvider } from "@mantine/spotlight";
import { Home, LogOut } from "react-feather";
import SpotlightActionsWrapper from "../components/SpotlightActionsWrapper";
import { useRouter } from "next/router";
import { homePath } from "../utils/routes";
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
  const router = useRouter();
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={THEME}>
      <AvanzaContextProvider>
        <SpotlightProvider
          highlightColor="teal"
          highlightQuery
          actions={[
            {
              title: "Dashboard",
              group: "Navigation",
              description: "Go to dashboard page",
              onTrigger: () => {
                router.push(homePath());
              },
              icon: <Home />,
            },
            {
              title: "Sign out",
              group: "Navigation",
              description: "Sign out of your account",
              onTrigger: () => {
                console.log("Sign out");
              },
              icon: <LogOut />,
            },
          ]}
          actionsWrapperComponent={SpotlightActionsWrapper}
        >
          <OrdersProvider>
            <Component {...pageProps} />
          </OrdersProvider>
        </SpotlightProvider>
      </AvanzaContextProvider>
    </MantineProvider>
  );
}
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
