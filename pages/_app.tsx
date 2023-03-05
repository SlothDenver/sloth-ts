import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import Web3Manager from "@/helper/Web3Manager";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "@/helper/getLibrary";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Denver Sloths on the Run</title>
        <meta name="title" property="og:title" content="Sloths on the Run" />
        <meta name="description" content="ETH DENVER 2023"/>
        <meta name="image" property="og:image" content="/sloth-logo_180x180.png" />
        <meta name="url" property="og:url" content="http://denversloths.xyz" />
        <meta property="og:locale" content="en_EN" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_sloths.png" />
        <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/sloth-logo_180x180.png"
          />
          
      </Head>

    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Manager>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#F1FF00",
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
      </Web3Manager>
      </Web3ReactProvider>
    </>
  );
}
