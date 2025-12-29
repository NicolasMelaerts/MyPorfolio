import React from 'react';
import './Footer.css';
import profileData from '../data/profile.json';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-info">
                    <p>&copy; {new Date().getFullYear()} {profileData.name}. All rights reserved.</p>
                </div>
                <div className="footer-links">
                    <a href={profileData.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href={`mailto:${profileData.contact.email}`}>Email</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
