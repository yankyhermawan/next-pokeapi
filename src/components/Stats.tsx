import { Stats } from "./Card";
import { titleCase } from "./Card";

export default function StatsTable({ stats }: { stats: Stats[] }) {
	return (
		<table className="mx-auto">
			<tbody>
				{stats.map((stat, index) => {
					return (
						<tr className="h-max gap-4 text-2xl items-center" key={index}>
							<td className="p-2">{titleCase(stat.stat.name)}</td>
							<td className="p-2">{stat.base_stat}</td>
							<td className="p-2">
								<div className=" bg-gray-600 rounded-full h-4 w-48">
									<div
										className="bg-blue-300 rounded-full h-4 "
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
