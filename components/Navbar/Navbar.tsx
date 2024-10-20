import Link from 'next/link';
import React, { useState } from 'react';
import { Text } from '../Text/Text';
import GoogleAuth from '../Auth/GoogleAuth';
import { useSelector } from '../../redux';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const [expand, setExpand] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const router = useRouter();
  const isHome = router.pathname === '/';
  return (
    <nav className="bg-black">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex justify-between h-16 items-center px-6">
          <Link href={'/'}>
            <img className="w-32" src="/assets/logo3.png" alt="" />
          </Link>

          <ul className="gap-7 hidden sm:flex">
            {!isHome && <Link href={'/'}>
              <Text className="cursor-pointer hover:text-tone-1 transform duration-150 text-white">
                Home
              </Text>
            </Link>}
            <a href={'/#how-to-use'}>
              <Text className="cursor-pointer hover:text-tone-2 transform duration-150 text-white">
                How To Use
              </Text>
            </a>
            {isLoggedIn && <Link href={'/my-music'}>
              <Text className="cursor-pointer hover:text-tone-1 transform duration-150 text-white">
                My Music
              </Text>
            </Link>}
            <Text className="cursor-pointer hover:text-tone-2 transform duration-150 text-white">
              <GoogleAuth />
            </Text>
          </ul>
          <div
            className="flex flex-col gap-1.5 group items-end cursor-pointer sm:hidden"
            onClick={() => {
              setExpand(prev => !prev);
            }}
          >
            <div className="bg-white group-hover:bg-tone-1 group-hover:w-6 h-1 w-8 transform duration-150 rounded-[4px]" />
            <div className="bg-white group-hover:bg-tone-2 h-1 w-8 rounded-[4px]" />
            <div className="bg-white group-hover:bg-tone-1 h-1 group-hover:w-5 w-8 transform duration-150 rounded-[4px]" />
          </div>
        </div>
        {expand && (
          <div>
            <ul className="sm:hidden flex w-full justify-between px-6 cursor-pointer bg-black opacity-80 py-3">
              <Link href={'/'}>
                <Text className="cursor-pointer hover:text-tone-1 transform duration-150 text-white">
                  Home
                </Text>
              </Link>
              <Link href={'/#how-to-use'}>
                <Text className="cursor-pointer hover:text-tone-2 transform duration-150 text-white">
                  How To Use
                </Text>
              </Link>
              {isLoggedIn && <Link href={'/my-music'}>
                <Text className="cursor-pointer hover:text-tone-1 transform duration-150 text-white">
                  My Music
                </Text>
              </Link>}
              <Text className="cursor-pointer hover:text-tone-2 transform duration-150 text-white">
                <GoogleAuth />
              </Text>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
