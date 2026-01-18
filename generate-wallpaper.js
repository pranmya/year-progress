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

// Theme Config (Minimal / User Requested)
const theme = {
    bg: '#121212',        // Very dark grey
    dotFilled: '#ffffff', // Past days: White
    dotEmpty: '#262626',  // Future days: Dark Grey
    dotToday: '#ff6b4a',  // Today: Orange/Coral
    text: '#666666',      // Text: Grey
    accent: '#ff6b4a'     // Accent text: Orange
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

    // Scale Logic
    const scale = width / 1080;
    const MARGIN = 100 * scale;
    const GAP = 20 * scale; // Slightly more gap for cleaner look

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
    const totalDays = 365; // Fixed for design consistency (or 366 for leap)
    const daysLeft = totalDays - dayOfYear;
    const progressPercent = Math.floor((dayOfYear / totalDays) * 100);

    // 3. Draw Grid
    const renderCols = 15;

    const gridWidth = width - (MARGIN * 2);
    const dotSize = (gridWidth - ((renderCols - 1) * GAP)) / renderCols;
    const radius = dotSize / 2;

    const totalRows = Math.ceil(totalDays / renderCols);
    const gridHeight = (totalRows * dotSize) + ((totalRows - 1) * GAP);

    let xStart = MARGIN + radius;
    // Center Grid Vertically
    let yStart = (height - gridHeight) / 2;

    for (let i = 1; i <= totalDays; i++) {
        const colIndex = (i - 1) % renderCols;
        const rowIndex = Math.floor((i - 1) / renderCols);

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
            ctx.fillStyle = theme.dotToday;
            ctx.fill();
            // No glow/ring, just flat color based on image
        } else {
            // Future
            ctx.fillStyle = theme.dotEmpty; // Using fill instead of stroke for "dot" look
            ctx.fill();
        }
    }

    // 4. Draw Bottom Text
    ctx.textAlign = 'center';

    // Quotes / Word of the Day (1-2 words max)
    const words = [
        "Focus", "Grind", "Patience", "Execute", "Vision", "Believe", "Create", "Impact",
        "Stoic", "Calm", "Power", "Silence", "Action", "Build", "Grow", "Learn",
        "Mastery", "Discipline", "Courage", "Honor", "Strength", "Wisdom", "Trust", "Flow",
        "Energy", "Momentum", "Rise", "Shine", "Win", "Conquer", "Lead", "Inspire",
        "Dream", "Hustle", "Passion", "Purpose", "Drive", "Spirit", "Soul", "Heart",
        "Bold", "Brave", "Peak", "Zen", "Alive", "Now", "Begin", "Finish"
    ];
    // Pick word based on dayOfYear so it's consistent for everyone that day
    const quote = words[dayOfYear % words.length].toUpperCase();

    // Date & Time (IST)
    const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
    // Note: This shows generation time
    const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).toUpperCase();

    // Moving text block UP to avoid app drawer overlap by roughly 70px
    const textYStart = yStart + gridHeight + (50 * scale);

    // 1. Draw Quote (Orange, Large)
    ctx.font = `700 ${80 * scale}px sans-serif`;
    ctx.fillStyle = theme.accent;
    ctx.fillText(quote, width / 2, textYStart);

    // 2. Draw Time (White/Grey, Medium) - NEW LINE
    const timeY = textYStart + (70 * scale);
    ctx.font = `600 ${50 * scale}px sans-serif`;
    ctx.fillStyle = '#bbbbbb';
    ctx.fillText(timeString, width / 2, timeY);

    // 3. Draw Stats (Grey, Small) - Bottom Line
    const statsY = timeY + (50 * scale);
    ctx.font = `500 ${30 * scale}px sans-serif`;
    ctx.fillStyle = theme.text;
    ctx.fillText(`${dateString}  •  ${daysLeft}D LEFT  •  ${progressPercent}%`, width / 2, statsY);

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
