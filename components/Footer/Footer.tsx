import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-black py-4 h-32 flex flex-col gap-6 justify-between items-center text-white">
      {
        <ul className="flex gap-14 w-fit m-auto">
          <li className="hover:text-tone-1 tranform duration-200 text-white cursor-pointer">
            Github
          </li>
          <li className="hover:text-tone-2 tranform duration-200 text-white cursor-pointer">
            Twitter
          </li>
          <li className="hover:text-tone-1 tranform duration-200 text-white cursor-pointer">
            LinkedIn
          </li>
        </ul>
      }
      © Eshaan and Bhawna 2022
    </footer>
  );
};
