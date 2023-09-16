import { Stats } from "./Card";
import { titleCase } from "./Card";

function textConvert(text: string) {
	if (text.includes("special")) {
		const removeReplace = text.replace("-", " ").replace("special", "sp.");
		return removeReplace;
	} else {
		return text;
	}
}

export default function StatsTable({ stats }: { stats: Stats[] }) {
	return (
		<table className="mx-auto w-full">
			<tbody>
				{stats.map((stat, index) => {
					return (
						<tr
							className="h-max gap-4 xl:text-4xl md:text-lg text-sm items-center"
							key={index}
						>
							<td className="p-2">{titleCase(textConvert(stat.stat.name))}</td>
							<td className="p-2">{stat.base_stat}</td>
							<td className="p-2 w-full">
								<div className=" bg-gray-600 rounded-full h-4 md:h-8 xl:h-10">
									<div
										className="bg-blue-300 rounded-full h-4 md:h-8 xl:h-10"
										style={{
											width: `${(stat.base_stat / 255) * 100}%`,
										}}
									></div>
								</div>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
