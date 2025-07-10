import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { RANDOM_DEFAULT } from '../../lib/constants';
import { Play, Sparkles } from 'lucide-react';

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

  const handleTryNow = () => {
    const videoId = '2V9CyR06Ojo'; // Default demo video
    router.push(`/watch?v=${videoId}`);
  };

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
            type="submit"
            disabled={isLoading || !url.trim()}
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 sm:px-6 sm:py-2 bg-gradient-to-r from-tone-1 to-tone-2 text-black font-semibold rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-tone-1/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base"
          >
            {isLoading ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Loading...</span>
                <span className="sm:hidden">...</span>
              </div>
            ) : (
              <>
                <span className="hidden sm:inline">Start Learning</span>
                <span className="inline sm:hidden">Go</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-3 px-3 sm:px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-xs sm:text-sm">
            {error}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-white/60 text-xs sm:text-sm px-2">
            Examples: youtube.com/watch?v=dQw4w9WgXcQ or youtu.be/dQw4w9WgXcQ
          </p>
        </div>
      </form>

      {/* Or Section with Try Now Feature */}
      <div className="mt-8">
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <div className="px-4">
            <span className="text-white/60 text-sm font-medium">or</span>
          </div>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        <div className="text-center">
          <button
            onClick={handleTryNow}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-tone-2/20 to-tone-1/20 backdrop-blur-sm border border-white/20 rounded-2xl hover:border-tone-2/40 hover:shadow-lg hover:shadow-tone-2/25 transition-all duration-300 overflow-hidden"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-tone-2/10 to-tone-1/10 rounded-2xl group-hover:from-tone-2/20 group-hover:to-tone-1/20 transition-all duration-300"></div>

            {/* Content */}
            <div className="relative flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-tone-2 to-tone-1 rounded-full">
                <Play className="w-4 h-4 text-black" />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold text-lg">Try Now</span>
                  <Sparkles className="w-4 h-4 text-tone-1" />
                </div>
                <div className="text-white/60 text-sm">Experience with a demo</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
