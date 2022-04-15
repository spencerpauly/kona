import { useState } from 'react';
import { useFuse } from '../../../hooks/useFuse';
import { RYGData } from '../../../pages/api/ryg';

interface Props {
	rygData: RYGData[];
}

const IndividualSentimentSection = ({ rygData }: Props) => {
	const rygDataWithElaboration = rygData.filter((d) => d.Elaboration !== '').slice(0, 100);

	const [search, setSearch] = useState('');

	return (
		<div className='bg-white rounded-lg shadow-card p-6 m-4'>
			<h3 className='font-semibold'>Search Responses</h3>
			<div className='py-8'>
				<input
					type='search'
					onChange={(ev) => setSearch(ev.target.value)}
					value={search}
					className='border border-gray-300 rounded-lg p-2 my-1 w-full'
					placeholder='Search'
				/>
				<SearchList search={search} items={rygDataWithElaboration} />
			</div>
		</div>
	);
};

export default IndividualSentimentSection;

const SearchItem = ({ item }: { item: RYGData }) => (
	<div className='text-sm text-gray-600 rounded bg-gray-100 p-2'>😫 "{item.Elaboration}"</div>
);

const SearchList = ({ search, items }: { search: string; items: RYGData[] }) => {
	const results = useFuse<RYGData>({
		data: items,
		keys: ['Elaboration'],
		search,
	});

	return (
		<div className='flex flex-col space-y-4 py-4'>
			{results.length > 0
				? results.slice(0, 5).map((r) => <SearchItem item={r.item} key={r.item.Id} />)
				: items.slice(0, 5).map((item) => <SearchItem item={item} key={item.Id} />)}
		</div>
	);
};
