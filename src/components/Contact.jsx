import React from 'react';
import './Contact.css';
import profileData from '../data/profile.json';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const Contact = () => {
    const { lang } = useLanguage();
    const t = translations[lang].sections;

    return (
        <section id="contact" className="contact-section">
            <div className="section-container contact-container">
                <h2 className="section-title">{t.contact}</h2>
                <p className="contact-intro">
                    {lang === 'fr'
                        ? "Je suis actuellement à la recherche d'opportunités intéressantes (stage/emploi) dans le domaine de l'ingénierie logicielle et de l'IA. Que vous ayez une question ou simplement envie de discuter, ma boîte de réception est ouverte !"
                        : "I am currently looking for opportunities (internship/job) in Software Engineering and AI. Whether you have a question or just want to say hi, my inbox is open!"}
                </p>
                <div className="contact-actions">
                    <a href={`mailto:${profileData.contact.email}`} className="btn btn-primary big-btn">
                        {lang === 'fr' ? "M'envoyer un email" : "Send me an email"}
                    </a>
                    <a href={profileData.contact.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary big-btn">
                        GitHub
                    </a>
                    <a href={profileData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary big-btn">
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    );
};
export default Contact;
