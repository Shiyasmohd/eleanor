import React from 'react';
import HomeUser from '../components/HomeUser/HomeUser';
import { useArcanaAuth } from '../hooks/useArcanaAuth';

interface ArcanaAuthWithCallableConnect {
	connect: () => Promise<void>;
	user?: {
		email?: string;
		name?: string;
	};
	isLoggedIn: boolean;
	loading: boolean;
	loginWithSocial: (provider: string) => Promise<void>;
	provider: any;
}

export default function Main() {
	const { user, connect, isLoggedIn, loading, loginWithSocial, provider } =
		useArcanaAuth() as ArcanaAuthWithCallableConnect;
	const onConnectClick = async () => {
		try {
			await connect();
		} catch (e) {
			console.log(e);
		}
	};
	const onConnect = () => {
		console.log('connected');
	};

	React.useEffect(() => {
		provider.on('connect', onConnect);
		return () => {
			provider.removeListener('connect', onConnect);
		};
	}, [provider]);
	return (
		<div className="bg-gray-100 ">
			<div className="container mx-auto grid place-items-center min-h-screen">
				<div className="bg-white rounded-lg p-5 shadow-sm w-1/2 grid place-items-center">
					{loading && <div>Loading...</div>}
					{!loading && !isLoggedIn && (
						<>
							<h4 className="tracking-wide my-5"> Connect Your Wallet to Continue</h4>
							<button
								className="bg-[#000] hover:bg-[#333] rounded text-white px-4 py-2"
								onClick={onConnectClick}
							>
								Connect
							</button>
						</>
					)}
					{!loading && isLoggedIn && <HomeUser/>}
				</div>
			</div>
		</div>
	);
}
