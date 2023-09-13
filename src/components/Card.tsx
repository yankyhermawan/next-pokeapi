import { useState, useEffect, useMemo } from "react";
import noImageIcon from "../no-image-icon.png";

interface Types {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}

interface Sprites_Other {
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

interface Sprites {
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

interface DataFetched {
	abilities: string[];
	base_experience: number;
	forms: string[];
	game_indices: string[];
	height: number;
	held_items: string[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: string[];
	name: string;
	order: number;
	species: string[];
	sprites: Sprites;
	types: Types[];
}
export default function Card({ name }: { name: string }) {
	const [bgColor, setBGColor] = useState("");
	const [id, setID] = useState(0);
	const [bgURL, setBGURL] = useState("");
	const typeColor: Record<string, string> = useMemo(
		() => ({
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
		}),
		[] // Empty dependency array, memoized once when component mounts
	);

	useEffect(() => {
		// Fetch the type and set the background URL and color
		const getID = async () => {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
			const data: DataFetched = await response.json();
			setID(Number(data.id));
			if (data.sprites.other.home.front_default && !bgURL) {
				setBGURL(data.sprites.other.home.front_default);
			} else if (data.sprites.front_default && !bgURL) {
				setBGURL(data.sprites.front_default);
			} else if (data.sprites.other.dream_world.front_default && !bgURL) {
				setBGURL(data.sprites.other.dream_world.front_default);
			} else if (!bgURL) {
				setBGURL(data.sprites.other["official-artwork"].front_default);
			}
			setBGColor(typeColor[data.types[0].type.name]);
		};
		getID();
	}, [id, name, typeColor]);

	function getContrastColor(backgroundColor: string) {
		// Parse the background color into RGB components
		const hexColor = backgroundColor.replace(/^#/, ""); // Remove leading '#'
		const r = parseInt(hexColor.slice(0, 2), 16);
		const g = parseInt(hexColor.slice(2, 4), 16);
		const b = parseInt(hexColor.slice(4, 6), 16);

		// Calculate the relative luminance using the formula for sRGB
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

		// Choose a text color based on the luminance
		const textColor = luminance > 0.5 ? "#000" : "#fff"; // Dark background, light text; Light background, dark text
		return textColor;
	}

	function titleCase(str: string) {
		return str
			.toLowerCase()
			.split(" ")
			.map(function (word) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			})
			.join(" ");
	}

	function convertToThreeDigitString(number: number) {
		return "#" + String(number).padStart(3, "0");
	}

	return (
		<>
			<a
				className="flex flex-col rounded-lg border-solid border-[1px] border-black cursor-pointer w-60 h-auto items-center justify-between overflow-hidden whitespace-nowrap"
				style={{
					backgroundColor: `${bgColor}`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}
				href={`https://pokeapi.co/api/v2/pokemon/${id}`}
			>
				<span
					className="text-lg p-2"
					style={{
						color: getContrastColor(bgColor),
					}}
				>
					{convertToThreeDigitString(id)}
				</span>
				<img
					src={bgURL}
					alt={`Pokemon ${name}`}
					className="w-full"
					onError={(e) => {
						e.currentTarget.src = noImageIcon; // Replace with the local image URL
					}}
				/>
				<span className="text-lg p-2 text-white">{titleCase(name)}</span>
			</a>
		</>
	);
}
