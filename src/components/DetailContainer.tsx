import { DataFetched, titleCase } from "./Card";
import {
	Chain,
	setBGURL,
	initStatsValues,
	typeColors,
	getBeforeAfter,
	convertImage,
} from "./Detail";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import noImageIcon from "../resource/no-image-icon.png";
import StatsTable from "./Stats";
import EvolutionChain from "./EvolutionChain";
import TypeComponent from "./Type";
import BeforeAfterName from "./BeforeAfterName";
import LoadingComponent from "./LoadingComponent";

export default function DetailContainer() {
	const typeColor: Record<string, string> = useMemo(
		() => {
			return typeColors;
		},
		[] // Empty dependency array, memoized once when component mounts
	);

	const { id } = useParams();
	const [stats, setStats] = useState(initStatsValues);
	const [name, setName] = useState("");
	const [types, setTypes] = useState<string[]>([]);
	const [url, setUrl] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [evolutionChain, setEvolutionChain] = useState<string[][]>([[""]]);
	const [evolutionChainURL, setEvolutionChainURL] = useState<string[][]>([
		[""],
	]);
	const [evolutionID, setEvolutionID] = useState<number[][]>([[0]]);
	const [beforeNextName, setBeforeNextName] = useState({
		before: "",
		next: "",
	});

	const getData = async () => {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const data: DataFetched = await response.json();
		setName(data.name);
		const newData: string[] = [];
		data.types.map((type) => {
			newData.push(type.type.name);
		});
		setTypes(newData);
		const newStatsArray = data.stats.map((stat) => ({
			base_stat: stat.base_stat,
			effort: stat.effort,
			stat: {
				name: stat.stat.name,
				url: stat.stat.url,
			},
		}));
		setStats(newStatsArray);
		setUrl(setBGURL(data, url));
		await getBeforeAfter(String(id), setBeforeNextName);
		getPokemonEvolutionChain();
	};

	async function getPokemonEvolutionChain() {
		const speciesResponse = await fetch(
			`https://pokeapi.co/api/v2/pokemon-species/${id}/`
		);
		const speciesData = await speciesResponse.json();
		const response = await fetch(speciesData.evolution_chain.url);
		const data = await response.json();
		const evolutionChainData: Chain = data.chain;

		function traverseChain(chain: Chain) {
			const evolutionArray = [chain.species.name];

			if (chain.evolves_to.length > 0) {
				chain.evolves_to.forEach((evolution) => {
					const subEvolution = traverseChain(evolution);
					evolutionArray.push(...subEvolution);
				});
			}

			return evolutionArray;
		}

		const evolutionArrays: string[][] = [];

		evolutionChainData.evolves_to.forEach((evolution) => {
			const evolutionArray = traverseChain(evolution);
			evolutionArray.unshift(evolutionChainData.species.name);
			evolutionArrays.push(evolutionArray);
		});
		setEvolutionChain(evolutionArrays);
		convertImage(setEvolutionChainURL, setEvolutionID, evolutionChain);
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				await getData();
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false); // Handle errors appropriately
			}
		};
		fetchData(); // Call fetchData immediately

		// Define a separate effect to handle getPokemonEvolutionChain
		const handlePokemonEvolutionChain = async () => {
			if (evolutionChain.length === 0) {
				// This ensures getPokemonEvolutionChain is called only once
				await getPokemonEvolutionChain();
			}
		};

		handlePokemonEvolutionChain();
	}, [getData, evolutionChain.length]);
	return isLoading ? (
		<LoadingComponent />
	) : (
		<div className="font-rokkitt">
			<div className="relative mx-auto w-screen h-screen flex justify-center overflow-x-hidden">
				<div
					className="w-[750px] h-[750px] absolute rounded-full mx-auto -mt-[23%]"
					style={{ backgroundColor: typeColor[types[0]] }}
				></div>
				<div className="flex flex-row w-screen mx-auto absolute border-black border-solid border-[1px] h-screen">
					<div className="bg-white w-[37.5%] h-screen"></div>
					<div className="flex flex-col items-center w-1/4 gap-4">
						<a className="mt-3 text-2xl font-bold text-white" href="/page/1">
							PokeDex
						</a>
						<BeforeAfterName beforeNextName={beforeNextName} id={String(id)} />
						<span className="text-4xl">{titleCase(name)}</span>
						<div className="w-full">
							<img
								src={url}
								alt={`Pokemon ${name}`}
								className="w-1/2 mx-auto"
								onError={(e) => {
									e.currentTarget.src = noImageIcon; // Replace with the local image URL
								}}
							/>
						</div>
						<TypeComponent types={types} />
						<StatsTable stats={stats} />
						<EvolutionChain
							evolutionChainURL={evolutionChainURL}
							types={types}
							evolutionID={evolutionID}
						/>
					</div>
					<div className="bg-white w-[37.5%] h-screen"></div>
				</div>
			</div>
		</div>
	);
}
