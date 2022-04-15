import type { NextPage } from 'next';
import Image from 'next/image';
import Layout from '../components/common/Layout';
import { RYGData } from './api/ryg';

interface Props {
	rygData: RYGData[];
}

const Settings: NextPage<Props> = ({ rygData }) => {
	return (
		<Layout>
			<div className='h-full w-full'>
				<Image
					src='https://c.tenor.com/GWt2uLFb9kEAAAAC/kanye-dancing.gif'
					width='600px'
					height='600px'
				/>
			</div>
		</Layout>
	);
};

export default Settings;
