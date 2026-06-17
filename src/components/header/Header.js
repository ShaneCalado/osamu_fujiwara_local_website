import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import menuData from '../../data/menu.json'; 
import homeData from '../../data/home.json'; 
import './Header.css';

const Header = ({ language = 'en', changeLanguage, toggleMobileMenu }) => {
  const location = useLocation(); // Hook to track the current URL

  return (
    <header className="global-header">
      
      <Link to="/" className="brand-group">
        <img src="/images/logo.png" className="brand-logo" alt="logo" />
        <div className="brand-text">
          <h1 className="site-name">
            <span className="translatable-text">{homeData?.siteName?.[language]}</span>
          </h1>
          <p className="site-title">
            <span className="translatable-text">{homeData?.siteTitle?.[language]}</span>
          </p>
        </div>
      </Link>
      
      <nav className="desktop-nav">
        {menuData
          .sort((a, b) => a.position - b.position)
          .map((item) => {
            const isContact = item.link === '/contact';
            const itemName = item.name[language] || item.name.jp; 
            const hasDropdown = item.subItems && item.subItems.length > 0;
            
            // Check if the current URL matches this nav link
            const isActive = location.pathname === item.link;

            return (
              <div key={item.position} className="nav-item-wrapper">
                {item.external ? (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`nav-main-link ${isContact ? "contact-btn" : ""} ${isActive && !isContact ? "active" : ""}`}
                  >
                    <span className="translatable-text">{itemName}</span>
                    {hasDropdown && <span className="dropdown-arrow">▼</span>}
                  </a>
                ) : (
                  <Link 
                    to={item.link} 
                    className={`nav-main-link ${isContact ? "contact-btn" : ""} ${isActive && !isContact ? "active" : ""}`}
                  >
                    <span className="translatable-text">{itemName}</span>
                    {hasDropdown && <span className="dropdown-arrow">▼</span>}
                  </Link>
                )}

                {/* THE DROPDOWN MENU */}
                {hasDropdown && (
                  <div className="dropdown-menu">
                    {item.subItems.map((subItem, index) => {
                      const subItemName = subItem.name[language] || subItem.name.jp;
                      return subItem.external ? (
                        <a key={index} href={subItem.link} target="_blank" rel="noopener noreferrer">
                          {subItemName}
                        </a>
                      ) : (
                        <Link key={index} to={subItem.link}>
                          {subItemName}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
        })}
      </nav>

      <div className="header-controls">
        <div className="language-selector-wrapper desktop-lang-toggle">
          <div className="language-pill">
            <div className="lang-current">
              <span className="translatable-text">🌐 {language === 'en' ? 'EN' : 'JP'}</span>
            </div>
            <div className="lang-options">
              {['en', 'ja']
                .filter((langCode) => langCode !== language) 
                .map((langCode) => (
                  <button 
                    key={langCode}
                    className="lang-option" 
                    onClick={() => changeLanguage(langCode)}
                  >
                    {langCode === 'en' ? 'English' : '日本語'}
                  </button>
                ))}
            </div>
          </div>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>

    </header>
  );
};

export default Header;