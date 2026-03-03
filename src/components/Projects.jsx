import React from 'react';
import ProjectCard from './ProjectCard';
import projectsData from '../data/projects.json';
import './Projects.css';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const Projects = () => {
    const { lang } = useLanguage();
    const t = translations[lang];

    const academicProjects = projectsData.filter(p => !p.internal);
    const interactiveProjects = projectsData.filter(p => p.internal);

    return (
        <section id="projects" className="projects-section">
            <h2 className="section-title">{t.sections.projects}</h2>

            <div className="projects-category">
                <h3 className="category-title">{t.sections.projectsReal}</h3>
                <div className="projects-grid">
                    {academicProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>

            <div className="projects-category" style={{ marginTop: '4rem' }}>
                <h3 className="category-title">{t.sections.projectsFun}</h3>
                <div className="projects-grid">
                    {interactiveProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
