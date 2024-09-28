import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import '../app/globals.css';
import { useRouter } from "next/router";
import TopBarComponent from "@/components/Topbar/topBar/TopBarComponent";
import theme from "@/utils/themes/theme";


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showTopBar = !['/login', '/'].includes(router.pathname);

  return (
    <ChakraProvider theme={theme}>
      {showTopBar && <TopBarComponent />}
      <Component {...pageProps} />
    </ChakraProvider>
  )
}