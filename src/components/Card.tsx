import { useState, useEffect } from "react";
export default function Card({ name, url }: { name: string; url: string }) {
	const [bgColor, setBGColor] = useState("");
	const [id, setID] = useState(0);
	const [bgURL, setBGURL] = useState("");
	const typeColor: Record<string, string> = {
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
	}, [id, name]);

	return (
		<>
			<a
				className="flex flex-col rounded-lg border-solid border-[1px] border-black hover:bg-orange-200 cursor-pointer duration-200 w-48 h-72"
				style={{
					backgroundColor: `${bgColor}`,
					backgroundImage: `url(${bgURL})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}
				href={`https://pokeapi.co/api/v2/pokemon/${id}`}
			>
				<span className="text-lg p-2">{name}</span>
			</a>
		</>
	);
}
