const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Config
const WIDTH = 1080;
const HEIGHT = 1920;
const MARGIN = 100;
const COLS = 19;

// Theme Config (Dark Default)
const theme = {
    bg: '#0a0a0a',
    dotEmpty: '#2a2a2a',
    dotFilled: '#e0e0e0',
    dotGlow: '#00f0ff',
    text: '#e0e0e0',
    highlight: '#ffffff'
};

function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function drawWallpaper() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // 1. Fill Background
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // 2. Date Calc
    const now = new Date();
    const year = now.getFullYear();
    const dayOfYear = getDayOfYear(now);
    const totalDays = 365;

    // 3. Draw Header Text
    ctx.textAlign = 'center';

    // Year
    // Note: 'Inter' font might not be available in CI env, falling back to sans-serif
    ctx.font = 'bold 120px sans-serif';
    ctx.fillStyle = theme.highlight;
    ctx.fillText(year, WIDTH / 2, 250);

    // Day Counter
    ctx.font = '40px sans-serif';
    ctx.fillStyle = theme.text;
    ctx.fillText(`Day ${dayOfYear} of ${totalDays}`, WIDTH / 2, 320);

    // 4. Draw Grid
    const gridWidth = WIDTH - (MARGIN * 2);
    const gap = 15;
    const dotSize = (gridWidth - ((COLS - 1) * gap)) / COLS;
    const radius = dotSize / 2;

    let xStart = MARGIN + radius;
    let yStart = 450;

    for (let i = 1; i <= totalDays; i++) {
        const colIndex = (i - 1) % COLS;
        const rowIndex = Math.floor((i - 1) / COLS);

        const cx = xStart + (colIndex * (dotSize + gap));
        const cy = yStart + (rowIndex * (dotSize + gap));

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);

        if (i < dayOfYear) {
            // Past
            ctx.fillStyle = theme.dotFilled;
            ctx.fill();
        } else if (i === dayOfYear) {
            // Today
            ctx.fillStyle = theme.dotGlow;
            ctx.shadowColor = theme.dotGlow;
            ctx.shadowBlur = 40;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Highlight ring
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        } else {
            // Future
            ctx.strokeStyle = theme.dotEmpty;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, 'wallpaper.png'), buffer);
    console.log('Wallpaper generated: wallpaper.png');
}

drawWallpaper();
