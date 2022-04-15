import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import _ from 'lodash';
import { Doughnut } from 'react-chartjs-2';
import { BsPersonFill } from 'react-icons/bs';
import seedrandom from 'seedrandom';
import colors from 'tailwindcss/colors';
import { RYGData } from '../../../pages/api/ryg';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
	teamRYGData: RYGData[];
}

const options = {
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			enabled: false,
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

const TeamOverview = ({ teamRYGData }: Props) => {
	const selectionGroups = _.groupBy(teamRYGData, (item) => item.Selection);

	const teamName = teamRYGData[0].SlackTeamId;
	const teamCount = new Set(teamRYGData.map((i) => i.SlackUserId)).size;

	// stack overflow idk how this works
	function randIntWithSeed(seed: string, max = 1) {
		/* returns a random number between [0,max] including zero and max
  seed can be either string or integer */
		return Math.round(new seedrandom('seed' + seed)() * max);
	}

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

	const green = randIntWithSeed(teamName, 10);
	const yellow = randIntWithSeed(teamName, 4);
	const changeSinceLastMonth = {
		green: green > 0 ? `+${green}%` : `-${green}%`,
		yellow: yellow > 0 ? `+${yellow}%` : `-${yellow}%`,
		red: green + yellow > 0 ? `-${green + yellow}%` : `+${green + yellow}%`,
	};

	return (
		<div className='flex flex-row items-center justify-between'>
			<div className='flex space-x-4'>
				<div className='w-12'>
					<Doughnut data={data} options={options} />
				</div>
				<div>
					<h4 className=' text-smtext-gray-900'>{teamName}</h4>
					<div className='text-xs flex items-center font-bold'>
						<BsPersonFill className='inline mr-1' /> {teamCount}
					</div>
				</div>
			</div>

			<div className='flex space-x-4 justify-center rounded border-gray-200 border py-2 px-4'>
				<p className='font-bold text-xs'>Since June:</p>

				<p className='font-bold text-xs text-green-500'>{changeSinceLastMonth.green}</p>
				<p className='font-bold text-xs text-yellow-500'>{changeSinceLastMonth.yellow}</p>
				<p className='font-bold text-xs text-red-500'>{changeSinceLastMonth.red}</p>
			</div>
		</div>
	);
};

export default TeamOverview;
