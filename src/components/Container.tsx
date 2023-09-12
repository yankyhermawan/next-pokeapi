import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";

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
	const { pageNumber } = useParams();
	const [totalPages, setTotalPages] = useState(0);

	const getData = async () => {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=54&offset=${
				(Number(pageNumber) - 1) * 54
			}`
		);
		const data: PokeApiData = await response.json();
		setPokeData(data.results);
		setTotalPages(Math.ceil(Number(data.count) / 54));
	};
	const getPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i);
		}
		return pageNumbers;
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<div className="text-black flex flex-wrap gap-4 h-max justify-center">
				{pokedata.map((data) => (
					<Card key={data.name} name={data.name} url={data.url} />
				))}
			</div>
			<div className="flex flex-row m-8 justify-center gap-4">
				<Pagination
					currentPage={Number(pageNumber)}
					totalPages={getPageNumbers()}
				/>
			</div>
		</>
	);
}
