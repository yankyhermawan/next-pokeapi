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
	const defaultPokeApiData = {
		count: 0,
		next: null,
		previous: null,
		results: [],
	};
	const [pokedata, setPokeData] = useState<PokeApiData>(defaultPokeApiData);
	const [dataToShow, setDataToShow] = useState<PokeData[]>([]);
	const { pageNumber } = useParams();
	const [totalPages, setTotalPages] = useState(0);
	const [searchValue, setSearchValue] = useState("");

	const getData = async () => {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=10000`
		);
		const data: PokeApiData = await response.json();
		setPokeData(data);
	};
	const getPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i);
		}
		return pageNumbers;
	};

	const paginationData = (data: PokeData[]) => {
		const itemsPerPage = 56;
		const startIndex = (Number(pageNumber) - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const currentPageData = data.slice(startIndex, endIndex);
		return currentPageData;
	};

	const filterData = () => {
		if (!searchValue) {
			setDataToShow(paginationData(pokedata.results));
			setTotalPages(Math.ceil(Number(pokedata.results.length) / 56));
		} else {
			const filteredData = pokedata.results.filter((pokemon) => {
				return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
			});
			const paginatedData = paginationData(filteredData);
			setDataToShow(paginatedData);
			setTotalPages(Math.ceil(Number(paginatedData.length) / 56));
		}
	};

	useEffect(() => {
		getData();
	}, []);
	useEffect(() => {
		// Run filterData when pokedata or searchValue changes
		filterData();
	}, [pokedata, searchValue]);
	const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return (
		<div className="flex flex-col items-center">
			<input
				type="text"
				className="px-8 py-2 border-black border-solid border-[1px] rounded-full m-8 w-[50%] text-xl text-center"
				value={searchValue}
				onChange={setInput}
			/>
			<div className="text-black flex flex-wrap gap-4 h-max justify-center mx-auto">
				{dataToShow.map((data) => (
					<Card key={data.name} name={data.name} />
				))}
			</div>
			<div className="flex flex-row m-8 justify-center gap-4">
				<Pagination
					currentPage={Number(pageNumber)}
					totalPages={getPageNumbers()}
				/>
			</div>
		</div>
	);
}
