import "@/styles/globals.css";
import "../styles/CodeBlock.css";
import type { AppProps } from "next/app";
import WalletContextProvider from "@/components/WalletContextProvider";
import "../styles/globals.css";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <Component {...pageProps} />
    </WalletContextProvider>
  );
}
