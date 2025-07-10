import React, { useEffect, useState } from 'react';
import { Layout } from '../../components';
import { getMyVideos, getVideoTimeStamps } from '../../utils/storage';
import {
  Music,
  Play,
  Clock,
  Calendar,
  Search,
  Filter,
  Grid,
  List,
  Plus,
  Trash2,
  Edit3,
  Share2,
  Download,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { createDefault } from '../../utils/functions';

interface MusicItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  timestampCount: number;
  lastPlayed?: string;
  createdAt: string;
}

const MyMusic = () => {
  const [myMusic, setMyMusic] = useState<MusicItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'duration'>('recent');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadMyMusic();
    }
  }, []);

  const loadMyMusic = () => {
    setIsLoading(true);
    const myVideos = getMyVideos();

    const musicItems: MusicItem[] = myVideos.map(videoId => {
      const timestamps = getVideoTimeStamps(videoId);
      return {
        id: videoId,
        title: `Practice Session ${videoId.slice(-4)}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        duration: '3:45', // Mock duration
        timestampCount: timestamps.length,
        lastPlayed: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        createdAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
      };
    });

    setMyMusic(musicItems);
    setIsLoading(false);
  };

  const handlePlayMusic = (videoId: string) => {
    router.push(`/watch?v=${videoId}`);
  };

  const handleCreateNew = () => {
    const videoId = createDefault();
    router.push(`/watch?v=${videoId}`);
  };

  const filteredMusic = myMusic.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMusic = [...filteredMusic].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'duration':
        return a.duration.localeCompare(b.duration);
      default:
        return (
          new Date(b.lastPlayed || b.createdAt).getTime() -
          new Date(a.lastPlayed || a.createdAt).getTime()
        );
    }
  });

  const formatDuration = (duration: string) => {
    return duration;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-righteous font-bold text-white mb-2">
                  My Music Library
                </h1>
                <p className="text-white/70 text-lg">
                  Your personal collection of practice sessions and music tracks
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCreateNew}
                  className="inline-flex items-center px-6 py-3 bg-tone-1 text-black font-semibold rounded-xl hover:bg-tone-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Session
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium">Total Sessions</p>
                  <p className="text-3xl font-bold text-white">{myMusic.length}</p>
                </div>
                <div className="w-12 h-12 bg-tone-1/20 rounded-xl flex items-center justify-center">
                  <Music className="w-6 h-6 text-tone-1" />
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium">Total Timestamps</p>
                  <p className="text-3xl font-bold text-white">
                    {myMusic.reduce((sum, item) => sum + item.timestampCount, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-tone-2/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-tone-2" />
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium">Practice Time</p>
                  <p className="text-3xl font-bold text-white">2.5h</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search your music..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-tone-1 focus:border-transparent"
                />
              </div>

              {/* Sort and View Controls */}
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-tone-1"
                >
                  <option value="recent">Most Recent</option>
                  <option value="name">Name</option>
                  <option value="duration">Duration</option>
                </select>

                <div className="flex items-center bg-white/10 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-tone-1 text-black'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'list'
                        ? 'bg-tone-1 text-black'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Music Grid/List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tone-1"></div>
            </div>
          ) : sortedMusic.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music className="w-12 h-12 text-white/50" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">No Music Found</h3>
              <p className="text-white/70 mb-6">Start creating your first practice session</p>
              <button
                onClick={handleCreateNew}
                className="inline-flex items-center px-6 py-3 bg-tone-1 text-black font-semibold rounded-xl hover:bg-tone-2 transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Session
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }
            >
              {sortedMusic.map(item => (
                <div
                  key={item.id}
                  className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 ${
                    viewMode === 'list' ? 'flex items-center p-4' : ''
                  }`}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className="relative">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => handlePlayMusic(item.id)}
                            className="w-16 h-16 bg-tone-1 rounded-full flex items-center justify-center hover:bg-tone-2 transition-all duration-300 transform hover:scale-110"
                          >
                            <Play className="w-8 h-8 text-black ml-1" />
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                        <div className="flex items-center justify-between text-sm text-white/70 mb-4">
                          <span>{formatDuration(item.duration)}</span>
                          <span>{item.timestampCount} timestamps</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/50">
                            Last played: {item.lastPlayed}
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-white/70 hover:text-white transition-colors">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-white/70 hover:text-white transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-white/70 hover:text-red-400 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 ml-4">
                        <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/70">
                          <span>{formatDuration(item.duration)}</span>
                          <span>{item.timestampCount} timestamps</span>
                          <span>Last played: {item.lastPlayed}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePlayMusic(item.id)}
                          className="p-3 bg-tone-1 rounded-lg hover:bg-tone-2 transition-all duration-300"
                        >
                          <Play className="w-5 h-5 text-black" />
                        </button>
                        <button className="p-3 text-white/70 hover:text-white transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-3 text-white/70 hover:text-white transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-3 text-white/70 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyMusic;
