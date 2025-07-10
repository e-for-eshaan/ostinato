import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { Text } from '../Text/Text';
import GoogleAuth from '../Auth/GoogleAuth';
import { useAuthStore } from '../../stores';
import { useRouter } from 'next/router';
import { handleTryNow } from '../../utils/functions';
import { User, LogOut, Play, Settings, Music, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const [expand, setExpand] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuthStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const isHome = router.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logout();
    setUserDropdownOpen(false);
  };

  const getFirstName = (displayName: string | null) => {
    if (!displayName) return 'User';
    return displayName.split(' ')[0];
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-gray-900'
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between h-16 lg:h-20 items-center px-4 lg:px-6">
          <Link href={isLoggedIn ? '/my-music' : '/'} className="group">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-tone-1 to-tone-2 rounded-lg flex items-center justify-center">
                <span className="text-black font-righteous font-bold text-sm lg:text-lg">O</span>
              </div>
              <span className="font-righteous text-lg lg:text-2xl font-bold text-white group-hover:text-tone-1 transition-colors duration-300">
                OSTINATO
              </span>
            </div>
          </Link>

          <ul className="gap-6 hidden lg:flex items-center">
            {!isHome && (
              <Link href={'/'}>
                <button className="cursor-pointer hover:text-tone-1 transform text-white font-medium px-4 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 h-10 flex items-center">
                  Home
                </button>
              </Link>
            )}
            <a href={'/#how-to-use'}>
              <button className="bg-tone-2 cursor-pointer transform duration-300 text-white font-medium px-4 py-2.5 rounded-lg transition-all h-10 flex items-center">
                How To Use
              </button>
            </a>

            {/* Try Now Button */}
            <button
              onClick={handleTryNow}
              className="inline-flex items-center px-4 py-2.5 bg-tone-1 text-black font-semibold rounded-lg hover:bg-tone-2 transition-all duration-300 transform hover:scale-105 h-10"
            >
              <Play className="w-4 h-4 mr-2" />
              Try Now
            </button>

            {/* Enhanced Login Section */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2.5 hover:bg-white/20 transition-all duration-300 h-10"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-tone-1 to-tone-2 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-white text-sm font-medium">
                      {getFirstName(user?.displayName)}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl">
                      <div className="py-1">
                        <Link href="/my-music">
                          <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200 flex items-center">
                            <Music className="w-4 h-4 mr-2" />
                            My Music
                          </button>
                        </Link>
                        <Link href="/user">
                          <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200 flex items-center">
                            <Settings className="w-4 h-4 mr-2" />
                            Account Settings
                          </button>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200 hidden md:flex items-center"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <GoogleAuth />
                </div>
              )}
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
            <div className="px-6 py-4">
              {/* Navigation Buttons - Horizontal Layout */}
              <div className="flex gap-2 mb-4">
                <Link href={'/'} className="flex-1">
                  <button className="w-full cursor-pointer hover:text-tone-1 transform text-white font-medium px-4 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 h-10 flex items-center justify-center">
                    Home
                  </button>
                </Link>
                <Link href={'/#how-to-use'} className="flex-1">
                  <button className="w-full bg-tone-2 cursor-pointer transform duration-300 text-white font-medium px-4 py-2.5 rounded-lg transition-all h-10 flex items-center justify-center">
                    How To Use
                  </button>
                </Link>
                <button
                  onClick={handleTryNow}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-tone-1 text-black font-semibold rounded-lg hover:bg-tone-2 transition-all duration-300 h-10"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Try Now
                </button>
              </div>

              {/* Login Section */}
              <div className="pt-2">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-tone-1 to-tone-2 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-white text-sm font-medium">
                        {getFirstName(user?.displayName)}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <Link href="/my-music">
                        <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200 flex items-center rounded">
                          <Music className="w-4 h-4 mr-2" />
                          My Music
                        </button>
                      </Link>
                      <Link href="/user">
                        <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200 flex items-center rounded">
                          <Settings className="w-4 h-4 mr-2" />
                          Account Settings
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-white/70 text-sm mb-2">Ready to practice?</div>
                )}
                <GoogleAuth />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
