import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { PrimeReactProvider } from "primereact/api";
import { addLocale, locale } from "primereact/api";
import { useEffect } from "react";
import TopBarComponent from "@/components/Topbar/topBar/TopBarComponent";
import theme from "@/utils/themes/theme";
import ptbr from "./../../public/pt-br.json";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "../app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showTopBar = !["/login", "/"].includes(router.pathname);

  useEffect(() => {
    addLocale("pt-br", ptbr);
    locale("pt-br");
  }, []);

  return (
    <PrimeReactProvider>
      <ChakraProvider theme={theme}>
        {showTopBar && <TopBarComponent />}
        <Component {...pageProps} />
      </ChakraProvider>
    </PrimeReactProvider>
  );
}
