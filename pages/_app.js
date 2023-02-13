import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import styled from "styled-components";
import Header from "./components/Header";
//import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const alchemyKey = "w7eEPiIoWugKjoU7vCuJhmfwAihhPNqQ";

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: alchemyKey,
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "ROK",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          borderRadius: "small",
          accentColor: "#222222",
          accentColorForeground: "#FFFFFF",
          //actionButtonBorder: "#222222",
          overlayBlur: "small",
          //fontStack: "rounded",
          fontStack: "Roboto Mono",
        })}
      >
        <Container>
          <Header />
        </Container>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

const Container = styled.div``;
/* <Component {...pageProps} />*/
