import Link from 'next/link';
import {
	BsBarChartFill,
	BsGearFill,
	BsHandThumbsUpFill,
	BsPeaceFill,
	BsPeopleFill,
} from 'react-icons/bs';

const routes = [
	{
		name: 'Dashboard',
		path: '/',
		icon: BsHandThumbsUpFill,
	},
	{
		name: 'Team Breakdown',
		path: '/team',
		icon: BsPeaceFill,
	},
	{
		name: 'Employee Breakdown',
		path: '/employee',
		icon: BsPeopleFill,
	},
	{
		name: 'Trends',
		path: '/trends',
		icon: BsBarChartFill,
	},
	{
		name: 'Settings',
		path: '/settings',
		icon: BsGearFill,
	},
];
const SideNav = () => (
	<div className='bg-gray-200 h-full w-full'>
		<div className='p-12 flex flex-col space-y-12'>
			<h1 className='font-bold text-2xl text-gray-800'>Kona 🐶</h1>
			<div>
				{routes.map((route) => (
					<Link href={route.path} key={route.path}>
						<a className='rounded text-gray-800 px-2 py-4 hover:bg-gray-300 text-sm font-bold flex space-x-2 items-center'>
							{route.icon && <route.icon className='w-4 h-4 mr-2' />}
							{route.name}
						</a>
					</Link>
				))}
			</div>
		</div>
	</div>
);

export default SideNav;
