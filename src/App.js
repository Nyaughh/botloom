import './App.css';
import React, { useRef, useEffect, useState } from 'react';

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'The Team', id: 'team' },
  { label: 'Our Solutions', id: 'solutions' },
  { label: 'Enquiry', id: 'enquiry' },
];

const solutions = [
  {
    title: 'AI Voice Assistant for Businesses',
    desc: 'Let your phone line run itself. Our AI handles calls just like a trained receptionist — it takes reservations, answers FAQs, suggests items, and never misses a call. Use cases: Cafés, restaurants, salons, hospitals, clinics, diagnostic centres, bakeries. Key Features: 24/7 real-time voice handling, Personalized to your business tone & menu, Monthly subscription — cancel anytime, Onboarding in under a week.'
  },
  {
    title: 'Website Chatbot (Contextual AI)',
    desc: 'Say goodbye to website confusion. Our chatbot reads your entire website — PDFs, blogs, hidden data — and gives instant, natural-language answers to user queries.Use cases: Universities, government portals, e-commerce sites, B2B SaaS. Key Features: Trained on your full website content No backend changes required Multilingual & privacy-first Analytics dashboard included'
  },
  {
    title: 'HoloAI (Holographic Avatars)',
    desc: 'The future of public engagement. HoloAI creates life-size holographic presenters that talk, respond, and educate in real time. Use cases: Events, expos, public awareness campaigns, education. Key Features: Fully customizable avatar & voice, Real-time interaction powered by AI, Plug-and-play for any event, Per-event or monthly rental options'
  }
];

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function LandingPage({ onGetStarted }) {
  const [messageIdx, setMessageIdx] = useState(null);
  const [logoMsg, setLogoMsg] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Close drawer when clicking outside
  React.useEffect(() => {
    if (!mobileNavOpen) return;
    function handleClick(e) {
      if (e.target.closest('.mobile-nav-drawer') || e.target.closest('.hamburger-btn')) return;
      setMobileNavOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileNavOpen]);

  return (
    <div className="landing-bg">
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => setLogoMsg(true)} style={{ cursor: 'pointer', position: 'relative' }}>
          <img src={process.env.PUBLIC_URL + '/zenthrix-logo.png'} alt="Botloom Logo" className="main-logo" />
          <span className="brand-name">BOTLOOM</span>
          {logoMsg && (
            <div className="landing-nav-msg" style={{ left: '50%', top: '110%', transform: 'translateX(-50%)' }}>
              Click on Get Started to use this feature.
            </div>
          )}
        </div>
        {/* Hamburger button for mobile */}
        <button className="hamburger-btn" onClick={() => setMobileNavOpen(v => !v)} aria-label="Open navigation">
          <span></span><span></span><span></span>
        </button>
        {/* Desktop nav */}
        <ul className="navbar-links">
          {NAV_ITEMS.map((item, idx) => (
            <li key={item.id} style={{ position: 'relative' }}>
              <button onClick={() => setMessageIdx(idx)}>{item.label}</button>
              {messageIdx === idx && (
                <div className="landing-nav-msg">Click on Get Started to use this feature.</div>
              )}
            </li>
          ))}
        </ul>
        {/* Mobile nav drawer */}
        <div className={`mobile-nav-drawer${mobileNavOpen ? ' open' : ''}`}>
          <button className="close-drawer-btn" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation">×</button>
          <ul>
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.id}>
                <button onClick={() => { setMessageIdx(idx); setMobileNavOpen(false); }}>{item.label}</button>
              </li>
            ))}
          </ul>
        </div>
        {/* Overlay for mobile nav */}
        {mobileNavOpen && <div className="mobile-nav-overlay"></div>}
      </nav>
      <div className="landing-hero">
        <h1>
          <span className="gradient-text">AI-Powered Services</span><br />
          for Modern Businesses
        </h1>
        <p className="landing-sub">Transform your business with intelligent bots, lifelike avatars, and 24/7 customer support that never sleeps</p>
        <div className="landing-btns">
          <button className="get-started-btn" onClick={onGetStarted}>Get Started <span className="arrow">→</span></button>
          <button className="learn-more-btn">Learn More</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const navbarRef = useRef(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(window.scrollY);
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY.current) {
        setShowNavbar(true);
      } else if (window.scrollY > lastScrollY.current) {
        setShowNavbar(false);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showMain) {
    return <LandingPage onGetStarted={() => setShowMain(true)} />;
  }

  return (
    <div className="App">
      <nav className="navbar" ref={navbarRef} style={{ top: showNavbar ? 0 : '-100px', transition: 'top 0.3s' }}>
        <div className="navbar-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
          <img src={process.env.PUBLIC_URL + '/zenthrix-logo.png'} alt="Botloom Logo" className="main-logo" />
          <span className="brand-name">BOTLOOM</span>
        </div>
        <ul className="navbar-links">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button onClick={() => scrollToSection(item.id)}>{item.label}</button>
            </li>
          ))}
        </ul>
      </nav>
      <header className="hero-section">
        <img src={process.env.PUBLIC_URL + '/zenthrix-logo.png'} alt="Botloom Logo" className="hero-logo" />
        <h1>BOTLOOM</h1>
        <p className="tagline">INNOVATIVE TECHNOLOGY SOLUTIONS</p>
      </header>
      <section id="solutions" className="solutions-section">
        <h2>Our Solutions</h2>
        <div className="solutions-list">
          {solutions.map((sol, idx) => (
            <div className="solution-card" key={idx}>
              <h3>{sol.title}</h3>
              <p>{sol.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="about" className="about-section">
        <h2>About</h2>
        <p>We are an AI solutions company that applies artificial intelligence in solving real business problems. If it is responding to customer calls in real time, giving a website an intuitive treatment with smart chatbots, or creating immersive opportunities for event engagements – we build tailored AI Services that make business easier, faster, and more scalable.</p>
        <p>Our team blends tech with practical design to deliver solutions that are easy to integrate and hard to ignore. We don't do generic — we understand your operations and build AI around your workflows.</p>
      </section>
      <section id="team" className="team-section">
        <h2>The Team</h2>
        <p>Our team is a blend of experienced engineers, creative designers, and strategic thinkers passionate about solving real-world problems.</p>
      </section>
      <section id="enquiry" className="enquiry-section">
        <h2>Enquiry</h2>
        <p>Contact us at <a href="mailto:psd@botloom.in">psd@botloom.in</a> or fill out our enquiry form (coming soon).</p>
      </section>
    </div>
  );
}

export default App;
