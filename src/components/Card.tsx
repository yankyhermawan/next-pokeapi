import { useState, useEffect, useMemo } from "react";
import noImageIcon from "../no-image-icon.png";
export default function Card({ name, url }: { name: string; url: string }) {
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
		// Initialize the ID when the component mounts
		setID(Number(url.split("/")[url.split("/").length - 2]));
	}, [url]);

	useEffect(() => {
		// Fetch the type and set the background URL and color
		const getID = async () => {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
			const data = await response.json();
			setID(Number(data.id));
			setBGURL(
				`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
			);
			setBGColor(typeColor[data.types[0].type.name]);
		};
		getID();
	}, [id, name, typeColor]);

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
				<span className="text-lg p-2 text-white">
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
				<span className="text-lg p-2 text-white">{name}</span>
			</a>
		</>
	);
}
