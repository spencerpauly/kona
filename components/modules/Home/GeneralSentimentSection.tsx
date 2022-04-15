import ChartDataLabels from 'chartjs-plugin-datalabels';
import _ from 'lodash';
import { Doughnut } from 'react-chartjs-2';
import colors from 'tailwindcss/colors';
import { RYGData } from '../../../pages/api/ryg';

const options = {
	plugins: {
		legend: {
			display: false,
		},
		datalabels: {
			formatter: (value: number, ctx: any) => {
				const datapoints = ctx.chart.data.datasets[0].data;
				const total = datapoints.reduce((total: number, datapoint: number) => total + datapoint, 0);
				const percentage = (value / total) * 100;
				return percentage.toFixed(0) + '%';
			},
			color: '#333',
		},
	},
};

interface Props {
	rygData: RYGData[];
}

const GeneralSentimentSection = ({ rygData }: Props) => {
	const selectionGroups = _.groupBy(rygData, (item) => item.Selection);

	const data = {
		labels: ['Positive', 'Neutral', 'Negative'],
		datasets: [
			{
				label: '# of Selections',
				data: [
					selectionGroups.green.length,
					selectionGroups.yellow.length,
					selectionGroups.red.length,
				],
				backgroundColor: [colors.green[300], colors.yellow[300], colors.red[300]],
				borderWidth: 0,
			},
		],
	};

	return (
		<div className='bg-white rounded-lg shadow-card p-6 m-4'>
			<h3 className='font-semibold'>Current Sentiment for July</h3>
			<div className='p-4'>
				<Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
			</div>

			<div className='flex space-x-4 justify-center rounded border-gray-200 border py-2 px-2'>
				<p className='font-bold text-xs'>Since June:</p>

				<p className='font-bold text-xs text-green-500'>+10%</p>
				<p className='font-bold text-xs text-yellow-500'>-7%</p>
				<p className='font-bold text-xs text-red-500'>-3%</p>
			</div>
		</div>
	);
};

export default GeneralSentimentSection;
