import { FormatHeading, Heading, PageSection, Slideshow, Text } from '../../components';

export const AboutSection = () => {
  return (
    <section id="how-to-use" className="bg-gradient-to-b from-black to-gray-900 py-20">
      <PageSection className="relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FormatHeading label="HOW TO USE" />
          <h2 className="text-4xl md:text-5xl font-righteous font-bold text-white mt-6 mb-4">
            Get Started in <span className="text-tone-1">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Transform any YouTube video into your personal practice session in minutes
          </p>
        </div>

        {/* Enhanced Carousel Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Carousel */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-tone-1/10 to-tone-2/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <Slideshow />
            </div>
          </div>

          {/* Step Details */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-tone-1 to-tone-2 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Paste YouTube URL</h3>
                  <p className="text-white/70">
                    Simply copy and paste any YouTube video URL into our player
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-tone-2 to-tone-1 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Create Timestamps</h3>
                  <p className="text-white/70">
                    Mark specific parts of the song you want to practice
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-tone-1 to-tone-2 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Set Practice Loops</h3>
                  <p className="text-white/70">Configure loops to repeat sections automatically</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-tone-2 to-tone-1 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-lg">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Track Progress</h3>
                  <p className="text-white/70">Monitor your proficiency and save your progress</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <a
                href="/"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-tone-1 to-tone-2 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-tone-1/25 transition-all duration-300"
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
              </a>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-r from-tone-1 to-tone-2 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-black text-2xl">🎵</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Precise Control</h3>
            <p className="text-white/70">
              Create exact timestamps for any part of your favorite songs
            </p>
          </div>

          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-r from-tone-2 to-tone-1 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-black text-2xl">🔄</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Loops</h3>
            <p className="text-white/70">
              Practice with custom loops that repeat exactly what you need
            </p>
          </div>

          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-r from-tone-1 to-tone-2 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-black text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Progress Tracking</h3>
            <p className="text-white/70">
              Monitor your proficiency and save progress across devices
            </p>
          </div>
        </div>
      </PageSection>
    </section>
  );
};
