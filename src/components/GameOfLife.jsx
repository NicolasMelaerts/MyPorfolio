import React, { useState, useCallback, useRef } from 'react';
import './GameOfLife.css';
import { FaPlay, FaPause, FaRedo, FaTrash } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

// Grid Configuration
const numRows = 30;
const numCols = 30;

const operations = [
    [0, 1], [0, -1], [1, -1], [-1, 1],
    [1, 1], [-1, -1], [1, 0], [-1, 0]
];

const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
};

const generateRandomGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => Math.random() > 0.7 ? 1 : 0));
    }
    return rows;
};

const GameOfLife = () => {
    const { lang } = useLanguage();
    const [grid, setGrid] = useState(() => {
        return generateRandomGrid();
    });

    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        setGrid((g) => {
            const nextGrid = g.map(row => [...row]); // Copy grid
            for (let i = 0; i < numRows; i++) {
                for (let k = 0; k < numCols; k++) {
                    let neighbors = 0;
                    operations.forEach(([x, y]) => {
                        const newI = i + x;
                        const newK = k + y;
                        if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                            neighbors += g[newI][newK];
                        }
                    });

                    if (neighbors < 2 || neighbors > 3) {
                        nextGrid[i][k] = 0;
                    } else if (g[i][k] === 0 && neighbors === 3) {
                        nextGrid[i][k] = 1;
                    }
                }
            }
            return nextGrid;
        });

        setTimeout(runSimulation, 100);
    }, []);

    return (
        <div className="game-container">
            <h1 className="game-title">
                {lang === 'fr' ? "Jeu de la Vie (Conway)" : "Conway's Game of Life"}
            </h1>
            <p className="game-desc">
                {lang === 'fr'
                    ? "Un automate cellulaire : chaque cellule naît, vit ou meurt selon ses voisins. Cliquez sur la grille pour modifier l'état."
                    : "A cellular automaton: each cell is born, lives, or dies based on its neighbors. Click on the grid to toggle state."}
            </p>

            <div className="game-controls">
                <button className="control-btn" onClick={() => {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true;
                        runSimulation();
                    }
                }}>
                    {running
                        ? <><FaPause /> {lang === 'fr' ? "Pause" : "Pause"}</>
                        : <><FaPlay /> {lang === 'fr' ? "Démarrer" : "Start"}</>}
                </button>
                <button className="control-btn" onClick={() => {
                    setGrid(generateRandomGrid());
                }}>
                    <FaRedo /> {lang === 'fr' ? "Aléatoire" : "Random"}
                </button>
                <button className="control-btn" onClick={() => {
                    setGrid(generateEmptyGrid());
                    setRunning(false); // Stop when clearing
                }}>
                    <FaTrash /> {lang === 'fr' ? "Effacer" : "Clear"}
                </button>
            </div>

            <div
                className="grid-display"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${numCols}, 20px)`
                }}
            >
                {grid.map((rows, i) =>
                    rows.map((col, k) => (
                        <div
                            key={`${i}-${k}`}
                            onClick={() => {
                                const newGrid = [...grid];
                                newGrid[i][k] = grid[i][k] ? 0 : 1;
                                setGrid(newGrid);
                            }}
                            className={`cell ${grid[i][k] ? 'alive' : ''}`}
                        />
                    ))
                )}
            </div>

            <div className="demo-explanation">
                <h2 className="explanation-title">{lang === 'fr' ? "Explication Technique" : "Technical Explanation"}</h2>

                <div className="explanation-block">
                    <h3>🦠 {lang === 'fr' ? "Automate Cellulaire" : "Cellular Automaton"}</h3>
                    <p>
                        {lang === 'fr'
                            ? "Le Jeu de la Vie est un système 'turing-complet' déterminé par son état initial. Il illustre comment des règles locales simples peuvent créer de la complexité (émergence)."
                            : "The Game of Life is a 'Turing-complete' system determined by its initial state. It illustrates how simple local rules can create global complexity (emergence)."}
                    </p>
                </div>

                <div className="explanation-block">
                    <h3>📜 {lang === 'fr' ? "Les Règles" : "The Rules"}</h3>
                    <ul>
                        <li>
                            {lang === 'fr' ? "Une cellule vivante avec 2 ou 3 voisins survit." : "A live cell with 2 or 3 neighbors survives."}
                        </li>
                        <li>
                            {lang === 'fr' ? "Une cellule morte avec exactement 3 voisins naît (reproduction)." : "A dead cell with exactly 3 neighbors is born (reproduction)."}
                        </li>
                        <li>
                            {lang === 'fr' ? "Les autres meurent (surpopulation ou isolement)." : "Others die (overpopulation or isolation)."}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GameOfLife;
