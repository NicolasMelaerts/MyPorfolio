import React from 'react';
import './CVSection.css';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { FaDownload, FaFilePdf } from 'react-icons/fa';

const CVSection = () => {
    const { lang } = useLanguage();
    const t = translations[lang];

    const cvFile = lang === 'fr' ? '/cv/cv_fr.pdf' : '/cv/cv_en.pdf';

    return (
        <section id="cv" className="cv-section">
            <h2 className="section-title">{t.sections.cv}</h2>

            <div className="cv-container">
                <div className="cv-actions">
                    <a href={cvFile} download className="cv-download-btn">
                        <FaDownload /> {t.cv.download}
                    </a>
                    <a href={cvFile} target="_blank" rel="noopener noreferrer" className="cv-view-btn">
                        <FaFilePdf /> {t.cv.view}
                    </a>
                </div>

                <div className="pdf-wrapper">
                    <iframe
                        src={`${cvFile}#toolbar=0&navpanes=0&scrollbar=0`}
                        title="CV Preview"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </section>
    );
};

export default CVSection;
