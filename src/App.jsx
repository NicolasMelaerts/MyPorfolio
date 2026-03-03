import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Vision from './components/Vision';
import CVSection from './components/CVSection';
import Contact from './components/Contact';
import GameOfLife from './components/GameOfLife';
import ImageLab from './components/ImageLab';
import SnakeGame from './components/SnakeGame';
import BackButton from './components/BackButton';
import { LanguageProvider } from './context/LanguageContext';
import NeuralNetViz from './components/NeuralNetViz';
import GeneticAlgo from './components/GeneticAlgo';

// Main Landing Page Component
const Home = () => (
  <Layout>
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Vision />
    <CVSection />
    <Contact />
  </Layout>
);

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game-of-life" element={<><BackButton /><GameOfLife /></>} />
          <Route path="/computer-vision" element={<><BackButton /><ImageLab /></>} />
          <Route path="/snake" element={<><BackButton /><SnakeGame /></>} />
          <Route path="/neural-net" element={<><BackButton /><NeuralNetViz /></>} />
          <Route path="/genetic-algo" element={<><BackButton /><GeneticAlgo /></>} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
