import { useEffect, useState } from "react";
import { Search, Phone, Mail, Calendar, Copy, Check, Link } from "lucide-react";

export const Connect = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSponsors, setSelectedSponsors] = useState([]);
  const [isCompanies, setIsCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emailsCopied, setEmailsCopied] = useState(false);

  console.log(isCompanies);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch("http://localhost:4000/allsponsor");
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
    'All',
    'Food and Beverage',
    'Technology',
    'Healthcare',
    'Ed-Tech',
    'Education',
    'Retail',
    'Finance',
    'Entertainment',
    'Sports',
    'Travel',
    'Fashion',
    'Other'
  ];

  const filteredSponsors = isCompanies.filter((sponsor) => {
    const matchesSearch =
      sponsor.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sponsor.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" ||
      sponsor.category.toLowerCase() === selectedFilter.toLowerCase() ||
      sponsor.category === selectedFilter;
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

  const getSelectedSponsorEmails = () => {
    return selectedSponsors
      .map((sponsorId) => {
        const sponsor = isCompanies.find((s) => s.id === sponsorId);
        return sponsor ? sponsor.email : null;
      })
      .filter((email) => email !== null);
  };

  const copyEmailsToClipboard = async () => {
    const emails = getSelectedSponsorEmails();
    const emailString = emails.join("; ");

    try {
      await navigator.clipboard.writeText(emailString);
      setEmailsCopied(true);
      setTimeout(() => setEmailsCopied(false), 2000);
      return true;
    } catch (err) {
      console.error("Failed to copy emails:", err);
      return false;
    }
  };

  const handleConnectAll = async () => {
    if (selectedSponsors.length === 0) {
      alert("Please select at least one sponsor to connect.");
      return;
    }

    const emails = getSelectedSponsorEmails();
    const sponsorNames = selectedSponsors
      .map((sponsorId) => {
        const sponsor = isCompanies.find((s) => s.id === sponsorId);
        return sponsor ? sponsor.company_name : null;
      })
      .filter((name) => name !== null);

    // Copy emails to clipboard first
    await copyEmailsToClipboard();

    // Create mailto URL with BCC
    const bccEmails = emails.join(",");
    const subject = encodeURIComponent(
      "Sponsorship Opportunity - Partnership Proposal"
    );
    const body = encodeURIComponent(`Dear Sponsors,

I hope this message finds you well. I am reaching out to discuss potential sponsorship opportunities for our upcoming event.

We believe that a partnership with your organization would be mutually beneficial and align with your company's values and objectives.

Selected Companies:
${sponsorNames.map((name) => `• ${name}`).join("\n")}

I would love to schedule a brief call to discuss how we can collaborate and create value for both parties.

Thank you for considering this opportunity. I look forward to hearing from you.

Best regards,
[Your Name]
[Your Title]
[Your Organization]
[Your Contact Information]`);

    // Create the mailto URL
    const mailtoUrl = `mailto:?bcc=${bccEmails}&subject=${subject}&body=${body}`;

    // Open the mail client
    window.location.href = mailtoUrl;

    // Show success message
    alert(
      `Emails copied to clipboard! Opening mail client with ${selectedSponsors.length} sponsors in BCC.`
    );
  };

  const handleClearAll = () => {
    setSelectedSponsors([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden pt-15 pb-10">
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
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-orange-400/20 text-orange-300 rounded-full text-sm font-medium border border-orange-400/30 animate-pulse">
                      {selectedSponsors.length} selected
                    </span>
                    <button
                      onClick={copyEmailsToClipboard}
                      className="px-3 py-1 bg-blue-400/20 text-blue-300 rounded-full text-sm font-medium border border-blue-400/30 hover:bg-blue-400/30 transition-colors duration-200 flex items-center gap-1"
                    >
                      {emailsCopied ? (
                        <>
                          <Check size={14} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          Copy Emails
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Connection Action Bar */}
        {selectedSponsors.length > 0 && (
          <div className="mb-8 ">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-lg rounded-full px-6 py-4 shadow-2xl border border-white/20 max-w-4xl mx-auto">
              <div className="flex items-center gap-4">
                {/* Selected sponsors avatars */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {selectedSponsors.slice(0, 3).map((sponsorId, index) => {
                      const sponsor = isCompanies.find(
                        (s) => s.id === sponsorId
                      );
                      return (
                        <div
                          key={sponsorId}
                          className="w-10 h-10 rounded-full bg-white object-contain flex items-center justify-center text-sm border-2 border-white shadow-lg"
                          style={{ zIndex: 10 - index }}
                        >
                          <img
                            src={sponsor.logo_url}
                            className="rounded-full"
                          />
                        </div>
                      );
                    })}
                    {selectedSponsors.length > 3 && (
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xs text-white border-2 border-white shadow-lg">
                        +{selectedSponsors.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="text-white ml-2">
                    <div className="font-bold text-sm">
                      {selectedSponsors.length} sponsor
                      {selectedSponsors.length > 1 ? "s" : ""} selected
                    </div>
                    <div className="text-xs text-white/80">
                      Ready to connect via email (BCC)
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={handleClearAll}
                    className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors duration-200"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleConnectAll}
                    className="px-6 py-2 bg-white text-blue-600 rounded-full font-semibold text-sm hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <Mail size={16} />
                    Connect All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Email Preview */}
        {selectedSponsors.length > 0 && (
          <div className="mb-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <Mail size={18} className="text-orange-400" />
                <h3 className="text-white font-semibold">Email Preview</h3>
              </div>
              <div className="text-sm text-gray-300 space-y-1">
                <div>
                  <strong>BCC:</strong> {getSelectedSponsorEmails().join("; ")}
                </div>
                <div>
                  <strong>Subject:</strong> Sponsorship Opportunity -
                  Partnership Proposal
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Click "Connect All" to open your email client with all
                  selected sponsors in BCC
                </div>
              </div>
            </div>
          </div>
        )}

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
              {/* Selection Indicator */}
              {selectedSponsors.includes(sponsor.id) && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center animate-scaleIn">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {/* Sponsor Icon */}
              <div className="flex justify-center mb-4">
                <div
                  className={`w-20 h-20 object-contain bg-gradient-to-br bg-white rounded-xl flex items-center justify-center text-2xl shadow-lg transition-all duration-300 ${
                    selectedSponsors.includes(sponsor.id)
                      ? "rotate-12 scale-110 shadow-orange-400/50"
                      : "group-hover:rotate-12 group-hover:scale-110"
                  }`}
                >
                  <img src={sponsor.logo_url} />
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
                {sponsor.company_name}
              </h3>

              {/* Event Type Badge */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Calendar size={16} className="text-orange-400" />
                <span className="text-gray-300 text-sm font-medium">
                  {sponsor.category}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sponsor.sponsorshipType === "monetary"
                      ? "bg-yellow-400/20 text-yellow-300 border border-yellow-400/30"
                      : "bg-blue-400/20 text-blue-300 border border-blue-400/30"
                  }`}
                >
                  {sponsor.category}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-orange-400 flex-shrink-0" />
                  <a
                    href={`mailto:${sponsor.email}`}
                    target="_blank"
                    className="text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm truncate"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {sponsor.email || "No Email Provided"}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Link size={14} className="text-orange-400 flex-shrink-0" />
                  <a
                    href={sponsor.link2}
                    target="_blank"
                    className="text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm truncate"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {sponsor.link2 || "No Link Provided"}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Link size={14} className="text-orange-400 flex-shrink-0" />
                  <a
                    href={sponsor.link2}
                    target="_blank"
                    className="text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm truncate"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {sponsor.link3 || "No Link Provided"}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-orange-400 flex-shrink-0" />
                  <a
                    href={`tel:${sponsor.phoneNumber}`}
                    target="_blank"
                    className="text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {sponsor.phoneNumber || "No Phone Number Provided"}
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

        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
