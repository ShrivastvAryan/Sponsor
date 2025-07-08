import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Star,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Sparkles,
} from "lucide-react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    Platform: [
      { name: "Find Sponsors", href: "#" },
      { name: "Event Hosting", href: "#" },
      { name: "Sponsor Dashboard", href: "#" },
      { name: "Success Stories", href: "#" },
      { name: "Pricing", href: "#" },
    ],
    Resources: [
      { name: "Help Center", href: "#" },
      { name: "API Documentation", href: "#" },
      { name: "Community", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Webinars", href: "#" },
    ],
    Company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press Kit", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Partners", href: "#" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "GDPR", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-purple-700/30">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Stay Updated
              </h3>
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-purple-200 max-w-md mx-auto">
              Get the latest updates on new sponsors, events, and platform
              features.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 border border-purple-600/30 rounded-xl 
                           placeholder-purple-300 text-white focus:outline-none focus:border-purple-400 
                           focus:ring-2 focus:ring-purple-400/20 transition-all duration-300
                           backdrop-blur-sm"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                         rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 
                         hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 group"
              >
                {isSubscribed ? (
                  <span className="text-green-300">✓ Subscribed!</span>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center  gap-2 mb-6">
              {/* <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Sponsors
              </span> */}
              <NavLink
                to="/"
                className="flex -mt-20  items-center space-x-3 group"
              >
                <div className="w-48 h-auto">
                  <img
                    src="/Click2sponsor.png" // ✅ No `/public` in path!
                    alt="Click2Sponsor Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </NavLink>
            </div>
            <p className="text-purple-200 -mt-15 mb-6 leading-relaxed">
              The ultimate platform connecting event organizers with ideal
              sponsors. Transform your events with perfect funding partners.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/connect"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Find Sponsors
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/team"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Team
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
    

          {/* Follow Us */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Disclaimer</h3>
            <div className="flex h-auto w-90vw lg:w-[30rem]  p-1 text-sm text-justify text-gray-400">
            This website helps users discover potential sponsors. While we aim for accurate and reliable content, we do not guarantee the legitimacy, accurate information, availability, or success of any sponsorship opportunity.

            We do not endorse or take responsibility for any actions, agreements, or transactions between users and sponsors. All decisions are made solely at the users' own risk.

            By using this platform, you agree that we are not liable for any loss, dispute, or damage resulting from interactions with sponsors. Always conduct your own research before entering into any sponsorship arrangement.


            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t text-center border-purple-700/30 ">
          <p className="text-gray-400 text-sm">Developed by team Data Smiths</p>
          <p className="text-gray-400 text-sm mt-2">
            © 2024 Sponsors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
