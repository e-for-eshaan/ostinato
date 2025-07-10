import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { RANDOM_DEFAULT } from '../../lib/constants';
import { Shuffle } from 'lucide-react';

interface VideoInputProps {
  className?: string;
}

export const VideoInput: React.FC<VideoInputProps> = ({ className = '' }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleRandomClick = async () => {
    setIsLoading(true);
    setError('');

    // Set the random URL in the input
    setUrl(RANDOM_DEFAULT);

    // Wait for 1 second before redirecting
    setTimeout(() => {
      const videoId = extractVideoId(RANDOM_DEFAULT);
      if (videoId) {
        router.push(`/watch?v=${videoId}`);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const videoId = extractVideoId(url);
      if (!videoId) {
        setError('Please enter a valid YouTube URL');
        setIsLoading(false);
        return;
      }

      // Redirect to the video page with watch?v= format
      router.push(`/watch?v=${videoId}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const isEmpty = !url.trim();
  const showDice = isEmpty && !isLoading;

  return (
    <div className={`w-full max-w-2xl mx-auto px-4 sm:px-6 ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Paste YouTube URL..."
            className="w-full px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-white/60 focus:outline-none focus:border-tone-1 focus:ring-4 focus:ring-tone-1/20 transition-all duration-300"
            disabled={isLoading}
          />
          <button
            type={showDice ? 'button' : 'submit'}
            onClick={showDice ? handleRandomClick : undefined}
            disabled={isLoading}
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 sm:px-6 sm:py-2 bg-tone-2 text-black font-semibold rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-tone-1/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base group"
            title={showDice ? 'Random' : ''}
          >
            {isLoading ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Loading...</span>
                <span className="sm:hidden">...</span>
              </div>
            ) : showDice ? (
              <div className="flex items-center justify-center">
                <Shuffle color="white" />
                {/* <img src="/images/dice-roll.svg" alt="Random" className="w-6 h-6 sm:w-7 sm:h-7" /> */}
              </div>
            ) : (
              <>
                <span className="hidden sm:inline text-white">Start Learning</span>
                <span className="inline sm:hidden text-white">Go</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-3 px-3 sm:px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-xs sm:text-sm">
            {error}
          </div>
        )}
      </form>

      <div className="mt-4 text-center">
        <p className="text-white/60 text-xs sm:text-sm px-2">
          Examples: youtube.com/watch?v=dQw4w9WgXcQ or youtu.be/dQw4w9WgXcQ
        </p>
      </div>
    </div>
  );
};
