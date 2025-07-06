import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Mock data for events since we don't have the JSON file
const abtEvent = [
  {
    icon: "🎯",
    title: "Conferences",
    desc: "Professional conferences seeking industry-leading sponsors to enhance attendee experience and drive innovation.",
    color: "purple",
  },
  {
    icon: "💡",
    title: "Hackathons",
    desc: "Innovation-driven hackathons looking for tech sponsors to fuel creativity and breakthrough solutions.",
    color: "blue",
  },
  {
    icon: "🏆",
    title: "Competitions",
    desc: "Competitive events seeking sponsors to reward excellence and recognize outstanding achievements.",
    color: "indigo",
  },
  {
    icon: "🎓",
    title: "Workshops",
    desc: "Educational workshops partnering with sponsors to provide valuable learning experiences and resources.",
    color: "purple",
  },
  {
    icon: "🌟",
    title: "Networking Events",
    desc: "Professional networking events connecting sponsors with targeted audiences and industry leaders.",
    color: "blue",
  },
  {
    icon: "🚀",
    title: "Startup Events",
    desc: "Entrepreneurial events seeking sponsors to support the next generation of innovative startups.",
    color: "indigo",
  },
];

export const About = () => {
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id^="animate-"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-3000"></div>
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-60 right-1/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-5 py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
            <span className="text-base">🏢</span>
            <span>Direct Access to Sponsors</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 text-white leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Find Your Perfect
            </span>
            <br />
            <span className="relative">
              Sponsorship Partners
              <span className="absolute -right-2 top-0 bottom-0 w-0.5 bg-yellow-400 animate-pulse"></span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Browse our comprehensive database of companies, select the ones that
            match your event, and reach out directly. No registration required -
            just explore, select, and connect.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
            <NavLink
              to="/connect"
              className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 px-8 py-4 rounded-full font-semibold text-lg hover:transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>🔍</span>
                Browse Companies
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </NavLink>

            <NavLink
              to="/connect"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 hover:transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <span>📧</span>
              Start Reaching Out
            </NavLink>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-1">
                2000+
              </div>
              <div className="text-white/80 text-sm">Companies Listed</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-1">
                50+
              </div>
              <div className="text-white/80 text-sm">Industries Covered</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-1">
                100%
              </div>
              <div className="text-white/80 text-sm">Free Access</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 animate-float">
            <div className="text-2xl mb-2">🏢</div>
            <div className="text-white text-sm font-medium">Companies</div>
          </div>
          <div className="absolute top-3/5 right-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 animate-float-delayed">
            <div className="text-2xl mb-2">📧</div>
            <div className="text-white text-sm font-medium">Direct Contact</div>
          </div>
          <div className="absolute bottom-1/4 left-1/6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 animate-float-slow">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-white text-sm font-medium">Instant Access</div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div
            id="animate-problem"
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible["animate-problem"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 uppercase tracking-wide">
              The Challenge
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Finding Sponsors{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Shouldn't Be Hard
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Traditional methods of finding sponsors are time-consuming and
              ineffective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Endless Searching",
                desc: "Hours spent on Google trying to find companies that might be interested in sponsoring your event",
                delay: "animate-slideUp",
              },
              {
                icon: "❓",
                title: "Missing Information",
                desc: "Difficulty finding accurate contact details and understanding company preferences",
                delay: "animate-slideUp-delayed",
              },
              {
                icon: "📧",
                title: "Cold Outreach",
                desc: "Sending emails without knowing if companies are actively looking for sponsorship opportunities",
                delay: "animate-slideUp-slow",
              },
            ].map((problem, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 hover:transform hover:-translate-y-2 transition-all duration-300 group ${problem.delay}`}
              >
                <div className="relative mb-6">
                  <div className="text-5xl mb-4 ">{problem.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {problem.title}
                </h3>
                <p className="text-white/80 leading-relaxed">{problem.desc}</p>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-t-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-5 bg-gradient-to-br from-purple-800/50 to-blue-800/50">
        <div className="max-w-6xl mx-auto">
          <div
            id="animate-solution"
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible["animate-solution"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 uppercase tracking-wide">
              Our Solution
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Simple{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Company Directory
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Access organized company information and contact details in one
              place
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-10">
              {[
                {
                  icon: "🗂️",
                  title: "Organized Database",
                  desc: "Browse companies categorized by industry, size, and location with detailed profiles and contact information",
                  delay: "animate-slideInLeft",
                },
                {
                  icon: "🎯",
                  title: "Smart Filtering",
                  desc: "Filter companies by industry, budget range, location, and sponsorship history to find the best matches",
                  delay: "animate-slideInLeft-delayed",
                },
                {
                  icon: "📋",
                  title: "Select & Collect",
                  desc: "Choose multiple companies that interest you and collect their contact details for your outreach",
                  delay: "animate-slideInLeft-slow",
                },
                {
                  icon: "📧",
                  title: "Direct Contact",
                  desc: "Get verified email addresses and contact information to reach out directly on your own",
                  delay: "animate-slideInLeft-slowest",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-6 group ${feature.delay}`}
                >
                  <div className="relative flex-shrink-0 w-15 h-15 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    <span className="relative z-10">{feature.icon}</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                  {index < 3 && (
                    <div className="absolute left-7 top-16 w-0.5 h-10 bg-gradient-to-b from-yellow-400 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="sticky top-32">
              <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl p-8 text-white shadow-2xl border border-white/20">
                <h3 className="text-2xl font-bold mb-8 text-center">
                  Simple 3-Step Process
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Browse Companies",
                      desc: "Explore our database and use filters to find relevant companies",
                    },
                    {
                      step: 2,
                      title: "Select & Save",
                      desc: "Choose companies that match your event and save their details",
                    },
                    {
                      step: 3,
                      title: "Reach Out",
                      desc: "Contact companies directly using the information provided",
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-5 p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 hover:transform hover:translate-x-2 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-purple-900 font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">
                          {step.title}
                        </h4>
                        <p className="text-white/80 text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div
            id="animate-serve"
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible["animate-serve"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 uppercase tracking-wide">
              Perfect For
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Any Event{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Organizer
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Whether you're planning a small workshop or a large conference,
              find the right sponsors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {abtEvent.map((item, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 hover:transform hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden animate-slideInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="relative z-10">{item.icon}</span>
                  </div>
                  <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-pulse"></div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-white/80 leading-relaxed">{item.desc}</p>

                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-orange-500/10 animate-pulse"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-white font-semibold mb-8 animate-pulse">
            <span>🎯</span>
            <span>Start Exploring Today</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Stop Searching. Start{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Finding
            </span>
          </h2>

          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Access our comprehensive company directory and start connecting with
            potential sponsors right now
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
            <NavLink
              to="/connect"
              className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 px-10 py-5 rounded-full font-bold text-xl hover:transform hover:-translate-y-1 transition-all duration-300 shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span>🏢</span>
                Browse Companies Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </NavLink>

            <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 hover:transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 justify-center">
              <span>ℹ️</span>
              Learn More
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {[
              "✅ No Registration Required",
              "✅ Free to Browse",
              "✅ Updated Daily",
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white font-semibold animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(-5deg);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(3deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite 2s;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite 4s;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out 0.2s both;
        }

        .animate-slideUp-delayed {
          animation: slideUp 0.8s ease-out 0.4s both;
        }

        .animate-slideUp-slow {
          animation: slideUp 0.8s ease-out 0.6s both;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out 0.2s both;
        }

        .animate-slideInLeft-delayed {
          animation: slideInLeft 0.8s ease-out 0.4s both;
        }

        .animate-slideInLeft-slow {
          animation: slideInLeft 0.8s ease-out 0.6s both;
        }

        .animate-slideInLeft-slowest {
          animation: slideInLeft 0.8s ease-out 0.8s both;
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
};
