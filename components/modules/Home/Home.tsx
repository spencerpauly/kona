import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { toDate } from 'date-fns';
import _ from 'lodash';
import { RYGData } from '../../../pages/api/ryg';
import GeneralSentimentSection from './GeneralSentimentSection';
import IndividualSentimentSection from './IndividualSentimentSection';
import TeamsOverviewSection from './TeamsOverviewSection';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
	rygData: RYGData[];
}

const Home = ({ rygData }: Props) => {
	const result = _.groupBy(rygData, (item) => toDate(parseFloat(item.Timestamp)));

	return (
		<main>
			<h1 className='font-bold text-2xl'>Dashboard</h1>
			<p className='font-semibold text-gray-800 text-sm'>
				View the 10,000 foot view of your company's well-being.
			</p>
			<div className='grid grid-cols-12 py-12 '>
				<div className='col-span-12 xl:col-span-4 md:col-span-8'>
					<GeneralSentimentSection rygData={rygData} />
				</div>
				<div className='col-span-0 xl:col-span-8 md:col-span-4 bg-white rounded-lg shadow-card p-4 m-4' />
				<div className='col-span-12'>
					<TeamsOverviewSection rygData={rygData} />
				</div>
				<div className='col-span-12'>
					<IndividualSentimentSection rygData={rygData} />{' '}
				</div>
				<div className='col-span-4 bg-white rounded-lg shadow-card p-4 m-4'></div>
				<div className='col-span-4 bg-white rounded-lg shadow-card p-4 m-4 h-16'></div>
				<div className='col-span-4 bg-white rounded-lg shadow-card p-4 m-4'></div>
			</div>
		</main>
	);
};

export default Home;
