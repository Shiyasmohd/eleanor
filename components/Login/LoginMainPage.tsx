import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
// import Logo from '../../public/logo.png';
// import styles from './Login.module.css';

const LoginMainPage = () => {
	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	return (
		<div className="w-full h-[100vh]">
			<Head>
				<title>TickGate | Login</title>
			</Head>
			<div className={`${styles.loginPage} w-full h-full flex justify-center items-center`}>
				<motion.ul
					className="container w-[90%] max-w-[650px] p-3 py-10 rounded-xl flex justify-center flex-col shadow-xl"
					variants={container}
					initial="hidden"
					animate="visible"
				>
					<motion.li className="item w-full flex justify-center gap-1" variants={item}>
						<div className="w-[225px]">
							<Image src={Logo} alt="logo" />
						</div>
					</motion.li>
					<motion.li className="item w-full flex justify-center flex-col items-center gap-4" variants={item}>
						<h4 className="tracking-wide"> Connect Your Wallet to Continue</h4>
						<ConnectButton />
					</motion.li>
				</motion.ul>
			</div>
		</div>
	);
};

export default LoginMainPage;
