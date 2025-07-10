import Link from 'next/link';
import { Music, Github, Twitter, Linkedin, Mail, Heart, ArrowUp, Coffee } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Footer = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const indieQuotes = [
    'Code is poetry, bugs are features in disguise',
    "One more feature, then I'll sleep... said no dev ever",
    'It works on my machine™',
    "Git commit -m 'fix stuff'",
    'The best code is no code at all',
    "Debugging is like being a detective in a crime movie where you're also the murderer",
    "I don't always test my code, but when I do, I do it in production",
    'Life is short, code is long',
    'The only way to learn a new programming language is by writing programs in it',
    "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code",
    'First, solve the problem. Then, write the code',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand',
    "The most damaging phrase in the language is 'We've always done it this way'",
    'Code never lies, comments sometimes do',
    'The best error message is the one that never shows up',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prev => (prev + 1) % indieQuotes.length);
    }, 10_000); // Change quote every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-white/10">
      {/* Main Footer Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Brand Section */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-tone-1 to-tone-2 rounded-xl flex items-center justify-center">
              <span className="text-black font-righteous font-bold text-xl">O</span>
            </div>
            <span className="font-righteous text-3xl font-bold text-white">OSTINATO</span>
          </div>

          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Built with <Heart className="w-4 h-4 text-red-400 inline relative bottom-[2px]" /> for
            musicians who love to practice.
            <br />
            <span className="text-sm">
              Because sometimes you just need to loop that tricky part 47 times.
            </span>
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Link
              href="https://github.com/e-for-eshaan/ostinato"
              target="_blank"
              className="group w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-tone-1 transition-all duration-300 transform hover:scale-110"
            >
              <Github className="w-6 h-6 text-white group-hover:text-black transition-colors duration-300" />
            </Link>
            <Link
              href="https://linkedin.com/in/e-for-eshaan"
              target="_blank"
              className="group w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-tone-1 transition-all duration-300 transform hover:scale-110"
            >
              <Linkedin className="w-6 h-6 text-white group-hover:text-black transition-colors duration-300" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <Link
              href="/"
              className="text-white/70 hover:text-tone-1 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/my-music"
              className="text-white/70 hover:text-tone-1 transition-colors duration-200"
            >
              My Music
            </Link>
            <a
              href="/#how-to-use"
              className="text-white/70 hover:text-tone-1 transition-colors duration-200"
            >
              How to Use
            </a>
            <Link
              href="/feedback"
              className="text-white/70 hover:text-tone-2 transition-colors duration-200"
            >
              Feedback
            </Link>
          </div>

          {/* Indie Quote Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Coffee className="w-5 h-5 text-tone-1" />
              <span className="text-white/70 text-sm">Indie Dev Wisdom</span>
              <Coffee className="w-5 h-5 text-tone-2" />
            </div>
            <p className="text-white/60 text-sm italic transition-all duration-500">
              "{indieQuotes[currentQuoteIndex]}"
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-white/70 text-sm">
              <span>© 2024 OSTINATO</span>
              <span>•</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>by Eshaan</span>
            </div>

            <div className="flex items-center justify-center md:justify-end space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-white/50 hover:text-white transition-colors duration-200"
              >
                Privacy
              </Link>
              <span className="text-white/30">•</span>
              <Link
                href="/terms"
                className="text-white/50 hover:text-white transition-colors duration-200"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-tone-1 rounded-full flex items-center justify-center hover:bg-tone-2 transition-all duration-300 transform hover:scale-110 shadow-lg z-50"
      >
        <ArrowUp className="w-6 h-6 text-black" />
      </button>
    </footer>
  );
};
