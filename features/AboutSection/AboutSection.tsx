import { FormatHeading, Heading, PageSection, Slideshow, Text } from '../../components';
import { createDefault } from '../../utils/functions';
import { useRouter } from 'next/router';
import { Music, Repeat, BarChart3 } from 'lucide-react';

export const AboutSection = () => {
  const router = useRouter();

  const handleTryItNow = () => {
    const videoId = createDefault();
    router.push(`/watch?v=${videoId}`);
  };

  return (
    <section id="how-to-use" className="bg-gradient-to-b from-black to-gray-900 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1
            className={`text-white sm:text-[100px] md:text-[150px] text-[70px] font-righteous leading-none`}
          >
            HOW TO USE
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-righteous font-bold text-white mt-4 mb-3">
            Get Started in <span className="text-tone-1">4 Simple Steps</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Transform any YouTube video into your personal practice session in minutes
          </p>
        </div>

        {/* Enhanced Carousel Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Step Details - Full width on mobile, half width on desktop */}
          <div className="space-y-6 lg:space-y-8 w-full order-1 lg:order-2">
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-tone-2 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-md">1</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1">Paste YouTube URL</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Simply copy and paste any YouTube video URL into our player
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-tone-2 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-md">2</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1">Create Timestamps</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Mark specific parts of the song you want to practice
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-tone-2 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-md">3</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1">Set Practice Loops</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Configure loops to repeat sections automatically
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-tone-2 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-md">4</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1">Track Progress</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Monitor your proficiency and save your progress
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <button
                onClick={handleTryItNow}
                className="inline-flex items-center px-8 py-4 bg-tone-1 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-tone-1/25 transition-all duration-300"
              >
                Try It Now
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel - Full width on mobile, half width on desktop */}
          <div className="relative w-full order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-r from-tone-1/10 to-tone-2/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-black/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/10">
              <Slideshow />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="w-16 h-16 bg-tone-2 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Precise Control</h3>
            <p className="text-white/70">
              Create exact timestamps for any part of your favorite songs
            </p>
          </div>

          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="w-16 h-16 bg-tone-2 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Repeat className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Loops</h3>
            <p className="text-white/70">
              Practice with custom loops that repeat exactly what you need
            </p>
          </div>

          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="w-16 h-16 bg-tone-2 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Progress Tracking</h3>
            <p className="text-white/70">
              Monitor your proficiency and save progress across devices
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
