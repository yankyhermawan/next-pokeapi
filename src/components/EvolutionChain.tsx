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
					<div className="grid grid-cols-3" key={id}>
						{evolve.map((evo, idx) => {
							return (
								<a
									key={idx}
									style={{
										backgroundImage: `url(${evo})`,
										width: 150,
										height: 150,
										backgroundColor: typeColor[types[0]],
									}}
									className="block w-40 h-40 bg-cover bg-center rounded-full"
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
