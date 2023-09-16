import { useMemo } from "react";
import { typeColors } from "./Detail";

export default function EvolutionChain({
	evolutionChainURL,
	types,
	evolutionID,
}: {
	evolutionChainURL: string[][];
	types: string[];
	evolutionID: number[][];
}) {
	const typeColor: Record<string, string> = useMemo(
		() => {
			return typeColors;
		},
		[] // Empty dependency array, memoized once when component mounts
	);
	return (
		<div className="flex flex-col w-full">
			{evolutionChainURL.map((evolve, id) => {
				return (
					<div className="grid grid-cols-3 gap-2 justify-center" key={id}>
						{evolve.map((evo, idx) => {
							return (
								<a
									key={idx}
									style={{
										backgroundImage: `url(${evo})`,
										width: '75%', // Set width to 25%
										paddingBottom: '75%', // Set height as a percentage of the width (to maintain a square aspect ratio)
										backgroundColor: typeColor[types[0]],
									}}
									className="block w-fit h-fit bg-cover bg-center rounded-full"
									href={`/detail/${evolutionID[id][idx]}`}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}
