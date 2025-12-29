import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.css';
import { FaExternalLinkAlt, FaGamepad } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const ProjectCard = ({ project }) => {
    const { lang } = useLanguage();
    const isInternal = project.internal;

    // Access localized strings
    const title = project.title[lang];
    const description = project.description[lang];

    return (
        <article className="project-card">
            <div className="card-top">
                <div className="folder-icon">
                    {isInternal ? <FaGamepad size={30} /> : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    )}
                </div>
                <div className="card-links">
                    {isInternal ? (
                        <Link to={project.link} aria-label={title}>
                            <FaExternalLinkAlt />
                        </Link>
                    ) : (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="GitHub Link">
                            <FaExternalLinkAlt />
                        </a>
                    )}
                </div>
            </div>

            <h3 className="project-title">{title}</h3>
            <p className="project-description">{description}</p>

            <div className="project-footer">
                <ul className="project-tech-list">
                    {project.technologies.map((tech, i) => (
                        <li key={i}>{tech}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
};

export default ProjectCard;
