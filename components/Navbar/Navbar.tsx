import Link from "next/link";
import React, { useState } from "react";

export const Navbar = () => {
  const [expand, setExpand] = useState(false);
  return (
    <nav className="bg-red-400">
      <Link href={"/"}>
        <div className="max-w-[1000px] mx-auto">
          <div className="flex justify-between h-16 items-center px-6">
            <div>Ostinato</div>

            <ul className="gap-7 hidden sm:flex">
              <li>Home</li>
              <li>How To Use</li>
              <li>Search</li>
              <li>About</li>
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
                <li>Search</li>
                <li>About</li>
              </ul>
            </div>
          )}
        </div>
      </Link>
    </nav>
  );
};
