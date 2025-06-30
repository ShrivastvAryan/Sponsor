import "./About.css";
import React, { useEffect, useState } from "react";
import abtEvent from "../api/abtEvent.json";

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
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🏢</span>
            <span>Direct Access to Sponsors</span>
          </div>
          <h1 className="hero-title">
            <span className="gradient-text">Find Your Perfect</span>
            <br />
            <span className="typing-effect">Sponsorship Partners</span>
          </h1>
          <p className="hero-description">
            Browse our comprehensive database of companies, select the ones that
            match your event, and reach out directly. No registration required -
            just explore, select, and connect.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">
              <span className="btn-icon">🔍</span>
              Browse Companies
              <div className="btn-glow"></div>
            </button>
            <button className="btn btn-secondary">
              <span className="btn-icon">📧</span>
              Start Reaching Out
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">2000+</div>
              <div className="stat-label">Companies Listed</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Industries Covered</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Free Access</div>
            </div>
          </div>
        </div>
        <div className="floating-elements">
          <div className="floating-card card-1">
            <div className="card-icon">🏢</div>
            <div className="card-text">Companies</div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">📧</div>
            <div className="card-text">Direct Contact</div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">⚡</div>
            <div className="card-text">Instant Access</div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section">
        <div className="container">
          <div
            id="animate-problem"
            className={`section-header ${
              isVisible["animate-problem"] ? "animate-in" : ""
            }`}
          >
            <div className="section-badge">The Challenge</div>
            <h2 className="section-title">
              Finding Sponsors{" "}
              <span className="highlight">Shouldn't Be Hard</span>
            </h2>
            <p className="section-subtitle">
              Traditional methods of finding sponsors are time-consuming and
              ineffective
            </p>
          </div>

          <div className="problems-grid">
            <div className="problem-card card-delay-1">
              <div className="problem-visual">
                <div className="problem-icon">🔍</div>
                <div className="problem-waves"></div>
              </div>
              <h3>Endless Searching</h3>
              <p>
                Hours spent on Google trying to find companies that might be
                interested in sponsoring your event
              </p>
              <div className="card-highlight"></div>
            </div>

            <div className="problem-card card-delay-2">
              <div className="problem-visual">
                <div className="problem-icon">❓</div>
                <div className="problem-waves"></div>
              </div>
              <h3>Missing Information</h3>
              <p>
                Difficulty finding accurate contact details and understanding
                company preferences
              </p>
              <div className="card-highlight"></div>
            </div>

            <div className="problem-card card-delay-3">
              <div className="problem-visual">
                <div className="problem-icon">📧</div>
                <div className="problem-waves"></div>
              </div>
              <h3>Cold Outreach</h3>
              <p>
                Sending emails without knowing if companies are actively looking
                for sponsorship opportunities
              </p>
              <div className="card-highlight"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section">
        <div className="container">
          <div
            id="animate-solution"
            className={`section-header ${
              isVisible["animate-solution"] ? "animate-in" : ""
            }`}
          >
            <div className="section-badge">Our Solution</div>
            <h2 className="section-title">
              Simple <span className="highlight">Company Directory</span>
            </h2>
            <p className="section-subtitle">
              Access organized company information and contact details in one
              place
            </p>
          </div>

          <div className="solution-content">
            <div className="solution-features">
              <div className="feature-item feature-delay-1">
                <div className="feature-icon">
                  <span>🗂️</span>
                  <div className="icon-glow"></div>
                </div>
                <div className="feature-content">
                  <h3>Organized Database</h3>
                  <p>
                    Browse companies categorized by industry, size, and location
                    with detailed profiles and contact information
                  </p>
                </div>
                <div className="feature-connector"></div>
              </div>

              <div className="feature-item feature-delay-2">
                <div className="feature-icon">
                  <span>🎯</span>
                  <div className="icon-glow"></div>
                </div>
                <div className="feature-content">
                  <h3>Smart Filtering</h3>
                  <p>
                    Filter companies by industry, budget range, location, and
                    sponsorship history to find the best matches
                  </p>
                </div>
                <div className="feature-connector"></div>
              </div>

              <div className="feature-item feature-delay-3">
                <div className="feature-icon">
                  <span>📋</span>
                  <div className="icon-glow"></div>
                </div>
                <div className="feature-content">
                  <h3>Select & Collect</h3>
                  <p>
                    Choose multiple companies that interest you and collect
                    their contact details for your outreach
                  </p>
                </div>
                <div className="feature-connector"></div>
              </div>

              <div className="feature-item feature-delay-4">
                <div className="feature-icon">
                  <span>📧</span>
                  <div className="icon-glow"></div>
                </div>
                <div className="feature-content">
                  <h3>Direct Contact</h3>
                  <p>
                    Get verified email addresses and contact information to
                    reach out directly on your own
                  </p>
                </div>
              </div>
            </div>

            <div className="how-it-works">
              <div className="workflow-card">
                <h3>Simple 3-Step Process</h3>
                <div className="workflow-steps">
                  <div className="workflow-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Browse Companies</h4>
                      <p>
                        Explore our database and use filters to find relevant
                        companies
                      </p>
                    </div>
                    <div className="step-glow"></div>
                  </div>

                  <div className="workflow-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Select & Save</h4>
                      <p>
                        Choose companies that match your event and save their
                        details
                      </p>
                    </div>
                    <div className="step-glow"></div>
                  </div>

                  <div className="workflow-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Reach Out</h4>
                      <p>
                        Contact companies directly using the information
                        provided
                      </p>
                    </div>
                    <div className="step-glow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="serve-section">
        <div className="container">
          <div
            id="animate-serve"
            className={`section-header ${
              isVisible["animate-serve"] ? "animate-in" : ""
            }`}
          >
            <div className="section-badge">Perfect For</div>
            <h2 className="section-title">
              Any Event <span className="highlight">Organizer</span>
            </h2>
            <p className="section-subtitle">
              Whether you're planning a small workshop or a large conference,
              find the right sponsors
            </p>
          </div>

          <div className="serve-grid">
            {abtEvent.map((item, index) => (
              <div
                key={index}
                className={`serve-card serve-delay-${index + 1} ${item.color}`}
              >
                <div className="serve-icon">
                  <span>{item.icon}</span>
                  <div className="icon-ripple"></div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="card-shine"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background"></div>
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">
              <span>🎯</span>
              <span>Start Exploring Today</span>
            </div>
            <h2 className="cta-title">
              Stop Searching. Start{" "}
              <span className="gradient-text">Finding</span>
            </h2>
            <p className="cta-description">
              Access our comprehensive company directory and start connecting
              with potential sponsors right now
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-large">
                <span className="btn-icon">🏢</span>
                Browse Companies Now
                <div className="btn-particles"></div>
              </button>
              <button className="btn btn-outline btn-large">
                <span className="btn-icon">ℹ️</span>
                Learn More
              </button>
            </div>
            <div className="cta-features">
              <div className="feature-badge">✅ No Registration Required</div>
              <div className="feature-badge">✅ Free to Browse</div>
              <div className="feature-badge">✅ Updated Daily</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
