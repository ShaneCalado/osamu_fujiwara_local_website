import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import menuData from '../../data/menu.json'; 
import homeData from '../../data/home.json'; 
import './Header.css';

const Header = ({ language = 'en', changeLanguage, toggleMobileMenu }) => {
  const location = useLocation(); 

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

            // THE FIX: Checks for exact matches OR if the current URL is a child path of the parent/sub-items
            const isActive = 
                location.pathname === item.link || 
                (item.link && item.link !== '/' && location.pathname.startsWith(`${item.link}/`)) ||
                (hasDropdown && item.subItems.some(subItem => 
                    location.pathname === subItem.link || 
                    (subItem.link && subItem.link !== '/' && location.pathname.startsWith(`${subItem.link}/`))
                ));

            // Shared classes for all nav items
            const linkClasses = `nav-main-link ${isContact ? "contact-btn" : ""} ${isActive && !isContact ? "active" : ""}`;

            // Determine if the item should be a text span, an external link, or an internal link
            let navContent;
            if (!item.clickable) {
              navContent = (
                <span className={linkClasses} style={{ cursor: 'default' }}>
                  <span className="translatable-text">{itemName}</span>
                  {hasDropdown && <span className="dropdown-arrow">▼</span>}
                </span>
              );
            } else if (item.external) {
              navContent = (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={linkClasses}
                >
                  <span className="translatable-text">{itemName}</span>
                  {hasDropdown && <span className="dropdown-arrow">▼</span>}
                </a>
              );
            } else {
              navContent = (
                <Link 
                  to={item.link} 
                  className={linkClasses}
                >
                  <span className="translatable-text">{itemName}</span>
                  {hasDropdown && <span className="dropdown-arrow">▼</span>}
                </Link>
              );
            }

            return (
              <div key={item.position} className="nav-item-wrapper">
                
                {/* Render the dynamically chosen element */}
                {navContent}

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