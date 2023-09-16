import { titleCase } from "./Card";
import { useMemo } from "react";
import { typeColors } from "./Detail";


export default function TypeComponent({ types }: { types: string[] }) {
	const typeColor: Record<string, string> = useMemo(
		() => {
			return typeColors;
		},
		[] // Empty dependency array, memoized once when component mounts
	);
	return (
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
	);
}
