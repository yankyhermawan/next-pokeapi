import { useEffect, useState } from "react";
import Card from "./Card";

interface PokeApiData {
	count: number;
	next: null;
	previous: null;
	results: PokeData[];
}

interface PokeData {
	name: string;
	url: string;
}

export default function Container() {
	const [pokedata, setPokeData] = useState<PokeData[]>([]);

	const getData = async () => {
		const response = await fetch(
			"https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
		);
		const data: PokeApiData = await response.json();
		data.results.sort((a, b) => {
			const nameA = a.name.toLowerCase();
			const nameB = b.name.toLowerCase();

			if (nameA < nameB) return -1;
			if (nameA > nameB) return 1;
			return 0;
		});
		setPokeData(data.results);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="bg-white text-black flex flex-wrap gap-4">
			{pokedata.map((data) => (
				<Card key={data.name} name={data.name} />
			))}
		</div>
	);
}
