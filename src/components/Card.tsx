export default function Card({ name }: { name: string }) {
	return (
		<>
			<div className="flex flex-col rounded-lg border-solid border-[1px] border-black hover:bg-orange-200 cursor-pointer duration-200">
				<span className="text-lg p-2">{name}</span>
			</div>
		</>
	);
}
