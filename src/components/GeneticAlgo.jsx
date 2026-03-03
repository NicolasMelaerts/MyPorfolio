import React, { useRef, useEffect, useState, useCallback } from 'react';
import './DemoStyles.css';
import { FaPlay, FaPause, FaSyncAlt } from 'react-icons/fa';

// --- GENETIC ALGORITHM HELPERS ---
const POPULATION_SIZE = 100;
const MUTATION_RATE = 0.05;

const distance = (a, b) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

const calculateFitness = (path) => {
    let sum = 0;
    for (let i = 0; i < path.length - 1; i++) {
        sum += distance(path[i], path[i + 1]);
    }
    // Return inverted distance (fitness must be higher for better paths)
    return 1 / (sum + 1);
};

const calcTotalDist = (path) => {
    let sum = 0;
    for (let i = 0; i < path.length - 1; i++) {
        sum += distance(path[i], path[i + 1]);
    }
    return sum.toFixed(0);
};

import { useLanguage } from '../context/LanguageContext';

const GeneticAlgo = () => {
    const { lang } = useLanguage();
    const canvasRef = useRef(null);
    const [cities, setCities] = useState([]);
    const [population, setPopulation] = useState([]);
    const [bestPath, setBestPath] = useState(null);
    const [generation, setGeneration] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Initialize Cities
    useEffect(() => {
        resetCities(15);
    }, []);

    const resetCities = useCallback((count) => {
        const newCities = [];
        const width = 600;
        const height = 400;
        for (let i = 0; i < count; i++) {
            newCities.push({
                x: Math.random() * (width - 40) + 20,
                y: Math.random() * (height - 40) + 20
            });
        }
        setCities(newCities);
        // Initial Population: Random shuffles of cities
        const pop = [];
        for (let i = 0; i < POPULATION_SIZE; i++) {
            pop.push([...newCities].sort(() => Math.random() - 0.5));
        }
        setPopulation(pop);
        setBestPath(null);
        setGeneration(0);
        setIsRunning(true);
    }, []);

    // Evolution Step
    const evolve = useCallback(() => {
        if (!population.length) return;

        // 1. Calculate Fitness
        const fitnesses = population.map(p => calculateFitness(p));

        // Find Best
        let maxFit = 0;
        let indexBest = 0;
        fitnesses.forEach((f, i) => {
            if (f > maxFit) {
                maxFit = f;
                indexBest = i;
            }
        });

        // Store best path for display
        setBestPath(population[indexBest]);

        // 2. Selection (Roulette Wheel / Tournament) -> here simple "Elitism" + selection
        const newPop = [];

        const pickOne = () => {
            let index = 0;
            let r = Math.random() * maxFit; // basic approach (not true sum probability but works for simple demo)
            while (r > 0 && index < population.length - 1) {
                r -= fitnesses[index];
                index++;
            }
            return population[index];
        };

        // Create new generation
        for (let i = 0; i < POPULATION_SIZE; i++) {
            const parentA = population[Math.floor(Math.random() * POPULATION_SIZE)];
            const parentB = population[Math.floor(Math.random() * POPULATION_SIZE)];

            // Crossover
            const start = Math.floor(Math.random() * parentA.length);
            const end = Math.floor(Math.random() * (parentA.length - start)) + start;
            const childSlice = parentA.slice(start, end);
            const childRest = parentB.filter(c => !childSlice.includes(c));
            const child = [...childSlice, ...childRest]; // Simple order crossover

            // Mutation
            if (Math.random() < MUTATION_RATE) {
                const idxA = Math.floor(Math.random() * child.length);
                const idxB = Math.floor(Math.random() * child.length);
                const temp = child[idxA];
                child[idxA] = child[idxB];
                child[idxB] = temp;
            }
            newPop.push(child);
        }

        setPopulation(newPop);
        setGeneration(g => g + 1);
    }, [population]);

    // Loop
    useEffect(() => {
        let frame;
        if (isRunning) {
            frame = requestAnimationFrame(() => {
                evolve();
            });
        }
        return () => cancelAnimationFrame(frame);
    }, [isRunning, evolve]);

    // Draw
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Cities
        cities.forEach(c => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#94a3b8';
            ctx.fill();
        });

        // Draw Best Path
        if (bestPath) {
            ctx.beginPath();
            ctx.strokeStyle = '#818cf8';
            ctx.lineWidth = 2;
            ctx.moveTo(bestPath[0].x, bestPath[0].y);
            for (let i = 1; i < bestPath.length; i++) {
                ctx.lineTo(bestPath[i].x, bestPath[i].y);
            }
            ctx.stroke();
        }

    }, [cities, bestPath]);

    return (
        <div className="demo-container">
            <h1 className="demo-title">Traveling Salesman (Genetic Algo)</h1>
            <p className="demo-desc">
                Résolution du problème du Voyageur de Commerce (TSP) utilisant un algorithme génétique.
                Une population de trajets évolue par croisement et mutation pour minimiser la distance totale.
            </p>

            {bestPath && (
                <div className="demo-stat">
                    Generation: {generation} | Distance: {calcTotalDist(bestPath)}
                </div>
            )}

            <div className="canvas-wrapper">
                <canvas ref={canvasRef} width={600} height={400} />
            </div>

            <div className="demo-controls">
                <button className="demo-btn" onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? <><FaPause /> Pause</> : <><FaPlay /> Start</>}
                </button>
                <button className="demo-btn" onClick={() => resetCities(15)}>
                    <FaSyncAlt /> New Cities
                </button>
            </div>

            <div className="demo-explanation">
                <h2 className="explanation-title">{lang === 'fr' ? "Explication Technique" : "Technical Explanation"}</h2>

                <div className="explanation-block">
                    <h3>🧬 {lang === 'fr' ? "Algorithme Génétique" : "Genetic Algorithm"}</h3>
                    <p>
                        {lang === 'fr'
                            ? "Inspiré de la sélection naturelle de Darwin, cet algorithme fait évoluer une population de solutions potentielles pour résoudre un problème d'optimisation complexe (ici le TSP - Traveling Salesman Problem)."
                            : "Inspired by Darwinian natural selection, this algorithm evolves a population of potential solutions to solve a complex optimization problem (here the TSP - Traveling Salesman Problem)."}
                    </p>
                </div>

                <div className="explanation-block">
                    <h3>🔄 {lang === 'fr' ? "Le Cycle d'Évolution" : "The Evolution Cycle"}</h3>
                    <ul>
                        <li>
                            <strong>Selection</strong>: {lang === 'fr' ? "Les meilleurs chemins (les plus courts) ont plus de chances de se reproduire." : "Better paths (shorter ones) have a higher chance of reproducing."}
                        </li>
                        <li>
                            <strong>Crossover (Croisement)</strong>: {lang === 'fr' ? "On combine deux chemins parents pour créer un enfant qui hérite des caractéristiques des deux." : "Combining two parent paths to create a child that inherits traits from both."}
                        </li>
                        <li>
                            <strong>Mutation</strong>: {lang === 'fr' ? "On échange aléatoirement deux villes dans le chemin pour maintenir la diversité et éviter les minimums locaux." : "Randomly swapping two cities in the path to maintain diversity and avoid local minima."}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GeneticAlgo;
