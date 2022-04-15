import type { GetServerSideProps, NextPage } from 'next';
import Layout from '../components/common/Layout';
import Home from '../components/modules/Home/Home';
import { config } from '../config';
import { RYGData } from './api/ryg';

interface Props {
	rygData: RYGData[];
}

const Index: NextPage<Props> = ({ rygData }) => {
	return (
		<Layout>
			<Home rygData={rygData} />
		</Layout>
	);
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const result = await fetch(`${config.apiUrl}/api/ryg`).then((res) => res.json());

	return {
		props: {
			rygData: result.rygData,
		},
	};
};
