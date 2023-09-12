import { useEffect, useState } from "react";
import Card from "./Card";

interface PokeApiData {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokeData[];
}

interface PokeData {
	name: string;
	url: string;
}

export default function Container() {
	const [pokedata, setPokeData] = useState<PokeData[]>([]);
	const [page, setPage] = useState(0);

	// const dataSort = (data: PokeApiData) => {
	// 	data.results.sort((a, b) => {
	// 		const nameA = a.name.toLowerCase();
	// 		const nameB = b.name.toLowerCase();

	// 		if (nameA < nameB) return -1;
	// 		if (nameA > nameB) return 1;
	// 		return 0;
	// 	});
	// 	return data;
	// };

	const getData = async () => {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=25&offset=${page}`
		);
		const data: PokeApiData = await response.json();
		// dataSort(data);
		setPokeData(data.results);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="text-black flex flex-wrap gap-4">
			{pokedata.map((data) => (
				<Card key={data.name} name={data.name} url={data.url} />
			))}
		</div>
	);
}
