import { Movie } from "@/typings";
import { useEffect, useState } from "react";
import Image from "next/image";
import { baseUrl } from "@/constants/movie";
import { PlayCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { movieState, modalState } from "@/atoms/modalAtom";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[75vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.original_name || "unknown"}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-sm text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button
          className="bannerButton rounded-full bg-[#cae962] text-black"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          <PlayCircleIcon className="h-4 w-4 text-black md:h-7 md:w-7" />
          Preview
        </button>
        <button className="bannerButton rounded-full font-light bg-[gray]/70">
          Add To List
          <PlusCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
