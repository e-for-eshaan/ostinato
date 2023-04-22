import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-black py-4 h-32 flex flex-col gap-6 justify-between items-center text-white">
      {
        <ul className="flex gap-14 w-fit m-auto">
          <Link href={"https://github.com/Eshaan-Y24"} target="_blank">
            <li className="hover:text-tone-1 tranform duration-200 text-white cursor-pointer">
              Github
            </li>
          </Link>
          <Link href={"https://twitter.com/Eshaaaaann"} target="_blank">
            <li className="hover:text-tone-2 tranform duration-200 text-white cursor-pointer">
              Twitter
            </li>
          </Link>
          <Link
            href={"https://www.linkedin.com/in/eshaan-yadav-22b94b1b4/"}
            target="_blank"
          >
            <li className="hover:text-tone-1 tranform duration-200 text-white cursor-pointer">
              LinkedIn
            </li>
          </Link>
        </ul>
      }
      © Eshaan 2022
    </footer>
  );
};
