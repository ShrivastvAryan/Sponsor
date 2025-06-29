import React, { useState, useEffect } from "react";
import "./Explore2.css";

export const Explore2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [allSelected, setAllSelected] = useState(false);
  const [selectedSponsors, setSelectedSponsors] = useState(new Set());
  const [particles, setParticles] = useState([]);

  const sponsors = [
    {
      id: 1,
      name: "Google",
      tags: ["🎯 Hackathon", "💰 monetary"],
      email: "sponsorships@google.com",
      phone: "+1-800-555-0191",
      icon: "📄",
    },
    {
      id: 2,
      name: "Microsoft",
      tags: ["🎓 Student Fest", "💰 monetary"],
      email: "events@microsoft.com",
      phone: "+1-800-642-7676",
      icon: "📄",
    },
    {
      id: 3,
      name: "Amazon Web Services",
      tags: ["🎯 Hackathon", "💰 monetary"],
      email: "sponsorships@aws.amazon.com",
      phone: "+1-888-280-4331",
      icon: "📄",
    },
    {
      id: 4,
      name: "Meta",
      tags: ["🎯 Hackathon", "💰 monetary"],
      email: "partnerships@meta.com",
      phone: "+1-650-543-4800",
      icon: "📄",
    },
    {
      id: 5,
      name: "Apple",
      tags: ["🎓 Student Fest", "💰 monetary"],
      email: "education@apple.com",
      phone: "+1-800-275-2273",
      icon: "📄",
    },
    {
      id: 6,
      name: "Netflix",
      tags: ["🎯 Hackathon", "💰 monetary"],
      email: "partnerships@netflix.com",
      phone: "+1-866-579-7172",
      icon: "📄",
    },
  ];

  const categories = [
    "All Categories",
    "💰 Monetary",
    "🎯 Hackathon",
    "🎓 Student Fest",
  ];

  // Create floating particles
  useEffect(() => {
    const particleArray = [];
    for (let i = 0; i < 50; i++) {
      particleArray.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + 4,
      });
    }
    setParticles(particleArray);
  }, []);

  // Filter sponsors based on search and category
  const filteredSponsors = sponsors.filter((sponsor) => {
    const matchesSearch = sponsor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      sponsor.tags.some((tag) =>
        tag
          .toLowerCase()
          .includes(selectedCategory.toLowerCase().replace(/[^\w\s]/gi, ""))
      );
    return matchesSearch && matchesCategory;
  });

  // Handle checkbox changes
  const handleSponsorSelect = (sponsorId) => {
    const newSelected = new Set(selectedSponsors);
    if (newSelected.has(sponsorId)) {
      newSelected.delete(sponsorId);
    } else {
      newSelected.add(sponsorId);
    }
    setSelectedSponsors(newSelected);
    setAllSelected(newSelected.size === filteredSponsors.length);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedSponsors(new Set());
      setAllSelected(false);
    } else {
      const allIds = new Set(filteredSponsors.map((s) => s.id));
      setSelectedSponsors(allIds);
      setAllSelected(true);
    }
  };

  return (
    <div className="container">
      {/* Animated background particles */}
      {/* <div className="bg-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div> */}
      {/* Main content */}
      <main className="main-content">
        {/* Search section */}
        <section className="search-section">
          <div className="search-controls">
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Search sponsors or events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  🏷️ {category}
                </option>
              ))}
            </select>
            <button className="select-all-btn" onClick={handleSelectAll}>
              {allSelected ? "Deselect All" : "Select All"}
            </button>
          </div>
        </section>

        {/* Sponsors grid */}
        <section className="sponsors-grid">
          {filteredSponsors.map((sponsor, index) => (
            <div
              key={sponsor.id}
              className={`sponsor-card sponsor-card-${index + 1}`}
            >
              <input
                type="checkbox"
                className={`sponsor-checkbox ${
                  selectedSponsors.has(sponsor.id) ? "checked" : ""
                }`}
                checked={selectedSponsors.has(sponsor.id)}
                onChange={() => handleSponsorSelect(sponsor.id)}
              />
              <div className="sponsor-icon">{sponsor.icon}</div>
              <h3 className="sponsor-name">{sponsor.name}</h3>
              <div className="sponsor-details">
                {sponsor.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="sponsor-tag">
                    {tag}
                  </span>
                ))}
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <span>{sponsor.email}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <span>{sponsor.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};
