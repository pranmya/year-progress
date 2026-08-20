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

const quote = "OBSESSED";
const dateString = "MAY 29  •  216D LEFT  •  40%";
const progressPercent = 40;

function saveCanvas(canvas, filename) {
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, filename), buffer);
    console.log(`Generated ${filename}`);
}

// 1. The Monolith
{
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    const progressHeight = height * (progressPercent / 100);
    const lineX = width / 2;
    const lineWidth = 6 * scale;

    // Draw background line
    ctx.fillStyle = theme.dotEmpty;
    ctx.fillRect(lineX - lineWidth/2, 0, lineWidth, height);

    // Draw progress line
    ctx.fillStyle = theme.dotFilled;
    ctx.fillRect(lineX - lineWidth/2, height - progressHeight, lineWidth, progressHeight);

    // Draw Quote
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // We want the quote to cut through the line, so we clear the background behind it
    ctx.font = `700 ${90 * scale}px sans-serif`;
    const quoteWidth = ctx.measureText(quote).width;
    
    ctx.fillStyle = theme.bg;
    ctx.fillRect(lineX - quoteWidth/2 - 40, height - progressHeight - 60, quoteWidth + 80, 120);

    ctx.fillStyle = theme.accent;
    ctx.fillText(quote, width / 2, height - progressHeight);

    // Draw Stats
    ctx.textBaseline = 'alphabetic';
    ctx.font = `500 ${30 * scale}px sans-serif`;
    ctx.fillStyle = theme.text;
    ctx.fillText(dateString, width / 2, height - progressHeight + 100 * scale); 

    saveCanvas(canvas, 'mockup_monolith.png');
}

// 2. The Void
{
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    // Quote in middle
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `800 ${160 * scale}px sans-serif`;
    ctx.fillStyle = theme.dotFilled;
    ctx.fillText(quote, width / 2, height / 2 - 100 * scale);

    // Accent line or just stats
    ctx.textBaseline = 'alphabetic';
    ctx.font = `500 ${35 * scale}px sans-serif`;
    ctx.fillStyle = theme.accent;
    ctx.fillText(dateString, width / 2, height - 150 * scale);

    saveCanvas(canvas, 'mockup_void.png');
}

// 3. The Eclipse
{
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2 - 150 * scale;
    const radius = 350 * scale;

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();
    
    ctx.fillStyle = theme.dotEmpty;
    ctx.fillRect(0, 0, width, height);
    
    const fillHeight = radius * 2 * (progressPercent / 100);
    ctx.fillStyle = theme.dotFilled;
    ctx.fillRect(0, centerY + radius - fillHeight, width, fillHeight);
    ctx.restore();

    // Text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.font = `700 ${90 * scale}px sans-serif`;
    ctx.fillStyle = theme.accent;
    ctx.fillText(quote, width / 2, centerY + radius + 150 * scale);

    ctx.font = `500 ${35 * scale}px sans-serif`;
    ctx.fillStyle = theme.text;
    ctx.fillText(dateString, width / 2, centerY + radius + 230 * scale);

    saveCanvas(canvas, 'mockup_eclipse.png');
}
