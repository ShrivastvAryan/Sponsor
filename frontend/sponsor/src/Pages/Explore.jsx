// import sponsorList from "../api/sponsorList.json";
// import { CountryCard } from "../Components/Ui/CountryCard";

// export const Explore = () => {
//   return (
//     <>
//       <section className="country-section container ">
//         {/* <SearchFilter
//           search={search}
//           setSearch={setSearch}
//           filter={filter}
//           setFilter={setFilter}
//           data={data}
//           setData={setData}
//         /> */}

//         <ul className="grid grid-three-cols">
//           {sponsorList.map((curData) => {
//             return <CountryCard key={curData.id} curData={curData} />;
//           })}
//         </ul>
//       </section>
//     </>
//   );
// };

//! NEW Code
import "./Explore.css";
import { useState } from "react";
import { Search, Filter, Phone, Mail, Building2, Calendar } from "lucide-react";

export const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSponsors, setSelectedSponsors] = useState([]);

  const sponsors = [
    {
      id: 1,
      name: "Google",
      eventType: "Hackathon",
      sponsorshipType: "monetary",
      email: "sponsorships@google.com",
      phone: "+1-800-555-0191",
      logo: "/api/placeholder/150/100",
    },
    {
      id: 2,
      name: "Microsoft",
      eventType: "Student Fest",
      sponsorshipType: "monetary",
      email: "events@microsoft.com",
      phone: "+1-800-642-7676",
      logo: "/api/placeholder/150/100",
    },
    {
      id: 3,
      name: "Amazon Web Services",
      eventType: "Hackathon",
      sponsorshipType: "monetary",
      email: "sponsorships@aws.amazon.com",
      phone: "+1-888-280-4331",
      logo: "/api/placeholder/150/100",
    },
    {
      id: 4,
      name: "Meta",
      eventType: "Conference",
      sponsorshipType: "in-kind",
      email: "partnerships@meta.com",
      phone: "+1-650-543-4800",
      logo: "/api/placeholder/150/100",
    },
    {
      id: 5,
      name: "Apple",
      eventType: "Workshop",
      sponsorshipType: "monetary",
      email: "events@apple.com",
      phone: "+1-408-996-1010",
      logo: "/api/placeholder/150/100",
    },
    {
      id: 6,
      name: "Netflix",
      eventType: "Student Fest",
      sponsorshipType: "in-kind",
      email: "university@netflix.com",
      phone: "+1-408-540-3700",
      logo: "/api/placeholder/150/100",
    },
  ];

  const eventTypes = [
    "all",
    "Hackathon",
    "Student Fest",
    "Conference",
    "Workshop",
  ];
  const sponsorshipTypes = ["All Categories", "monetary", "in-kind"];

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

  const handleCheckboxChange = (sponsorId) => {
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
    <div className="page-wrapper">
      <div className="main-container">
        <section className="controls">
          <div className="controls-inner">
            {/* className: input-wraper */}
            <div>
              <input
                type="text"
                placeholder="🔍 Search sponsors or events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            {/* removing className: select-wraper */}
            <div>
              {/* <Filter size={16} className="input-icon" /> */}
              {/* <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="select-box"
              >
                <option value="all">All Categories</option>
                <optgroup label="Event Types">
                  {eventTypes.slice(1).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Sponsorship Types">
                  {sponsorshipTypes.slice(1).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </optgroup>
              </select> */}
              <select
                className="filter-select"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {eventTypes.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="bulk-actions">
              <button
                onClick={handleSelectAll}
                className="select-all-btn"
                style={{
                  backgroundColor:
                    selectedSponsors.length > 0 ? "#f97316" : "#fed7aa",
                  color: selectedSponsors.length > 0 ? "white" : "#9a3412",
                }}
              >
                {selectedSponsors.length === filteredSponsors.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
              {selectedSponsors.length > 0 && (
                <span className="selection-badge">
                  {selectedSponsors.length} selected
                </span>
              )}
            </div>
          </div>
        </section>

        <div className="sponsors-grid">
          {filteredSponsors.map((sponsor, index) => (
            <div
              key={sponsor.id}
              className={`sponsor-card sponsor-card-${index + 1} ${
                selectedSponsors.includes(sponsor.id) ? "selected" : ""
              }`}
              onMouseEnter={(e) => {
                if (!selectedSponsors.includes(sponsor.id)) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(251, 146, 60, 0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (!selectedSponsors.includes(sponsor.id)) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }
              }}
            >
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={selectedSponsors.includes(sponsor.id)}
                  onChange={() => handleCheckboxChange(sponsor.id)}
                />
              </div>

              {/* <div className="logo-placeholder">{sponsor.logo}</div> */}
              <div className="sponsor-icon">{sponsor.icon}</div>

              <h3 className="company-name">{sponsor.name}</h3>

              <div className="badge-container">
                <Calendar size={14} style={{ color: "#c2410c" }} />
                <span className="badge-text">{sponsor.eventType}</span>
                <span
                  className="badge-type"
                  style={{
                    backgroundColor:
                      sponsor.sponsorshipType === "monetary"
                        ? "#fef3c7"
                        : "#fed7aa",
                    color:
                      sponsor.sponsorshipType === "monetary"
                        ? "#92400e"
                        : "#9a3412",
                  }}
                >
                  {sponsor.sponsorshipType}
                </span>
              </div>

              <div className="contact-info">
                <div className="contact-line">
                  <Mail size={16} style={{ color: "#c2410c" }} />
                  <a href={`mailto:${sponsor.email}`} className="email-link">
                    {sponsor.email}
                  </a>
                </div>
                <div className="contact-line">
                  <Phone size={16} style={{ color: "#c2410c" }} />
                  <a href={`tel:${sponsor.phone}`} className="phone-link">
                    {sponsor.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSponsors.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">
              <Search size={24} style={{ color: "#c2410c" }} />
            </div>
            <h3 className="no-results-title">No sponsors found</h3>
            <p className="no-results-text">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
