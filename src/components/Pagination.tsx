export default function Pagination({
	currentPage,
	totalPages,
}: {
	currentPage: number;
	totalPages: number[];
}) {
	const currentPageStyle =
		"border-black border-[1px] border-solid w-10 h-10 cursor-pointer bg-red-300 flex justify-center items-center";
	const notCurrentPageStyle =
		"border-black border-[1px] border-solid w-10 h-10 cursor-pointer hover:bg-orange-200 duration-200 flex justify-center items-center";
	return (
		<>
			{totalPages.map((num) => {
				return (
					<a
						className={
							num === currentPage ? currentPageStyle : notCurrentPageStyle
						}
						href={`/page/${num}`}
						key={num}
					>
						{num}
					</a>
				);
			})}
		</>
	);
}
