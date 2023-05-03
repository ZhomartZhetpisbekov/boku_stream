import useAuth from "@/hooks/useAuth";
import { BookmarkIcon, CodeBracketIcon, CurrencyEuroIcon, FireIcon, HomeIcon, MagnifyingGlassIcon, TvIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {signOutUser} = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex md:gap-x-10">
        <div className="flex gap-x-1 items-center font-semibold cursor-pointer">
          <TvIcon className="w-6 h-6 text-[#cae962]" />
          boku.stream
        </div>
        <div className="hidden lg:inline relative w-[300px] rounded-md border-none text-black font-light">
          <input type="text" placeholder="Search" className="input"/>
          <MagnifyingGlassIcon className=" absolute right-3 top-2 w-6 h-6 text-[#141414] font-semibold cursor-pointer"/>
        </div>
        <ul className="hidden items-center gap-x-4 md:flex">
          <li className="headerLink">
            <HomeIcon className="w-6 h-6 text-[#cae962]" />
            Home
          </li>
          <li className="headerLink">
            <BookmarkIcon className="w-6 h-6 text-[#cae962]" />
            My List
          </li>
          <li className="headerLink">
            <FireIcon className="w-6 h-6 text-[#cae962]" />
            Trending
          </li>
          <li className="headerLink">
            <CodeBracketIcon className="w-6 h-6 text-[#cae962]" />
            About
          </li>
          <li className="headerLink">
            <CurrencyEuroIcon className="w-6 h-6 text-[#cae962]" />
            Donate
          </li>
        </ul>
      </div>
      <div className="px-6 py-2 bg-[#cae962] rounded-md text-black cursor-pointer">
        <button onClick={signOutUser}>Sign Out</button>
      </div>
    </header>
  );
};

export default Header;
