import Link from "next/link";
import React, { useState } from "react";
import { Text } from "../Text/Text";

export const Navbar = () => {
  const [expand, setExpand] = useState(false);
  return (
    <nav className="bg-black">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex justify-between h-16 items-center px-6">
          <Link href={"/"}>
            <img className="w-32" src="/assets/logo3.png" alt="" />
          </Link>

          <ul className="gap-7 hidden sm:flex">
            <Link href={"/"}>
              <Text className="cursor-pointer hover:text-red-300 transform duration-150 text-white">
                Home
              </Text>
            </Link>
            <Link href={"/"}>
              <Text className="cursor-pointer hover:text-red-300 transform duration-150 text-white">
                How To Use
              </Text>
            </Link>
            <Link href={"/my-music"}>
              <Text className="cursor-pointer hover:text-red-300 transform duration-150 text-white">
                My Music
              </Text>
            </Link>
            <Link href={"/"}>
              <Text className="cursor-pointer hover:text-red-300 transform duration-150 text-white">
                About
              </Text>
            </Link>
          </ul>
          <div
            className="flex flex-col gap-1.5 group items-end cursor-pointer sm:hidden"
            onClick={() => {
              setExpand((prev) => !prev);
            }}
          >
            <div className="bg-black group-hover:w-6 h-1 w-8 transform duration-150 rounded-[4px]" />
            <div className="bg-black h-1 w-8 rounded-[4px]" />
            <div className="bg-black h-1 group-hover:w-5 w-8 transform duration-150 rounded-[4px]" />
          </div>
        </div>
        {expand && (
          <div>
            <ul className="sm:hidden flex w-full justify-between px-6 cursor-pointer bg-red-200">
              <li>Home</li>
              <li>How To Use</li>
              <Link href={"/my-music"}>
                <li>My Music</li>
              </Link>
              <li>About</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
