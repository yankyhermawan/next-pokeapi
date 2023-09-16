import leftArrow from "../resource/left-arrow.svg";
import rightArrow from "../resource/right-arrow.svg";
import { titleCase } from "./Card";

interface BeforeNextProps {
	before: string;
	next: string;
}

export default function BeforeAfterName({
	beforeNextName,
	id,
}: {
	beforeNextName: BeforeNextProps;
	id: string;
}) {
	return (
		<div className="grid grid-cols-2 px-4 w-full justify-between text-md font-bold text-white">
			{beforeNextName.before ? (
				<a className="flex flex-row gap-3" href={`/detail/${Number(id) - 1}`}>
					<img src={leftArrow} width={20} />
					<span className="xl:text-4xl md:text-lg text-sm">
						{titleCase(beforeNextName.before)}
					</span>
				</a>
			) : (
				<span></span>
			)}
			{beforeNextName.next ? (
				<a
					className="flex flex-row gap-3 mr-0 ml-auto"
					href={`/detail/${Number(id) + 1}`}
				>
					<span className="xl:text-4xl md:text-lg text-sm">
						{titleCase(beforeNextName.next)}
					</span>
					<img src={rightArrow} width={20} />
				</a>
			) : (
				<span></span>
			)}
		</div>
	);
}
