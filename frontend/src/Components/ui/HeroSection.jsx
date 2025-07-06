import {
  Building,
  Trophy,
  Target,
  Clock,
  Sparkles,
  Zap,
  Shield,
  Gift,
  Network,
  Search,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-30 pb-5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full opacity-30"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 `}>
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 hover:bg-white/20 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white text-sm font-medium">
              Connecting Events • Empowering Sponsors • Building Success
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your Event with
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              Perfect Sponsors
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            The ultimate platform connecting event organizers with ideal
            sponsors. From hackathons to conferences, find funding partners who
            share your vision and amplify your impact.
          </p>

          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-white/80">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Instant Matching</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>Verified Sponsors</span>
            </div>
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-purple-400" />
              <span>Multiple Funding Types</span>
            </div>
            <div className="flex items-center space-x-2">
              <Network className="w-5 h-5 text-blue-400" />
              <span>Global Network</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <NavLink
              to="/connect"
              // onClick={() => setActiveTab("explore")}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-3 hover:scale-105"
            >
              <Search className="w-5 h-5" />
              <span>Find Sponsors Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce ">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer hover:border-white/50 transition-colors">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
