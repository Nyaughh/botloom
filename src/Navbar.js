import React, { useState, useEffect } from 'react';
import './App.css';

export default function Navbar({ navItems, onNavClick, getStartedClicked, brand, onBrandClick }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [messageIdx, setMessageIdx] = useState(null);
  const [logoMsg, setLogoMsg] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Track window width for mobile/desktop
  useEffect(() => {
    function checkMobile() {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 900);
        if (window.innerWidth > 900) setMobileNavOpen(false);
      }
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close drawer when clicking outside
  useEffect(() => {
    if (!mobileNavOpen) return;
    function handleClick(e) {
      if (e.target.closest('.mobile-nav-drawer') || e.target.closest('.hamburger-btn')) return;
      setMobileNavOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileNavOpen]);

  // Show message on nav click if getStartedClicked is false
  function handleNavClick(idx, id) {
    setMessageIdx(idx);
    if (onNavClick) onNavClick(id);
    if (!getStartedClicked) {
      setTimeout(() => setMessageIdx(null), 2000);
    } else {
      setMobileNavOpen(false);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => { setLogoMsg(true); if (onBrandClick) onBrandClick(); }} style={{ cursor: 'pointer', position: 'relative' }}>
        {brand}
        {logoMsg && (
          <div className="landing-nav-msg" style={{ left: '50%', top: '110%', transform: 'translateX(-50%)' }}>
            Click on Get Started to use this feature.
          </div>
        )}
      </div>
      {/* Hamburger button and drawer only on mobile */}
      {isMobile && (
        <>
          <button className="hamburger-btn" onClick={() => setMobileNavOpen(v => !v)} aria-label="Open navigation">
            <span></span><span></span><span></span>
          </button>
          <div className={`mobile-nav-drawer${mobileNavOpen ? ' open' : ''}`} style={{ width: '180px', left: mobileNavOpen ? 0 : '-200px' }}>
            <button className="close-drawer-btn" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation">×</button>
            <ul>
              {navItems.map((item, idx) => (
                <li key={item.id} style={{ position: 'relative' }}>
                  <button onClick={() => handleNavClick(idx, item.id)}>{item.label}</button>
                  {messageIdx === idx && !getStartedClicked && (
                    <div className="landing-nav-msg" style={{ position: 'absolute', left: '110%', top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap' }}>Click on Get Started to use this feature.</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {mobileNavOpen && <div className="mobile-nav-overlay"></div>}
        </>
      )}
      {/* Desktop nav */}
      {!isMobile && (
        <ul className="navbar-links">
          {navItems.map((item, idx) => (
            <li key={item.id} style={{ position: 'relative' }}>
              <button onClick={() => handleNavClick(idx, item.id)}>{item.label}</button>
              {messageIdx === idx && !getStartedClicked && (
                <div className="landing-nav-msg">Click on Get Started to use this feature.</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
} 