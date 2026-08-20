const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const width = 1080;
const height = 2340;
const scale = width / 1080;

const theme = {
    bg: '#121212',
    bgLight: '#1f1a18', // Very dark warm tint
    text: '#666666',
    accent: '#ff6b4a',
    dotFilled: '#ffffff',
    dotEmpty: '#262626'
};

const quote = "RELENTLESS";
const dateString = "MAY 29  •  216D LEFT  •  40%";
const progressPercent = 40;

function saveCanvas(canvas, filename) {
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, filename), buffer);
    console.log(`Generated ${filename}`);
}

// 1. The Orbit
{
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2 - 100 * scale;
    const radius = 350 * scale;

    // Center "Sun"
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8 * scale, 0, Math.PI * 2);
    ctx.fillStyle = theme.accent;
    ctx.fill();

    // Orbit path
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = theme.dotEmpty;
    ctx.lineWidth = 2 * scale;
    ctx.stroke();

    // Planet (Progress)
    const angle = (Math.PI * 2 * (progressPercent / 100)) - (Math.PI / 2); // Start at top
    const planetX = centerX + radius * Math.cos(angle);
    const planetY = centerY + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.arc(planetX, planetY, 15 * scale, 0, Math.PI * 2);
    ctx.fillStyle = theme.dotFilled;
    ctx.fill();

    // Text
    ctx.textAlign = 'center';
    ctx.font = `700 ${80 * scale}px sans-serif`;
    ctx.fillStyle = theme.dotFilled;
    ctx.fillText(quote, width / 2, height / 2 + 350 * scale);

    ctx.font = `500 ${30 * scale}px sans-serif`;
    ctx.fillStyle = theme.accent;
    ctx.fillText(dateString, width / 2, height / 2 + 420 * scale);

    saveCanvas(canvas, 'mockup_orbit.png');
}

// 2. The Rings
{
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2 - 100 * scale;
    
    // Draw 12 rings
    const maxRadius = 400 * scale;
    const ringSpacing = maxRadius / 12;

    const currentMonth = Math.floor((progressPercent / 100) * 12);
    const currentMonthProgress = ((progressPercent / 100) * 12) - currentMonth;

    for(let i=0; i<12; i++) {
        const r = (i + 1) * ringSpacing;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        
        if (i < currentMonth) {
            ctx.strokeStyle = theme.dotFilled;
            ctx.lineWidth = 3 * scale;
        } else if (i === currentMonth) {
            // Partially fill the current month's ring
            ctx.strokeStyle = theme.dotEmpty;
            ctx.lineWidth = 3 * scale;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(centerX, centerY, r, -Math.PI/2, -Math.PI/2 + (Math.PI * 2 * currentMonthProgress));
            ctx.strokeStyle = theme.accent;
            ctx.lineWidth = 5 * scale;
        } else {
            ctx.strokeStyle = theme.dotEmpty;
            ctx.lineWidth = 1 * scale;
        }
        ctx.stroke();
    }

    // Text in center
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `700 ${60 * scale}px sans-serif`;
    ctx.fillStyle = theme.accent;
    ctx.fillText(quote, centerX, centerY);

    ctx.textBaseline = 'alphabetic';
    ctx.font = `500 ${30 * scale}px sans-serif`;
    ctx.fillStyle = theme.text;
    ctx.fillText(dateString, width / 2, centerY + maxRadius + 150 * scale);

    saveCanvas(canvas, 'mockup_rings.png');
}

// 3. The Horizon
{
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    const progressY = height - (height * (progressPercent / 100));

    // Bottom fill
    ctx.fillStyle = theme.bgLight;
    ctx.fillRect(0, progressY, width, height - progressY);

    // Top fill
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, progressY);

    // Line separator
    ctx.fillStyle = theme.accent;
    ctx.fillRect(0, progressY - 2*scale, width, 4*scale);

    // Text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `800 ${100 * scale}px sans-serif`;
    ctx.fillStyle = theme.dotFilled;
    
    // We want the text to be right above the horizon
    ctx.fillText(quote, width / 2, progressY - 80 * scale);

    ctx.textBaseline = 'alphabetic';
    ctx.font = `500 ${30 * scale}px sans-serif`;
    ctx.fillStyle = theme.text;
    ctx.fillText(dateString, width / 2, progressY + 60 * scale);

    saveCanvas(canvas, 'mockup_horizon.png');
}
