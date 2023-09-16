import { DataFetched } from "./Card";

export interface Chain {
	species: {
		name: string;
		url: string;
	};
	evolves_to: Chain[]; // This should allow for an empty array
}

export function setBGURL(data: DataFetched, bgURL: string) {
	if (data.sprites.other.home.front_default && !bgURL) {
		return data.sprites.other.home.front_default;
	} else if (data.sprites.front_default && !bgURL) {
		return data.sprites.front_default;
	} else if (data.sprites.other.dream_world.front_default && !bgURL) {
		return data.sprites.other.dream_world.front_default;
	} else {
		return data.sprites.other["official-artwork"].front_default;
	}
}

export const initStatsValues = [
	{
		base_stat: 0,
		effort: 0,
		stat: {
			name: "",
			url: "",
		},
	},
];

export const typeColors = {
	normal: "#aa9",
	fire: "#f42",
	water: "#39f",
	electric: "#fc3",
	grass: "#7c5",
	ice: "#6cf",
	fighting: "#b54",
	poison: "#a59",
	ground: "#db5",
	flying: "#89f",
	psychic: "#f59",
	bug: "#ab2",
	rock: "#ba6",
	ghost: "#66b",
	dragon: "#76e",
	dark: "#754",
	steel: "#aab",
	fairy: "#e9e",
};

export const getBeforeAfter = async (
	id: string,
	setBeforeNextName: React.Dispatch<
		React.SetStateAction<{
			before: string;
			next: string;
		}>
	>
) => {
	const beforeID = Number(id) - 1;
	const afterID = Number(id) + 1;
	if (beforeID >= 1) {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${beforeID}`
		);
		const data: DataFetched = await response.json();
		setBeforeNextName((prevState) => ({
			...prevState,
			before: data.name,
		}));
	}
	if (afterID >= 1) {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${afterID}`
		);
		const data: DataFetched = await response.json();
		setBeforeNextName((prevState) => ({
			...prevState,
			next: data.name,
		}));
	}
};

export const convertImage = async (
	setEvolutionChainURL: React.Dispatch<React.SetStateAction<string[][]>>,
	setEvolutionID: React.Dispatch<React.SetStateAction<number[][]>>,
	evolutionChain: string[][]
) => {
	const outsideArray: string[][] = [];
	const outsideIdArray: number[][] = [];

	for (let i = 0; i < evolutionChain.length; i++) {
		const insideArray: string[] = [];
		const insideIdArray: number[] = [];
		for (let j = 0; j < evolutionChain[i].length; j++) {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${evolutionChain[i][j]}`
			);
			const data: DataFetched = await response.json();
			const imageURL = "";
			insideArray.push(setBGURL(data, imageURL));
			insideIdArray.push(data.id);
		}
		outsideArray.push(insideArray);
		outsideIdArray.push(insideIdArray);
	}
	setEvolutionChainURL(outsideArray);
	setEvolutionID(outsideIdArray);
};

export interface Stats {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
}

export interface Types {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}

export interface Sprites_Other {
	dream_world: {
		front_default: string;
		front_female: string | null;
	};
	home: {
		front_default: string;
		front_female: string | null;
		front_shiny: string;
		front_shiny_female: string | null;
	};
	"official-artwork": {
		front_default: string;
		front_shiny: string | null;
	};
}

export interface Sprites {
	back_default: string;
	back_female: string | null;
	back_shiny: string;
	back_shiny_female: string | null;
	front_default: string;
	front_female: string | null;
	front_shiny: string;
	front_shiny_female: string | null;
	other: Sprites_Other;
}

export interface Species {
	name: string;
	url: string;
}