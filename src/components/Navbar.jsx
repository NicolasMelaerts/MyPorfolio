import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { lang, toggleLang } = useLanguage();
    const t = translations[lang].nav;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: t.about, href: '#about' },
        { name: t.skills, href: '#skills' },
        { name: t.projects, href: '#projects' },
        { name: t.vision, href: '#vision' },
        { name: 'CV', href: '#cv' },
        { name: t.contact, href: '#contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <a href="#" className="logo">NM.</a>

                <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button className="lang-toggle" onClick={toggleLang}>
                        {lang === 'fr' ? 'EN' : 'FR'}
                    </button>
                </div>

                <button
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle Navigation"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
