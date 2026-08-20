const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const WIDTH = 1080;
const HEIGHT = 2340;
const scale = WIDTH / 1080;

const theme = {
    bg: '#121212',
    text: '#666666',
    accent: '#ff6b4a',
    dotFilled: '#ffffff',
    dotEmpty: '#262626'
};

const word = "RELENTLESS";

function drawBase(ctx, fontStyle, fontName) {
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    const centerX = WIDTH / 2;
    const wordY = 420 * scale;
    
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = theme.accent;
    
    // Apply Font
    ctx.font = fontStyle;
    ctx.fillText(word, centerX, wordY);
    
    // Draw Name of Font Below for reference
    ctx.font = `400 ${30 * scale}px sans-serif`;
    ctx.fillStyle = theme.text;
    ctx.fillText(`Style: ${fontName}`, centerX, wordY + 80 * scale);
}

const fonts = [
    { name: 'Geometric / Wide (Verdana)', style: `700 ${75 * scale}px Verdana, sans-serif`, file: 'font_verdana' },
    { name: 'Architect / Sharp (Trebuchet MS)', style: `700 ${80 * scale}px "Trebuchet MS", sans-serif`, file: 'font_trebuchet' },
    { name: 'Cinematic / Dramatic (Italic Serif)', style: `italic 700 ${85 * scale}px "Times New Roman", serif`, file: 'font_italic_serif' },
    { name: 'Mechanical / Typewriter (Courier New)', style: `700 ${75 * scale}px "Courier New", monospace`, file: 'font_courier' }
];

fonts.forEach(f => {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');
    drawBase(ctx, f.style, f.name);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, `idea_${f.file}.png`), buffer);
    console.log(`Generated: idea_${f.file}.png`);
});
