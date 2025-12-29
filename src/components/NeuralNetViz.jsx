import React, { useRef, useEffect, useState } from 'react';
import './DemoStyles.css'; // Shared styles for demos
import { FaTrash, FaRandom } from 'react-icons/fa';

class Perceptron {
    constructor() {
        this.weights = [Math.random() * 2 - 1, Math.random() * 2 - 1]; // Weights for x, y
        this.bias = Math.random() * 2 - 1;
        this.learningRate = 0.05;
    }

    guess(inputs) {
        let sum = this.bias;
        for (let i = 0; i < this.weights.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        return sum >= 0 ? 1 : -1;
    }

    train(inputs, target) {
        const guess = this.guess(inputs);
        const error = target - guess;
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] += error * inputs[i] * this.learningRate;
        }
        this.bias += error * this.learningRate;
    }

    getY(x) {
        // w0 * x + w1 * y + bias = 0  =>  y = - (w0 * x + bias) / w1
        return -(this.weights[0] * x + this.bias) / this.weights[1];
    }
}

import { useLanguage } from '../context/LanguageContext';

const NeuralNetViz = () => {
    const { lang } = useLanguage();
    const canvasRef = useRef(null);
    const [points, setPoints] = useState([]);
    const [brain] = useState(new Perceptron());
    const [iteration, setIteration] = useState(0);

    // Initialization
    useEffect(() => {
        addRandomPoints(20);
    }, []);

    const addRandomPoints = (count) => {
        const newPoints = [];
        for (let i = 0; i < count; i++) {
            newPoints.push({
                x: Math.random() * 2 - 1,
                y: Math.random() * 2 - 1,
                label: Math.random() > 0.5 ? 1 : -1
            });
        }
        setPoints(prev => [...prev, ...newPoints]);
    };

    const handleCanvasClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        // Map graphical (0, width) to cartesian (-1, 1)
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

        // Left click = 1, Right click (or Shift+Click) = -1
        const label = e.shiftKey ? -1 : 1;
        setPoints(prev => [...prev, { x, y, label }]);
    };

    // Training Loop
    useEffect(() => {
        const trainStep = () => {
            // Train one epoch per frame
            points.forEach(p => {
                brain.train([p.x, p.y], p.label);
            });
            setIteration(i => i + 1);
        };
        const interval = setInterval(trainStep, 50); // 20 FPS
        return () => clearInterval(interval);
    }, [points, brain]);

    // Rendering Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        const mapX = (x) => (x + 1) * width / 2;
        const mapY = (y) => (-y + 1) * height / 2; // Invert Y for cartesian

        ctx.clearRect(0, 0, width, height);

        // Draw Line
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const p1 = { x: -1, y: brain.getY(-1) };
        const p2 = { x: 1, y: brain.getY(1) };
        ctx.moveTo(mapX(p1.x), mapY(p1.y));
        ctx.lineTo(mapX(p2.x), mapY(p2.y));
        ctx.stroke();

        // Draw Points
        points.forEach(p => {
            const px = mapX(p.x);
            const py = mapY(p.y);
            const correct = brain.guess([p.x, p.y]) === p.label;

            ctx.beginPath();
            ctx.arc(px, py, 6, 0, Math.PI * 2);
            ctx.fillStyle = p.label === 1 ? '#4ade80' : '#f87171'; // Green vs Red
            ctx.fill();

            // Highlight incorrect predictions
            if (!correct) {
                ctx.strokeStyle = '#fbbf24'; // Yellow ring for errors
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });

    }, [points, iteration, brain]);

    return (
        <div className="demo-container">
            <h1 className="demo-title">Perceptron Learning (Classification)</h1>
            <p className="demo-desc">
                Visualisation d'un neurone artificiel simple (Perceptron) apprenant à séparer linéairement deux classes de points via la descente de gradient.
                <br />
                <strong>Click</strong> pour ajouter un point vert, <strong>Shift+Click</strong> pour un point rouge.
            </p>

            <div className="canvas-wrapper">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    onClick={handleCanvasClick}
                />
            </div>

            <div className="demo-controls">
                <button className="demo-btn" onClick={() => setPoints([])}><FaTrash /> Clear</button>
                <button className="demo-btn" onClick={() => addRandomPoints(10)}><FaRandom /> Add Random Data</button>
            </div>

            <div className="demo-explanation">
                <h2 className="explanation-title">{lang === 'fr' ? "Explication Technique" : "Technical Explanation"}</h2>

                <div className="explanation-block">
                    <h3>🎯 {lang === 'fr' ? "L'Objectif" : "The Goal"}</h3>
                    <p>
                        {lang === 'fr'
                            ? "Entraîner un Perceptron (le neurone artificiel le plus simple) à classer linéairement des points en deux catégories (vert et rouge). La ligne blanche représente la 'frontière de décision' du modèle."
                            : "Train a Perceptron (the simplest artificial neuron) to linearly classify points into two categories (green and red). The white line represents the model's 'decision boundary'."}
                    </p>
                </div>

                <div className="explanation-block">
                    <h3>🧠 {lang === 'fr' ? "Le Modèle (Perceptron)" : "The Model (Perceptron)"}</h3>
                    <p>
                        {lang === 'fr'
                            ? "Le neurone calcule une somme pondérée de ses entrées (coordonnées x, y) et ajoute un biais."
                            : "The neuron calculates a weighted sum of its inputs (x, y coordinates) and adds a bias."}
                    </p>
                    <code style={{ display: 'block', background: '#1e293b', padding: '1rem', borderRadius: '8px', margin: '0.5rem 0' }}>
                        output = sign(w1*x + w2*y + bias)
                    </code>
                </div>

                <div className="explanation-block">
                    <h3>📉 {lang === 'fr' ? "L'Apprentissage (Descente de Gradient)" : "Learning (Gradient Descent)"}</h3>
                    <p>
                        {lang === 'fr'
                            ? "À chaque itération, si le modèle se trompe, on ajuste les poids pour 'pousser' la ligne dans la bonne direction :"
                            : "At each iteration, if the model makes a mistake, weights are adjusted to 'push' the line in the correct direction:"}
                    </p>
                    <ul style={{ marginTop: '0.5rem' }}>
                        <li>
                            {lang === 'fr'
                                ? "Erreur = Cible - Prédiction"
                                : "Error = Target - Prediction"}
                        </li>
                        <li>
                            {lang === 'fr'
                                ? "Nouveau Poids = Poids + (Erreur * Entrée * Taux d'apprentissage)"
                                : "New Weight = Weight + (Error * Input * Learning Rate)"}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NeuralNetViz;
