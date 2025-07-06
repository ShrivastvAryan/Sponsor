import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Star } from "lucide-react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventType: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      eventType: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden pt-20">
      {/* Floating Dots/Orbs Background - Matching your site exactly */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/40 rounded-full"></div>
        <div className="absolute top-32 right-40 w-1 h-1 bg-blue-300/60 rounded-full"></div>
        <div className="absolute top-48 left-1/4 w-3 h-3 bg-purple-300/50 rounded-full"></div>
        <div className="absolute top-64 right-20 w-2 h-2 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-40 left-32 w-1 h-1 bg-pink-300/50 rounded-full"></div>
        <div className="absolute bottom-60 right-1/3 w-2 h-2 bg-white/40 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400/60 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-400/40 rounded-full"></div>
        <div className="absolute top-1/2 left-16 w-2 h-2 bg-white/50 rounded-full"></div>
        <div className="absolute bottom-20 right-16 w-1 h-1 bg-cyan-300/50 rounded-full"></div>
      </div>

      {/* Top Banner */}
      <div className="relative z-10 text-center py-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 inline-block border border-white/20">
          <span className="text-white font-medium flex items-center">
            <Star className="w-4 h-4 mr-2" />
            Connecting Events • Empowering Sponsors • Building Success
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your Event with
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mt-2">
              Perfect Sponsors
            </span>
          </h1>

          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            The ultimate platform connecting event organizers with ideal
            sponsors. From hackathons to conferences, find funding partners who
            share your vision and amplify your impact.
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <div className="flex items-center space-x-2 text-white/90">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Instant Matching</span>
          </div>
          <div className="flex items-center space-x-2 text-white/90">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Verified Sponsors</span>
          </div>
          <div className="flex items-center space-x-2 text-white/90">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Multiple Funding Types</span>
          </div>
          <div className="flex items-center space-x-2 text-white/90">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Global Network</span>
          </div>
        </div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-8">
              Send us a message
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white/90 font-semibold mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-2xl border border-white/20 focus:border-yellow-400 focus:outline-none transition-all bg-white/10 backdrop-blur-sm focus:bg-white/15 text-white placeholder-white/60"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-white/90 font-semibold mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-2xl border border-white/20 focus:border-yellow-400 focus:outline-none transition-all bg-white/10 backdrop-blur-sm focus:bg-white/15 text-white placeholder-white/60"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-white/90 font-semibold mb-3">
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-2xl border border-white/20 focus:border-yellow-400 focus:outline-none transition-all bg-white/10 backdrop-blur-sm focus:bg-white/15 text-white"
                >
                  <option value="" className="text-gray-800 bg-white">
                    Select event type
                  </option>
                  <option value="hackathon" className="text-gray-800 bg-white">
                    Hackathon
                  </option>
                  <option value="conference" className="text-gray-800 bg-white">
                    Conference
                  </option>
                  <option value="workshop" className="text-gray-800 bg-white">
                    Workshop
                  </option>
                  <option value="networking" className="text-gray-800 bg-white">
                    Networking Event
                  </option>
                  <option value="other" className="text-gray-800 bg-white">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-white/90 font-semibold mb-3">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-5 py-4 rounded-2xl border border-white/20 focus:border-yellow-400 focus:outline-none transition-all resize-none bg-white/10 backdrop-blur-sm focus:bg-white/15 text-white placeholder-white/60"
                  placeholder="Tell us about your event and sponsorship needs..."
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 mt-8 shadow-lg"
              >
                <span className="text-lg">Send Messsage</span>
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 text-white shadow-2xl border border-white/10">
              <h2 className="text-3xl font-bold mb-8">Get in touch</h2>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-white/80 text-lg">
                      hello@sponsormatch.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-white/80 text-lg">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Address</h3>
                    <p className="text-white/80 text-lg">
                      123 Innovation Drive
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 text-white border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Quick Questions?</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-white mb-2">
                    How does the matching work?
                  </h4>
                  <p className="text-white/80 leading-relaxed">
                    Our AI algorithm matches events with sponsors based on
                    industry, budget, location, and event type.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-2">
                    Is there a fee to use the platform?
                  </h4>
                  <p className="text-white/80 leading-relaxed">
                    Basic matching is free. We only charge a small success fee
                    when you secure sponsorship.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-2">
                    How long does it take to get responses?
                  </h4>
                  <p className="text-white/80 leading-relaxed">
                    Most sponsors respond within 2-8 hours. Premium sponsors
                    typically respond faster.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
