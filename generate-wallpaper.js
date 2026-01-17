const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Common Resolutions (Width x Height)
const RESOLUTIONS = [
    { name: 'Default (FHD)', w: 1080, h: 1920, id: 'default' },
    { name: 'Samsung S24 Ultra', w: 1440, h: 3120, id: 's24u' },
    { name: 'Pixel 8 Pro', w: 1344, h: 2992, id: 'nz8p' },
    { name: 'iPhone 15 Pro Max', w: 1290, h: 2796, id: 'i15pm' },
    { name: 'iPhone 15/14', w: 1179, h: 2556, id: 'i15' },
    { name: 'Samsung S23/24', w: 1080, h: 2340, id: 's24' },
    { name: 'FHD+ Extra Tall', w: 1080, h: 2400, id: 'fhdplus' },
    { name: 'OnePlus 11/12', w: 1440, h: 3216, id: 'op12' },
    { name: 'Sony Xperia 1 V', w: 1644, h: 3840, id: 'x1v' }, // 4K
    { name: 'Generic HD', w: 720, h: 1280, id: 'hd' },
    { name: 'Tablet / Folding (Square-ish)', w: 2200, h: 2480, id: 'fold' }
];

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

function generateWallpaper(resKey, width, height) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Scale Logic: Adjust sizes based on resolution relative to 1080p width
    const scale = width / 1080;
    const MARGIN = 100 * scale;
    const fontYearIdx = 120 * scale;
    const fontDayIdx = 40 * scale;
    const GAP = 15 * scale;

    // 1. Fill Background
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    // 2. Date Calc
    let now = new Date();

    // Manual Override for Testing (e.g., node generate-wallpaper.js 2026-06-01)
    const args = process.argv.slice(2);
    if (args.length > 0) {
        const testDate = new Date(args[0]);
        if (!isNaN(testDate)) {
            now = testDate;
            console.log(`[TEST MODE] Simulating date: ${now.toDateString()}`);
        }
    }

    const year = now.getFullYear();
    const dayOfYear = getDayOfYear(now);
    const totalDays = 365;

    // 3. Draw Header Text
    ctx.textAlign = 'center';

    // Year
    // Note: 'Inter' font might not be available in CI env, falling back to sans-serif
    ctx.font = `bold ${fontYearIdx}px sans-serif`;
    ctx.fillStyle = theme.highlight;
    ctx.fillText(year, width / 2, height * 0.15); // 15% down

    // Day Counter
    ctx.font = `${fontDayIdx}px sans-serif`;
    ctx.fillStyle = theme.text;
    ctx.fillText(`Day ${dayOfYear} of ${totalDays}`, width / 2, height * 0.18); // 18% down

    // 4. Draw Grid
    const cols = 19;
    const gridWidth = width - (MARGIN * 2);

    // dotSize calc
    const dotSize = (gridWidth - ((cols - 1) * GAP)) / cols;
    const radius = dotSize / 2;

    let xStart = MARGIN + radius;
    let yStart = height * 0.25; // Start grid 25% down

    for (let i = 1; i <= totalDays; i++) {
        const colIndex = (i - 1) % cols;
        const rowIndex = Math.floor((i - 1) / cols);

        const cx = xStart + (colIndex * (dotSize + GAP));
        const cy = yStart + (rowIndex * (dotSize + GAP));

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
            ctx.shadowBlur = 40 * scale;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Highlight ring
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2 * scale;
            ctx.stroke();
        } else {
            // Future
            ctx.strokeStyle = theme.dotEmpty;
            ctx.lineWidth = 2 * scale;
            ctx.stroke();
        }
    }

    // Save to file
    // If default, save as wallpaper.png, else wallpaper-resolution.png
    let filename = 'wallpaper.png';
    if (resKey !== 'default') {
        filename = `wallpaper-${width}x${height}.png`;
    }

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, filename), buffer);
    console.log(`Generated: ${filename} (${width}x${height})`);
}

// Main Loop
RESOLUTIONS.forEach(res => {
    generateWallpaper(res.id, res.w, res.h);
});
