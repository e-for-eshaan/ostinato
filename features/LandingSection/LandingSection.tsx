import React from 'react';
import { FormatHeading, PageSection, Piano, Text, VideoInput } from '../../components';

export const LandingSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-tone-1/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-tone-2/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <PageSection className="relative z-10 pt-32 pb-20">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <FormatHeading />
          </div>

          <h1 className="text-5xl md:text-7xl font-righteous font-bold text-white mb-6 leading-tight">
            Master Music with
            <span className="block bg-gradient-to-r from-tone-1 to-tone-2 bg-clip-text text-transparent">
              Precision
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform any YouTube video into an interactive learning experience. Create timestamps,
            practice loops, and track your progress like never before.
          </p>

          {/* Video Input */}
          <VideoInput className="mb-12" />

          {/* Stats */}
          <div className="flex justify-center space-x-12 text-white/60">
            <div className="text-center">
              <div className="text-2xl font-bold text-tone-1">∞</div>
              <div className="text-sm">Practice Loops</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-tone-2">100%</div>
              <div className="text-sm">Free to Use</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-tone-1">⚡</div>
              <div className="text-sm">Instant Setup</div>
            </div>
          </div>
        </div>

        {/* Interactive Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">
          {/* Piano Section */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-tone-1/20 to-tone-2/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Piano />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-righteous font-bold">
              Built for <span className="text-tone-1">Musicians</span>,
              <br />
              by <span className="text-tone-2">Musicians</span>
            </h2>

            <div className="space-y-4 text-lg text-white/80">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-tone-1 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black text-sm font-bold">✓</span>
                </div>
                <p>Create precise timestamps for any part of your favorite songs</p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-tone-2 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black text-sm font-bold">✓</span>
                </div>
                <p>Practice with custom loops that repeat exactly what you need</p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-tone-1 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black text-sm font-bold">✓</span>
                </div>
                <p>Track your proficiency and save your progress across devices</p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#how-to-use"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-tone-1 to-tone-2 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-tone-1/25 transition-all duration-300"
              >
                See How It Works
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
};
