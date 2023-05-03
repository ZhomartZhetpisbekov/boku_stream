import { modalState, movieState } from "@/atoms/modalAtom";
import { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import { Element, Genre, Movie } from "@/typings";
import {
  CheckIcon,
  PlayCircleIcon,
  PlusIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import MuiModal from "@mui/material/Modal";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ReactPlayer from "react-player/lazy";
import { useRecoilState } from "recoil";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);
  const [addedToList, setAddedToList] = useState(false);
  const [movies, setMovies] = useState<Movie[] | DocumentData>([]);

  const { user } = useAuth();

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  // Retrieve all movies from My List
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "users", user.uid, "myList"),
        (snapshot) => setMovies(snapshot.docs)
      );
    }
  }, [db, movie?.id]);

  // Check if the movie is in My List
  useEffect(() => {
    setAddedToList(
      movies.findIndex(
        (result: { data: () => { (): any; new (): any; id: any } }) =>
          result.data().id === movie?.id
      ) !== -1
    );
  }, [movies]);

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, "users", user!.uid, "myList", movie?.id.toString()!)
      );
      toast(
        `${movie?.title || movie?.original_name} has been removed from My List`,
        {
          duration: 8000,
        }
      );
    } else {
      console.log(user);
      await setDoc(
        doc(db, "users", user!.uid, "myList", movie?.id.toString()!),
        { ...movie }
      );
      toast(
        `${movie?.title || movie?.original_name} has been added to My List`,
        {
          duration: 8000,
        }
      );
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl
                overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <Toaster position="bottom-center" />
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button
                className="flex items-center gap-x-2 rounded-full bg-[#cae962]/70 px-8 text-xl
              font-bold text-black transition hover:bg-[#cae962]"
              >
                <PlayCircleIcon className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modalButton" onClick={handleList}>
                {addedToList ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}
              </button>
            </div>
            <button onClick={() => setMuted(!muted)} className="modalButton">
              {muted ? (
                <SpeakerXMarkIcon className="h-6 w-6" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-4 text-lg">
            <h1 className="font-bold md:text-2xl">{movie?.title}</h1>
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-lg text-[#cae962]">
                {Math.round(movie?.vote_average * 10) / 10}
              </p>
              <p className="font-bold text-[gray]">·</p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div
                className="flex h-4 items-center justify-center rounded border
              border-white/40 px-1.5 text-xs"
              >
                HD
              </div>
              <p className="font-bold text-[gray]">·</p>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
