import { DataFetched } from "./Card";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import noImageIcon from "../no-image-icon.png";

function setBGURL(data: DataFetched, bgURL: string) {
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

export default function DetailContainer() {
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
	const initStatsValues = [
		{
			base_stat: 0,
			effort: 0,
			stat: {
				name: "",
				url: "",
			},
		},
	];

	function titleCase(str: string) {
		if (str.includes("-")) {
			const strNoStrip = str.replace("-", " ");
			const strNoSpecial = strNoStrip.replace("special", "sp.");
			return strNoSpecial
				.toLowerCase()
				.split(" ")
				.map(function (word) {
					return word.charAt(0).toUpperCase() + word.slice(1);
				})
				.join(" ");
		} else {
			return str
				.toLowerCase()
				.split(" ")
				.map(function (word) {
					return word.charAt(0).toUpperCase() + word.slice(1);
				})
				.join(" ");
		}
	}

	const { id } = useParams();
	const [stats, setStats] = useState(initStatsValues);
	const [name, setName] = useState("");
	const [types, setTypes] = useState<string[]>([]);
	const [url, setUrl] = useState("");
	const [isLoading, setIsLoading] = useState(true);

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
		setIsLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);
	return isLoading ? (
		<>
			<div role="status" className="flex justify-center items-center h-screen">
				<svg
					aria-hidden="true"
					className="w-48 h-48 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
				<span className="sr-only">Loading...</span>
			</div>
		</>
	) : (
		<div className="font-rokkitt">
			<div className="relative mx-auto w-screen h-screen flex justify-center overflow-hidden">
				<div
					className="w-[750px] h-[750px] absolute rounded-full mx-auto -mt-[23%]"
					style={{ backgroundColor: typeColor[types[0]] }}
				></div>
				<div className="flex flex-row w-screen mx-auto absolute border-black border-solid border-[1px] h-screen">
					<div className="bg-white w-[37.5%] h-screen"></div>
					<div className="flex flex-col items-center w-1/4 gap-6">
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
						<div className="flex flex-row justify-evenly w-full">
							{types.map((type) => {
								return (
									<span
										key={type}
										className="text-white text-2xl py-2 px-10 rounded-full font-semibold"
										style={{ backgroundColor: typeColor[types[0]] }}
									>
										{titleCase(type)}
									</span>
								);
							})}
						</div>

						<table className="mx-auto">
							<tbody>
								{stats.map((stat, index) => {
									return (
										<tr
											className="h-max gap-4 text-2xl items-center"
											key={index}
										>
											<td className="p-2">{titleCase(stat.stat.name)}</td>
											<td className="p-2">{stat.base_stat}</td>
											<td className="p-2">
												<div className=" bg-gray-600 rounded-full h-4 w-48">
													<div
														className="bg-blue-300 rounded-full h-4 "
														style={{
															width: `${stat.base_stat}%`,
														}}
													></div>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<div className="bg-white w-[37.5%] h-screen"></div>
				</div>
			</div>
		</div>
	);
}
