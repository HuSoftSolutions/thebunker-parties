
function MenuPlatterComponent({ title, imageUrl, cost, qty, desc}) {
  return (
    <div
      className="flex flex-col items-end justify-end text-start m-1 shadow-xl h-[200px] bg-gray-100 transform transition-transform hover:scale-105  hover:bg-gray-200 bg-cover bg-center "
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <p className="text-sm bg-black bg-opacity-50 w-full h-fit p-2">
        {title} &#9679; {qty && <span>{qty} &#9679;</span>} ${cost}
      </p>
			{desc && <p className="text-xs bg-black bg-opacity-50 w-full h-fit px-2 pb-2">{desc}</p>}
    </div>
  );
}

export default MenuPlatterComponent;
