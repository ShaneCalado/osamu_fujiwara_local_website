import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import menuData from '../../data/menu.json'; 
import './Sidebar.css';

const Sidebar = ({ isMobileMenuOpen, closeMenu, language, changeLanguage }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleFullClose = () => {
    setActiveSubmenu(null);
    closeMenu();
  };

  return (
    <>
      <div 
        className={`mobile-dimmer ${isMobileMenuOpen ? 'active' : ''}`} 
        onClick={handleFullClose}
      ></div>

      <nav className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={handleFullClose}>✕</button>
        
        <ul className="mobile-nav-links">
          
          {activeSubmenu ? (
            <div className="submenu-container">
              <button 
                className="submenu-back-btn" 
                onClick={() => setActiveSubmenu(null)}
              >
                ← {language === 'en' ? 'Back' : '戻る'}
              </button>
              
              <h3 className="submenu-title">
                {activeSubmenu.name[language] || activeSubmenu.name.jp}
              </h3>

              {activeSubmenu.subItems.map((subItem, index) => {
                const subItemName = subItem.name[language] || subItem.name.jp;
                return (
                  <li key={index}>
                    {subItem.external ? (
                      <a href={subItem.link} target="_blank" rel="noopener noreferrer" onClick={handleFullClose}>
                        <span className="link-text translatable-text">{subItemName}</span>
                      </a>
                    ) : (
                      <Link to={subItem.link} onClick={handleFullClose}>
                        <span className="link-text translatable-text">{subItemName}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </div>
          ) : (
            
            <>
              {menuData
                .sort((a, b) => a.position - b.position)
                .map((item) => {
                  const itemName = item.name[language] || item.name.jp; 
                  const hasDropdown = item.subItems && item.subItems.length > 0;

                  // 1. If NOT clickable:
                  if (!item.clickable) {
                    if (hasDropdown) {
                      // Act as a toggle button to open the submenu
                      return (
                        <li key={item.position}>
                          <button className="submenu-trigger-btn" onClick={() => setActiveSubmenu(item)}>
                            <span className="link-text translatable-text">{itemName}</span>
                            <span className="arrow">▶</span>
                          </button>
                        </li>
                      );
                    } else {
                      return (
                        <li key={item.position}>
                          <div style={{ padding: '18px 25px', display: 'flex', justifyContent: 'flex-end', color: '#a0aabf' }}>
                            <span className="link-text translatable-text">{itemName}</span>
                          </div>
                        </li>
                      );
                    }
                  }

                  // 2. If CLICKABLE:
                  const isContact = item.link === '/contact';

                  if (item.external) {
                    return (
                      <li key={item.position} className={isContact ? "mobile-contact-wrapper" : ""}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={handleFullClose}>
                          <span className="link-text translatable-text">{itemName}</span>
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={item.position} className={isContact ? "mobile-contact-wrapper" : ""}>
                      <Link to={item.link} onClick={handleFullClose}>
                        <span className="link-text translatable-text">{itemName}</span>
                      </Link>
                    </li>
                  );
              })}

              <li className="mobile-lang-item">
                <div className="language-selector-wrapper">
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
                            onClick={() => {
                              changeLanguage(langCode);
                              handleFullClose(); 
                            }}
                          >
                            {langCode === 'en' ? 'English' : '日本語'}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </li>
            </>
          )}

        </ul>
      </nav>
    </>
  );
};

export default Sidebar;