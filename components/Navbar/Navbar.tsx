import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Text } from '../Text/Text';
import GoogleAuth from '../Auth/GoogleAuth';
import { useAuthStore } from '../../stores';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const [expand, setExpand] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn } = useAuthStore();

  const router = useRouter();
  const isHome = router.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-gray-900'
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between h-20 items-center px-6">
          <Link href={'/'} className="group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-tone-1 to-tone-2 rounded-lg flex items-center justify-center">
                <span className="text-black font-righteous font-bold text-lg">O</span>
              </div>
              <span className="font-righteous text-2xl font-bold text-white group-hover:text-tone-1 transition-colors duration-300">
                OSTINATO
              </span>
            </div>
          </Link>

          <ul className="gap-8 hidden lg:flex items-center">
            {!isHome && (
              <Link href={'/'}>
                <Text className="cursor-pointer hover:text-tone-1 transform duration-300 text-white font-medium">
                  Home
                </Text>
              </Link>
            )}
            <a href={'/#how-to-use'}>
              <Text className="cursor-pointer hover:text-tone-2 transform duration-300 text-white font-medium">
                How To Use
              </Text>
            </a>
            {isLoggedIn && (
              <Link href={'/my-music'}>
                <Text className="cursor-pointer hover:text-tone-1 transform duration-300 text-white font-medium">
                  My Music
                </Text>
              </Link>
            )}
            <div className="ml-4">
              <GoogleAuth />
            </div>
          </ul>

          <div
            className="flex flex-col gap-1.5 group items-end cursor-pointer lg:hidden"
            onClick={() => {
              setExpand(prev => !prev);
            }}
          >
            <div
              className={`bg-white group-hover:bg-tone-1 group-hover:w-6 h-1 w-8 transform duration-300 rounded-[4px] ${
                expand ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <div
              className={`bg-white group-hover:bg-tone-2 h-1 w-8 rounded-[4px] ${
                expand ? 'opacity-0' : ''
              }`}
            />
            <div
              className={`bg-white group-hover:bg-tone-1 h-1 group-hover:w-5 w-8 transform duration-300 rounded-[4px] ${
                expand ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </div>

        {expand && (
          <div className="lg:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <ul className="flex flex-col space-y-4 px-6 py-4">
              <Link href={'/'}>
                <Text className="cursor-pointer hover:text-tone-1 transform duration-300 text-white font-medium py-2">
                  Home
                </Text>
              </Link>
              <Link href={'/#how-to-use'}>
                <Text className="cursor-pointer hover:text-tone-2 transform duration-300 text-white font-medium py-2">
                  How To Use
                </Text>
              </Link>
              {isLoggedIn && (
                <Link href={'/my-music'}>
                  <Text className="cursor-pointer hover:text-tone-1 transform duration-300 text-white font-medium py-2">
                    My Music
                  </Text>
                </Link>
              )}
              <div className="pt-2">
                <GoogleAuth />
              </div>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
