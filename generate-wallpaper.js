const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Common Resolutions (Width x Height)
const RESOLUTIONS = [
    { name: 'Default (FHD+)', w: 1080, h: 2340, id: 'default' },
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

    // 2. Date Calc (Force IST)
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    // Manual Override for Testing (e.g., node generate-wallpaper.js 2026-06-01)
    const args = process.argv.slice(2);
    if (args.length > 0) {
        const testDate = new Date(args[0]);
        if (!isNaN(testDate)) {
            // Re-assign now if override provided
            now.setTime(testDate.getTime());
            console.log(`[TEST MODE] Simulating date: ${now.toDateString()}`);
        }
    }

    const year = now.getFullYear();
    const dayOfYear = getDayOfYear(now);
    const totalDays = 365; // Fixed for design consistency (or 366 for leap)
    const daysLeft = totalDays - dayOfYear;
    const progressPercent = Math.floor((dayOfYear / totalDays) * 100);

    // --- LAYOUT: TEXT AT TOP, GRID BELOW ---

    // 1. Draw Text (Top)
    ctx.textAlign = 'center';

    // Quotes / Word of the Day
    const words = [
        "Execute", "Do the work", "Zero excuses", "Discipline > Motivation", "Just start", "Stay hungry",
        "Outwork everyone", "Consistency is key", "Finish it", "Don't stop", "Commit", "Build the habit",
        "Show up", "Hard work works", "No shortcuts", "Action over intent", "Own the day", "Stay disciplined",
        "Win the morning", "Relentless", "Time is finite", "Don't waste it", "Now or never", "Value every second",
        "Make it count", "Clock is ticking", "Today is the day", "Invest your time", "Don't kill time",
        "Memento Mori", "Seize the moment", "The time is now", "Don't look back", "Focus on the present",
        "Tomorrow isn't promised", "Live with intent", "Buy back your time", "Prioritize", "Limited edition",
        "Tick tock", "Iterate", "Code. Commit. Push.", "Output > Input", "Stay curious", "Solve the problem",
        "Optimize", "Build something", "Learn. Unlearn. Relearn", "Ship it", "Continuous improvement",
        "Stay foolish", "Master the craft", "Think bigger", "Debug your life", "Quality over quantity",
        "One line at a time", "Trust the process", "Growth mindset", "Stay technical", "Logic over emotion",
        "Deep work", "Stay focused", "Eliminate distractions", "One task", "Silence the noise", "Focus",
        "Be present", "Minimalism", "Less but better", "Simple but effective", "Eyes on the prize",
        "Stay sharp", "Unwavering", "Tunnel vision", "Clarity", "Essentialism", "Quiet confidence",
        "Inner peace", "Mindful", "Flow state", "Keep going", "Rise and grind", "Suffer now win later",
        "Prove them wrong", "Chase greatness", "Never settle", "Earn your sleep", "Be the exception",
        "Against all odds", "Stay humble", "Power through", "Obsessed", "Legacy", "Make them remember",
        "The grind", "Level up", "Unstoppable", "Break the limit", "Succeed anyway", "Endure"
    ];
    const quote = words[dayOfYear % words.length].toUpperCase();

    // Date (Time removed to prevent stuck clock)
    const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();

    // Text Position (Top)
    const topPadding = 380 * scale; // Moved down further (User Request)

    // A. Quote (Dynamic font size — shrink for long quotes)
    const maxQuoteWidth = width - (MARGIN * 2);
    let quoteFontSize = 80 * scale;
    ctx.font = `700 ${quoteFontSize}px sans-serif`;
    while (ctx.measureText(quote).width > maxQuoteWidth && quoteFontSize > 30 * scale) {
        quoteFontSize -= 2 * scale;
        ctx.font = `700 ${quoteFontSize}px sans-serif`;
    }
    ctx.fillStyle = theme.accent;
    ctx.fillText(quote, width / 2, topPadding);

    // B. Stats (Moved up to replace Time)
    const statsY = topPadding + (60 * scale);
    ctx.font = `500 ${30 * scale}px sans-serif`;
    ctx.fillStyle = theme.text;
    ctx.fillText(`${dateString}  •  ${daysLeft}D LEFT  •  ${progressPercent}%`, width / 2, statsY);

    // --- GRID (Positioned BELOW Text) ---
    // Calculate Grid Start Y based on text end
    const gridStartY = statsY + (80 * scale);

    const renderCols = 15;
    const gridWidth = width - (MARGIN * 2);
    const dotSize = (gridWidth - ((renderCols - 1) * GAP)) / renderCols;
    const radius = dotSize / 2;

    const totalRows = Math.ceil(totalDays / renderCols);

    // Center Grid Horizontally (Standard)
    let xStart = MARGIN + radius;
    // Set Grid Vertically
    let yStart = gridStartY;

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
        } else {
            // Future
            ctx.fillStyle = theme.dotEmpty;
            ctx.fill();
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
