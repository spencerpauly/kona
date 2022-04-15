import _ from 'lodash';
import { RYGData } from '../../../pages/api/ryg';
import TeamOverview from './TeamOverview';

interface Props {
	rygData: RYGData[];
}

const TeamsOverviewSection = ({ rygData }: Props) => {
	const teams = Object.entries(_.groupBy(rygData, (item) => item.SlackTeamId));
	return (
		<div className='bg-white rounded-lg shadow-card p-6 m-4'>
			<h3 className='font-semibold'>Breakdown by Team</h3>
			<div className='py-8 flex flex-col space-y-8'>
				{teams.map(([key, team]) => (
					<div key={key}>
						<TeamOverview teamRYGData={team} />
					</div>
				))}
			</div>
		</div>
	);
};

export default TeamsOverviewSection;
