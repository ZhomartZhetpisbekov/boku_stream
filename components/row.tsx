import { Movie } from "@/typings";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Thumbnail from "./thumbnail";
import { useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { DocumentData } from "firebase/firestore";

interface Props {
  title: String;
  movies: Movie[] | DocumentData[];
}

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: String) => {
    setIsMoved(true);

    if(rowRef.current) {
      const {scrollLeft, clientWidth} = rowRef.current;

      const scrollTo = 
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      rowRef.current.scrollTo({left: scrollTo, behavior: 'smooth'})
      
    }
  }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#cae962] transition 
      duration-200 md:text-2xl">{title}</h2>
      <div className="group relative md:-ml-2">
        <ArrowLeftIcon className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer 
        opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'}`} 
        onClick={() => handleClick("left")}/>
        
        <div ref={rowRef} className="flex scrollbar-hide items-center space-x-2 overflow-x-scroll md:space-x-2 md:p-2">
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie}/>
          ))}
        </div>

        <ArrowRightIcon className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer 
        opacity-0 transition hover:scale-125 group-hover:opacity-100" 
        onClick={() => handleClick("right")}/>
      </div>
    </div>
  );
};

export default Row;
