import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin, FaCode, FaBrain, FaDatabase, FaReact } from 'react-icons/fa';
import './Hero.css';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import profileData from '../data/profile.json';

const Hero = () => {
    const { lang } = useLanguage();
    const t = translations[lang];
    const { name, contact, heroText } = profileData;

    // localized titles
    const userTitle = lang === 'fr' ? "Ingénieur Logiciel & IA" : "Software & AI Engineer";
    const userSubtitles = lang === 'fr'
        ? ['Deep Learning', 'Computer Vision', 'Full Stack Dev']
        : ['Deep Learning', 'Computer Vision', 'Full Stack Dev'];

    return (
        <section id="hero" className="hero-section">
            <div className="hero-container">
                <div className="hero-content">
                    <span className="hero-greeting">{t.hero.greeting}</span>
                    <h1 className="hero-name">{name}</h1>
                    <h2 className="hero-role">
                        {userTitle} <br />
                        <span className="hero-typewriter">
                            <Typewriter
                                words={userSubtitles}
                                loop={false}
                                cursor
                                cursorStyle='_'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </span>
                    </h2>
                    <p className="hero-bio">
                        {heroText[lang]}
                    </p>

                    <div className="hero-actions">
                        <a href="#projects" className="hero-btn primary">{t.hero.ctaProjects}</a>
                        <a href="#contact" className="hero-btn secondary">{t.hero.ctaContact}</a>
                    </div>

                    <div className="hero-socials">
                        <a href={contact.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="visual-circle">
                        <div className="orbit-icon icon-1"><FaBrain /></div>
                        <div className="orbit-icon icon-2"><FaReact /></div>
                        <div className="orbit-icon icon-3"><FaCode /></div>
                        <div className="orbit-icon icon-4"><FaDatabase /></div>
                        <div className="center-icon">
                            <span className="initials">NM</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
