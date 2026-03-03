import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('portfolio-lang') || 'fr';
    });

    const toggleLang = () => {
        setLang(prev => {
            const newLang = prev === 'fr' ? 'en' : 'fr';
            localStorage.setItem('portfolio-lang', newLang);
            return newLang;
        });
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
