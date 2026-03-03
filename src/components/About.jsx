import React from 'react';
import './About.css';
import experienceData from '../data/experience.json';
import profileData from '../data/profile.json';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const About = () => {
    const { lang } = useLanguage();
    const t = translations[lang].sections;

    return (
        <section id="about" className="about-section">
            <div className="section-container">
                <h2 className="section-title">{t.about}</h2>

                <div className="about-content">
                    <div className="about-text-column">
                        <p className="about-bio">{profileData.bio[lang]}</p>
                        <div className="about-philosophy">
                            <h3>{t.myApproach}</h3>
                            <ul>
                                {lang === 'fr' ? (
                                    <>
                                        <li><strong>Rigueur technique</strong> et souci du détail</li>
                                        <li><strong>Curiosité</strong> insatiable pour les nouvelles technologies</li>
                                        <li>Goût pour les <strong>systèmes bien conçus</strong></li>
                                        <li>Volonté de <strong>progresser continuellement</strong></li>
                                    </>
                                ) : (
                                    <>
                                        <li><strong>Technical rigor</strong> and attention to detail</li>
                                        <li>Insatiable <strong>curiosity</strong> for new technologies</li>
                                        <li>Passion for <strong>well-engineered systems</strong></li>
                                        <li>Commitment to <strong>continuous improvement</strong></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="education-column">
                        <h3>{t.education}</h3>
                        <div className="timeline">
                            {experienceData.education.map((edu, index) => (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-marker"></div>
                                    <div className="timeline-content">
                                        <span className="edu-year">{edu.year[lang] || edu.year}</span>
                                        <h4 className="edu-degree">{edu.degree[lang] || edu.degree}</h4>
                                        {edu.specialization && <span className="edu-spec">{edu.specialization[lang] || edu.specialization}</span>}
                                        <p className="edu-inst">{edu.institution[lang] || edu.institution}</p>
                                        {edu.description && (
                                            <p className="edu-desc">{edu.description[lang]}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
