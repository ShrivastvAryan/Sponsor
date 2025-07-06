import { useEffect, useState } from "react";
import { Search, Filter, Phone, Mail, Building2, Calendar } from "lucide-react";

// Mock data for demo - replace with your actual sponsors import
const sponsors = [
  {
    id: 1,
    name: "TechCorp Solutions",
    eventType: "Hackathon",
    sponsorshipType: "monetary",
    email: "contact@techcorp.com",
    phone: "+1-555-0123",
    icon: "🏢",
  },
  {
    id: 2,
    name: "InnovateLab",
    eventType: "Conference",
    sponsorshipType: "in-kind",
    email: "hello@innovatelab.com",
    phone: "+1-555-0456",
    icon: "🚀",
  },
  {
    id: 3,
    name: "DevSponsor Inc",
    eventType: "Workshop",
    sponsorshipType: "monetary",
    email: "sponsors@devsponsor.com",
    phone: "+1-555-0789",
    icon: "💻",
  },
  {
    id: 4,
    name: "StartupHub",
    eventType: "Student Fest",
    sponsorshipType: "in-kind",
    email: "events@startuphub.com",
    phone: "+1-555-0321",
    icon: "🎯",
  },
];

export const Connect = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSponsors, setSelectedSponsors] = useState([]);
  const [isCompanies, setIsCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(isCompanies);

  // API fetching from backend
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch(
          "https://sponsor-rgac.onrender.com/allsponsor"
        );
        const data = await response.json();
        setIsCompanies(data);
      } catch (error) {
        console.error("Error in fetching the data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  const eventTypes = [
    "all",
    "Hackathon",
    "Student Fest",
    "Conference",
    "Workshop",
  ];

  const filteredSponsors = sponsors.filter((sponsor) => {
    const matchesSearch =
      sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sponsor.eventType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      sponsor.eventType === selectedFilter ||
      sponsor.sponsorshipType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCardClick = (sponsorId) => {
    setSelectedSponsors((prev) =>
      prev.includes(sponsorId)
        ? prev.filter((id) => id !== sponsorId)
        : [...prev, sponsorId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSponsors.length === filteredSponsors.length) {
      setSelectedSponsors([]);
    } else {
      setSelectedSponsors(filteredSponsors.map((sponsor) => sponsor.id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden pt-30 pb-10">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
              Perfect Sponsors
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover ideal funding partners for your events. Connect with
            sponsors who share your vision and amplify your impact.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-1/2">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search sponsors or events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
              />
            </div>

            {/* Filter and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <select
                className="px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 cursor-pointer"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {eventTypes.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-purple-900 text-white"
                  >
                    {category}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSelectAll}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                    selectedSponsors.length > 0
                      ? "bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg"
                      : "bg-white/10 text-gray-300 border border-white/20 hover:bg-white/15"
                  }`}
                >
                  {selectedSponsors.length === filteredSponsors.length
                    ? "Deselect All"
                    : "Select All"}
                </button>

                {selectedSponsors.length > 0 && (
                  <span className="px-3 py-1 bg-orange-400/20 text-orange-300 rounded-full text-sm font-medium border border-orange-400/30 animate-pulse">
                    {selectedSponsors.length} selected
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
          </div>
        )}

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSponsors.map((sponsor, index) => (
            <div
              key={sponsor.id}
              onClick={() => handleCardClick(sponsor.id)}
              className={`group relative bg-white/10 backdrop-blur-lg p-6 border border-white/20 transition-all duration-500 cursor-pointer select-none
                ${
                  selectedSponsors.includes(sponsor.id)
                    ? "ring-2 ring-orange-400 shadow-2xl shadow-orange-400/40 rounded-2xl scale-105 transform"
                    : "rounded-xl hover:scale-105 hover:bg-white/15"
                }
                hover:shadow-xl hover:shadow-orange-400/20 active:scale-95
              `}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "fadeInUp 0.8s ease-out both",
              }}
            >
              {/* Selection Indicator - Hidden */}
              <div className="absolute top-4 right-4 opacity-0 pointer-events-none">
                <div className="w-6 h-6 rounded-full border-2 border-white/40"></div>
              </div>

              {/* Sponsor Icon */}
              <div className="flex justify-center mb-4">
                <div
                  className={`w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-400 rounded-xl flex items-center justify-center text-2xl shadow-lg transition-all duration-300 ${
                    selectedSponsors.includes(sponsor.id)
                      ? "rotate-12 scale-110 shadow-orange-400/50"
                      : "group-hover:rotate-12 group-hover:scale-110"
                  }`}
                >
                  {sponsor.icon}
                </div>
              </div>

              {/* Company Name */}
              <h3
                className={`text-xl font-bold text-center mb-3 transition-all duration-300 ${
                  selectedSponsors.includes(sponsor.id)
                    ? "text-orange-300 scale-105"
                    : "text-white group-hover:text-orange-300"
                }`}
              >
                {sponsor.name}
              </h3>

              {/* Event Type Badge */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Calendar size={16} className="text-orange-400" />
                <span className="text-gray-300 text-sm font-medium">
                  {sponsor.eventType}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sponsor.sponsorshipType === "monetary"
                      ? "bg-yellow-400/20 text-yellow-300 border border-yellow-400/30"
                      : "bg-blue-400/20 text-blue-300 border border-blue-400/30"
                  }`}
                >
                  {sponsor.sponsorshipType}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-orange-400 flex-shrink-0" />
                  <a
                    href={`mailto:${sponsor.email}`}
                    className="text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm truncate"
                  >
                    {sponsor.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-orange-400 flex-shrink-0" />
                  <a
                    href={`tel:${sponsor.phone}`}
                    className="text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm"
                  >
                    {sponsor.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSponsors.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 max-w-md mx-auto">
              <div className="w-16 h-16 bg-orange-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No sponsors found
              </h3>
              <p className="text-gray-300">
                Try adjusting your search terms or filters
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
