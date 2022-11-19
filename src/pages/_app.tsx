import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import type { AppProps } from "next/app";
import { Roboto, Montserrat } from "@next/font/google";

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
};
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={THEME}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
