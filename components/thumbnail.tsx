// import { modalState, movieState } from "@/atoms/modalAtom";
import { modalState, movieState } from "@/atoms/modalAtom";
import { Movie } from "@/typings";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
// import { useRecoilState } from "recoil";

interface Props {
  movie: Movie | DocumentData;
}

const Thumbnail = ({ movie }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [movieTitle, setMovieTitle] = useState<string | null>(movie.title);

  useEffect(() => {
    if (movie.title?.length > 16) {
      setMovieTitle(movie.title?.slice(0, 16) + "...");
    }
  }, [movie])

  return (
    <div className="flex flex-col transition duration-200
    ease-out md:hover:scale-105 cursor-pointer">
      <div
        className="relative h-28 min-w-[180px] md:h-32 md:min-w-[260px]"
        onClick={() => {
          setShowModal(true);
          setCurrentMovie(movie);
        }}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          className="object-cover h-28 rounded-t-md"
          fill
          alt={movie.name || movie.title || movie.original_name}
        />
      </div>
      <div className="w-full text-center py-1.5 bg-[#141414]  rounded-b-md
      bg-gradient-to-b from-gray-900/50 to-[#201f1f]">
        <span>{movieTitle}</span>
      </div>
    </div>
  );
};

export default Thumbnail;
