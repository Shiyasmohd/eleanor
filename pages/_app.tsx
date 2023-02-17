import { NextUIProvider } from '@nextui-org/react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ProvideAuth } from '../hooks/useArcanaAuth';
import getAuth from '../libs/getArcanaAuth';
import '../styles/globals.css';

const { chains, provider } = configureChains(
	[mainnet, polygon, optimism, arbitrum],
	[alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: 'My RainbowKit App',
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

const auth = getAuth();

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<ProvideAuth provider={auth}>
			<NextUIProvider>
				<WagmiConfig client={wagmiClient}>
					<RainbowKitProvider chains={chains}>
						<NextNProgress color="#1A5085" />
						<Component {...pageProps} />
					</RainbowKitProvider>
				</WagmiConfig>
			</NextUIProvider>
		</ProvideAuth>
	);
}
