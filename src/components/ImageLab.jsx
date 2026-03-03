import React, { useState, useRef, useEffect } from 'react';
import './ImageLab.css';
import { FaUpload, FaMagic, FaUndo } from 'react-icons/fa';

// Convolution Kernels
const kernels = {
    identity: [
        0, 0, 0,
        0, 1, 0,
        0, 0, 0
    ],
    sharpen: [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
    ],
    boxBlur: [
        1 / 9, 1 / 9, 1 / 9,
        1 / 9, 1 / 9, 1 / 9,
        1 / 9, 1 / 9, 1 / 9
    ],
    edgeDetection: [
        -1, -1, -1,
        -1, 8, -1,
        -1, -1, -1
    ],
    emboss: [
        -2, -1, 0,
        -1, 1, 1,
        0, 1, 2
    ]
};

const ImageLab = () => {
    const [image, setImage] = useState(null);
    const canvasRef = useRef(null);
    const [originalImageData, setOriginalImageData] = useState(null);
    const [activeFilter, setActiveFilter] = useState('identity');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setImage(img);
                    drawImage(img);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const drawImage = (img) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Resize canvas to fit image (max maxWidth)
        const maxWidth = 600;
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setOriginalImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
        setActiveFilter('identity');
    };

    const applyKernel = (kernelName) => {
        if (!originalImageData) return;
        setActiveFilter(kernelName);

        const kernel = kernels[kernelName];
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const src = originalImageData.data;
        const w = originalImageData.width;
        const h = originalImageData.height;
        const side = Math.round(Math.sqrt(kernel.length));
        const halfSide = Math.floor(side / 2);

        const output = ctx.createImageData(w, h);
        const dst = output.data;

        // Simple convolution loop
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                let r = 0, g = 0, b = 0;
                for (let ky = 0; ky < side; ky++) {
                    for (let kx = 0; kx < side; kx++) {
                        const scy = y + ky - halfSide;
                        const scx = x + kx - halfSide;

                        if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
                            const srcOffset = (scy * w + scx) * 4;
                            const wt = kernel[ky * side + kx];
                            r += src[srcOffset] * wt;
                            g += src[srcOffset + 1] * wt;
                            b += src[srcOffset + 2] * wt;
                        }
                    }
                }
                const dstOffset = (y * w + x) * 4;
                dst[dstOffset] = r;
                dst[dstOffset + 1] = g;
                dst[dstOffset + 2] = b;
                dst[dstOffset + 3] = 255;
            }
        }
        ctx.putImageData(output, 0, 0);
    };

    return (
        <div className="lab-container">
            <h1 className="lab-title">Computer Vision Lab</h1>
            <p className="lab-desc">Explorez les convolutions : appliquez des filtres mathématiques en temps réel pour détecter des contours ou flouter une image.</p>

            <div className="lab-controls">
                <label className="upload-btn">
                    <FaUpload /> Charger une image
                    <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                </label>

                {image && (
                    <div className="filter-buttons">
                        <button onClick={() => applyKernel('identity')} className={activeFilter === 'identity' ? 'active' : ''}>Original</button>
                        <button onClick={() => applyKernel('boxBlur')} className={activeFilter === 'boxBlur' ? 'active' : ''}>Flou (Box Blur)</button>
                        <button onClick={() => applyKernel('sharpen')} className={activeFilter === 'sharpen' ? 'active' : ''}>Netteté (Sharpen)</button>
                        <button onClick={() => applyKernel('edgeDetection')} className={activeFilter === 'edgeDetection' ? 'active' : ''}>Contours (Sobel)</button>
                        <button onClick={() => applyKernel('emboss')} className={activeFilter === 'emboss' ? 'active' : ''}>Relief (Emboss)</button>
                    </div>
                )}
            </div>

            <div className="canvas-wrapper">
                <canvas ref={canvasRef} className={!image ? 'empty' : ''}></canvas>
                {!image && <div className="placeholder-text">Aucune image chargée</div>}
            </div>
            <div className="demo-explanation">
                <h2 className="explanation-title">{lang === 'fr' ? "Explication Technique" : "Technical Explanation"}</h2>

                <div className="explanation-block">
                    <h3>📷 {lang === 'fr' ? "Convolution d'Image" : "Image Convolution"}</h3>
                    <p>
                        {lang === 'fr'
                            ? "Le traitement d'image repose ici sur l'opération mathématique de convolution. On fait glisser une petite matrice (appelée 'noyau' ou 'kernel') sur chaque pixel de l'image."
                            : "Image processing here relies on the mathematical operation of convolution. We slide a small matrix (called a 'kernel') over every pixel of the image."}
                    </p>
                </div>

                <div className="explanation-block">
                    <h3>🧮 {lang === 'fr' ? "Le Kernel" : "The Kernel"}</h3>
                    <p>
                        {lang === 'fr'
                            ? "La valeur de chaque nouveau pixel est la somme pondérée de ses voisins, définie par le kernel. Par exemple, un détecteur de contours (Edge Detection) met en évidence les changements brusques d'intensité."
                            : "The value of each new pixel is the weighted sum of its neighbors, defined by the kernel. For example, an Edge Detection kernel highlights sharp changes in intensity."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImageLab;
