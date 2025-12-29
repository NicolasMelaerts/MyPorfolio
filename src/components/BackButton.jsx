import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import './BackButton.css';

const BackButton = () => {
    const { lang } = useLanguage();
    const t = translations[lang].game;

    return (
        <Link to="/" className="back-button">
            <FaArrowLeft /> {t.back}
        </Link>
    );
};

export default BackButton;
