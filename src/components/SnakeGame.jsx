import React, { useState, useEffect, useRef, useCallback } from 'react';
import './SnakeGame.css';
import { FaPlay, FaRedo } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const GRID_SIZE = 20;
const ROWS = 20;
const COLS = 20;
const INITIAL_SNAKE = [[10, 10]];
const INITIAL_DIRECTION = [0, 1]; // Right
const GAME_SPEED = 150;

const SnakeGame = () => {
    const { lang } = useLanguage();
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState([5, 5]);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    // Use ref for direction to avoid closure staleness in interval without re-running effect
    const directionRef = useRef(INITIAL_DIRECTION);

    const generateFood = useCallback((currentSnake) => {
        while (true) {
            const r = Math.floor(Math.random() * ROWS);
            const c = Math.floor(Math.random() * COLS);
            // Check if food spawns on snake
            const onSnake = currentSnake.some(([sr, sc]) => sr === r && sc === c);
            if (!onSnake) return [r, c];
        }
    }, []);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        directionRef.current = INITIAL_DIRECTION;
        setFood(generateFood(INITIAL_SNAKE));
        setGameOver(false);
        setScore(0);
        setIsPlaying(true);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;

            // Prevent scrolling if using arrow keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
                e.preventDefault();
            }

            const [dr, dc] = directionRef.current;

            let newDir = null;

            if (key === 'ArrowUp' && dr !== 1) newDir = [-1, 0];
            else if (key === 'ArrowDown' && dr !== -1) newDir = [1, 0];
            else if (key === 'ArrowLeft' && dc !== 1) newDir = [0, -1];
            else if (key === 'ArrowRight' && dc !== -1) newDir = [0, 1];

            if (newDir) {
                setDirection(newDir);
                directionRef.current = newDir;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (!isPlaying || gameOver) return;

        const moveSnake = () => {
            setSnake((prevSnake) => {
                const head = prevSnake[prevSnake.length - 1];
                const [hr, hc] = head;
                const [dr, dc] = directionRef.current;

                const newHead = [hr + dr, hc + dc];
                const [nhr, nhc] = newHead;

                // Wall Collision
                if (nhr < 0 || nhr >= ROWS || nhc < 0 || nhc >= COLS) {
                    setGameOver(true);
                    return prevSnake;
                }

                // Self Collision
                for (const [sr, sc] of prevSnake) {
                    if (sr === nhr && sc === nhc) {
                        setGameOver(true);
                        return prevSnake;
                    }
                }

                const newSnake = [...prevSnake, newHead];

                // Food Collision
                if (nhr === food[0] && nhc === food[1]) {
                    setScore(s => s + 1);
                    setFood(generateFood(newSnake));
                    // Don't shift (grow)
                } else {
                    newSnake.shift(); // Remove tail
                }

                return newSnake;
            });
        };

        const intervalId = setInterval(moveSnake, GAME_SPEED);
        return () => clearInterval(intervalId);
    }, [isPlaying, gameOver, food, generateFood]);

    return (
        <div className="snake-container">
            <h1 className="snake-title">Snake (Mini-Jeu)</h1>
            <p className="snake-stats">Score: {score}</p>

            {!isPlaying && !gameOver && (
                <button className="snake-btn start" onClick={resetGame}>
                    <FaPlay /> Jouer
                </button>
            )}

            {gameOver && (
                <div className="game-over-overlay">
                    <h2>Game Over</h2>
                    <p>Score final: {score}</p>
                    <button className="snake-btn retry" onClick={resetGame}>
                        <FaRedo /> Rejouer
                    </button>
                </div>
            )}

            <div
                className="snake-grid"
                style={{
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`
                }}
            >
                {Array.from({ length: ROWS * COLS }).map((_, idx) => {
                    const r = Math.floor(idx / COLS);
                    const c = idx % COLS;

                    const isFood = food[0] === r && food[1] === c;
                    const isSnake = snake.some(([sr, sc]) => sr === r && sc === c);

                    let className = 'grid-cell';
                    if (isSnake) className += ' cell-snake';
                    if (isFood) className += ' cell-food';

                    return <div key={idx} className={className}></div>;
                })}
            </div>

            <div className="controls-hint">
                {lang === 'fr' ? "Utilisez les flèches du clavier pour vous déplacer ⬆️⬇️⬅️➡️" : "Use arrow keys to move ⬆️⬇️⬅️➡️"}
            </div>

            <div className="demo-explanation">
                <h2 className="explanation-title">{lang === 'fr' ? "Explication Technique" : "Technical Explanation"}</h2>

                <div className="explanation-block">
                    <h3>🐍 {lang === 'fr' ? "Logique de Jeu" : "Game Logic"}</h3>
                    <p>
                        {lang === 'fr'
                            ? "Le serpent est représenté par un tableau de coordonnées. À chaque 'frame' du jeu (tick), on calcule la nouvelle tête en fonction de la direction, et on retire la queue (sauf si on mange)."
                            : "The snake is represented by an array of coordinates. At each game 'tick', we calculate the new head based on direction, and remove the tail (unless food is eaten)."}
                    </p>
                </div>

                <div className="explanation-block">
                    <h3>⚡ {lang === 'fr' ? "Gestion d'État (State)" : "State Management"}</h3>
                    <p>
                        {lang === 'fr'
                            ? "React gère l'état du jeu. Un `useEffect` avec un `setInterval` déclenche la boucle de jeu. La difficulté ici est de gérer les changements de direction rapides pour éviter que le serpent ne se retourne sur lui-même en une seule frame."
                            : "React manages the game state. A `useEffect` with `setInterval` triggers the game loop. The challenge involves managing rapid direction changes to prevent the snake from reversing into itself within a single frame."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SnakeGame;
