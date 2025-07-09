import React, { useState } from 'react';
import { useRouter } from 'next/router';

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

      // Redirect to the video page
      router.push(`/${videoId}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Paste YouTube URL to start learning..."
            className="w-full px-6 py-4 text-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:border-tone-1 focus:ring-4 focus:ring-tone-1/20 transition-all duration-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-tone-1 to-tone-2 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-tone-1/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              'Start Learning'
            )}
          </button>
        </div>

        {error && (
          <div className="mt-3 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}
      </form>

      <div className="mt-4 text-center">
        <p className="text-white/60 text-sm">
          Examples: youtube.com/watch?v=dQw4w9WgXcQ or youtu.be/dQw4w9WgXcQ
        </p>
      </div>
    </div>
  );
};
