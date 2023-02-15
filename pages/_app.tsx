import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import '@rainbow-me/rainbowkit/styles.css';
import NextNProgress from 'nextjs-progressbar';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { useRouter } from 'next/router';

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  return (
    <NextUIProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
            <NextNProgress color="#1A5085" />
              <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </NextUIProvider>
  ) 
}
