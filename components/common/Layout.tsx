import Head from 'next/head';
import SideNav from './SideNav';

interface Props {
	children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
	return (
		<div>
			<Head>
				<title>Kona | dashboard</title>
				<meta name='description' content='Kona | dashboard' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='grid grid-cols-12'>
				<div className='sm:col-span-3 col-span-2 min-h-screen'>
					<SideNav />
				</div>
				<div className='sm:col-span-9 col-span-10'>
					<div className='p-12 bg-gray-100 min-h-full'>{children}</div>
				</div>
			</main>
		</div>
	);
};

export default Layout;
