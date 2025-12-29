import React from 'react';
import './Vision.css';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const Vision = () => {
    const { lang } = useLanguage();
    const t = translations[lang].sections;

    return (
        <section id="vision" className="vision-section">
            <div className="section-container">
                <h2 className="section-title">{t.vision}</h2>
                <div className="vision-content">
                    {lang === 'fr' ? (
                        <>
                            <p>
                                Ce portfolio a été conçu comme un <strong>support professionnel évolutif</strong>.
                                Il ne se limite pas à une vitrine statique, mais reflète ma progression continue.
                            </p>
                            <p>
                                Chaque projet présenté ici a été sélectionné pour sa pertinence technique et les apprentissages qu'il a générés.
                                Je m'engage à maintenir ce site à jour avec mes derniers travaux de recherche et développements professionnels.
                            </p>
                        </>
                    ) : (
                        <>
                            <p>
                                This portfolio was designed as an <strong>evolving professional platform</strong>.
                                It is not limited to a static showcase but reflects my continuous progression.
                            </p>
                            <p>
                                Each project presented here was selected for its technical relevance and the learning outcomes it generated.
                                I am committed to keeping this site updated with my latest research and professional developments.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};
export default Vision;
