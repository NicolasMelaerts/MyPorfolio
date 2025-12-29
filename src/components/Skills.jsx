import React from 'react';
import './Skills.css';
import skillsData from '../data/skills.json';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { FaPython, FaJava, FaLinux, FaGitAlt, FaGithub, FaDocker, FaLaptopCode } from 'react-icons/fa';
import { SiCplusplus, SiPytorch, SiTensorflow, SiOpencv, SiJupyter, SiLatex, SiGnubash } from 'react-icons/si';
import { TbBrain } from 'react-icons/tb';

const iconMap = {
    // Languages
    "Python": <FaPython />,
    "C": <FaLaptopCode />,
    "C++": <SiCplusplus />,
    "Java": <FaJava />,

    // Tools
    "Linux": <FaLinux />,
    "Bash": <SiGnubash />,
    "Git": <FaGitAlt />,
    "GitHub": <FaGithub />,
    "CI/CD": <FaLaptopCode />,
    "Docker": <FaDocker />,
    "VS Code": <FaLaptopCode />,
    "LaTeX": <SiLatex />,

    // AI
    "TensorFlow": <SiTensorflow />,
    "PyTorch": <SiPytorch />,
    "OpenCV": <SiOpencv />,
    "Jupyter Notebook": <SiJupyter />,
    "CNN": <TbBrain />,
    "RNN": <TbBrain />,
    "Auto-encodeurs": <TbBrain />,
    "Transformers": <TbBrain />
};

const Skills = () => {
    const { lang } = useLanguage();
    const t = translations[lang].sections;

    return (
        <section id="skills" className="skills-section">
            <div className="section-container">
                <h2 className="section-title">{t.skills}</h2>

                <div className="skills-grid">
                    <div className="skill-wrapper">
                        <h3>{t.languages}</h3>
                        <div className="skill-tags">
                            {skillsData.languages.map(skill => (
                                <span key={skill} className="skill-tag">
                                    {iconMap[skill] && <span className="skill-icon">{iconMap[skill]}</span>}
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="skill-wrapper">
                        <h3>{t.ai}</h3>
                        <div className="skill-tags">
                            {skillsData.ai.map(skill => (
                                <span key={skill} className="skill-tag ai">
                                    {iconMap[skill] && <span className="skill-icon">{iconMap[skill]}</span>}
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="skill-wrapper">
                        <h3>{t.tools}</h3>
                        <div className="skill-tags">
                            {skillsData.tools.map(skill => (
                                <span key={skill} className="skill-tag tool">
                                    {iconMap[skill] && <span className="skill-icon">{iconMap[skill]}</span>}
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="skill-wrapper">
                        <h3>{t.spokenLanguages}</h3>
                        <div className="languages-list">
                            {skillsData.spoken.map(langItem => (
                                <div key={langItem.language.en} className="language-item">
                                    <span className="lang-name">{langItem.language[lang]}</span>
                                    <span className="lang-dot"></span>
                                    <span className="lang-level">{langItem.level[lang]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Skills;
