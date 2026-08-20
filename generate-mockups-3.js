const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const width = 1080;
const height = 2340;
const scale = width / 1080;

const theme = {
    bg: '#121212',
    text: '#666666',
    accent: '#ff6b4a',
    dotFilled: '#ffffff',
    dotEmpty: '#262626'
};

const word = "RELENTLESS";
const dateString = "MAY 29  •  216D LEFT  •  40%";
const progressPercent = 40;

const quoteLine1 = '"He who has a why to live for';
const quoteLine2 = 'can bear almost any how."';
const authorText = "— Friedrich Nietzsche";

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');
ctx.fillStyle = theme.bg;
ctx.fillRect(0, 0, width, height);

const centerX = width / 2;

// 1. Top Section: Word
const wordY = 350 * scale;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = `700 ${80 * scale}px sans-serif`;
ctx.fillStyle = theme.accent;
ctx.fillText(word, centerX, wordY);

// 2. Date String
const dateY = wordY + 80 * scale;
ctx.font = `500 ${30 * scale}px sans-serif`;
ctx.fillStyle = theme.text;
ctx.fillText(dateString, centerX, dateY);

// 3. Rings
const centerY = 1050 * scale; // Center of the screen-ish
const maxRadius = 450 * scale;
const ringSpacing = maxRadius / 12;

const currentMonth = Math.floor((progressPercent / 100) * 12);
const currentMonthProgress = ((progressPercent / 100) * 12) - currentMonth;

for(let i=0; i<12; i++) {
    const r = (i + 1) * ringSpacing;
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
    
    if (i < currentMonth) {
        ctx.strokeStyle = theme.dotFilled;
        ctx.lineWidth = 4 * scale;
    } else if (i === currentMonth) {
        // Partially fill the current month's ring
        ctx.strokeStyle = theme.dotEmpty;
        ctx.lineWidth = 4 * scale;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX, centerY, r, -Math.PI/2, -Math.PI/2 + (Math.PI * 2 * currentMonthProgress));
        ctx.strokeStyle = theme.accent;
        ctx.lineWidth = 6 * scale;
    } else {
        ctx.strokeStyle = theme.dotEmpty;
        ctx.lineWidth = 1.5 * scale;
    }
    ctx.stroke();
}

// 4. Quote Section
const quoteY1 = centerY + maxRadius + 220 * scale;
const quoteY2 = quoteY1 + 50 * scale;

// Elegant Serif Font for Quote (Subtle size)
ctx.font = `italic 400 ${36 * scale}px Georgia, serif`;
ctx.fillStyle = theme.dotFilled;
ctx.fillText(quoteLine1, centerX, quoteY1);
ctx.fillText(quoteLine2, centerX, quoteY2);

// Author (kept clean sans-serif but smaller for contrast)
const authorY = quoteY2 + 60 * scale;
ctx.font = `500 ${24 * scale}px sans-serif`;
ctx.fillStyle = theme.text;
ctx.fillText(authorText, centerX, authorY);

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, 'mockup_rings_revised.png'), buffer);
console.log('Generated mockup_rings_revised.png');
