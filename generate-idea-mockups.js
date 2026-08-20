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

const dayOfYear = 216;
const totalDays = 365;

function drawBase(ctx, variant) {
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    // Watermark Variant
    if (variant === 'watermark') {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `900 ${450 * scale}px sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'; // 3% opacity
        ctx.fillText(`${dayOfYear}`, WIDTH / 2, HEIGHT / 2);
    }
    
    const centerX = WIDTH / 2;
    const wordY = 420 * scale;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Dynamic Font Weight Variant
    if (variant === 'font_weight') {
        ctx.font = `900 ${80 * scale}px sans-serif`; // Extra bold
    } else {
        ctx.font = `700 ${80 * scale}px sans-serif`;
    }
    ctx.fillStyle = theme.accent;
    ctx.fillText('RELENTLESS', centerX, wordY);
    
    const dateY = wordY + 80 * scale;
    ctx.font = `500 ${30 * scale}px sans-serif`;
    ctx.fillStyle = theme.text;
    ctx.fillText(`MAY 29  •  149D LEFT  •  59%`, centerX, dateY);
    
    // Lunar Phase Variant
    if (variant === 'lunar') {
        ctx.fillStyle = theme.bg;
        ctx.fillRect(0, dateY - 20, WIDTH, 40); // clear date
        ctx.fillStyle = theme.text;
        ctx.fillText(`MAY 29  •  🌖  •  149D LEFT`, centerX, dateY);
    }
    
    const availableHeightForRings = HEIGHT - dateY - (400 * scale);
    const centerY = dateY + (availableHeightForRings / 2.2);
    const maxRadius = Math.min(450 * scale, availableHeightForRings / 2.5);
    const ringSpacing = maxRadius / 12;
    
    const currentMonth = Math.floor((dayOfYear / totalDays) * 12);
    const currentMonthProgress = ((dayOfYear / totalDays) * 12) - currentMonth;
    
    for(let i=0; i<12; i++) {
        const r = (i + 1) * ringSpacing;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        
        if (i < currentMonth) {
            ctx.strokeStyle = theme.dotFilled;
            ctx.lineWidth = 4 * scale;
        } else if (i === currentMonth) {
            ctx.strokeStyle = theme.dotEmpty;
            ctx.lineWidth = 4 * scale;
            ctx.stroke();
    
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, -Math.PI/2, -Math.PI/2 + (Math.PI * 2 * currentMonthProgress));
            
            // Gradient Variant
            if (variant === 'gradient') {
                const gradient = ctx.createLinearGradient(centerX - r, centerY - r, centerX + r, centerY + r);
                gradient.addColorStop(0, '#a200ff'); // Purple
                gradient.addColorStop(1, '#ff6b4a'); // Orange
                ctx.strokeStyle = gradient;
            } else {
                ctx.strokeStyle = theme.accent;
            }
            ctx.lineWidth = 6 * scale;
        } else {
            ctx.strokeStyle = theme.dotEmpty;
            ctx.lineWidth = 1.5 * scale;
        }
        ctx.stroke();
        
        // Milestone Variant
        if (variant === 'milestone' && i === 8) { // 9th month, e.g. September birthday
            const angle = -Math.PI/2 + (Math.PI * 2 * 0.4); // 40% through month
            const markerX = centerX + r * Math.cos(angle);
            const markerY = centerY + r * Math.sin(angle);
            ctx.beginPath();
            ctx.arc(markerX, markerY, 8 * scale, 0, Math.PI * 2);
            ctx.fillStyle = '#ffd700'; // Gold
            ctx.fill();
            // Glow
            ctx.shadowColor = '#ffd700';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
    
    // Microticks Variant
    if (variant === 'microticks') {
        const outerR = maxRadius + 20 * scale;
        const currentWeek = Math.floor((dayOfYear / totalDays) * 52);
        for(let w=0; w<52; w++) {
            const angle = -Math.PI/2 + (Math.PI * 2 * (w / 52));
            const x = centerX + outerR * Math.cos(angle);
            const y = centerY + outerR * Math.sin(angle);
            ctx.beginPath();
            ctx.arc(x, y, 2.5 * scale, 0, Math.PI * 2);
            ctx.fillStyle = w <= currentWeek ? theme.dotFilled : theme.dotEmpty;
            ctx.fill();
        }
    }
    
    // Life Battery Line
    if (variant === 'battery') {
        const timeProgress = 0.65; // 3:36 PM
        ctx.fillStyle = theme.dotEmpty;
        ctx.fillRect(0, HEIGHT - 5, WIDTH, 5);
        ctx.fillStyle = theme.accent;
        ctx.fillRect(0, HEIGHT - 5, WIDTH * timeProgress, 5);
    }
    
    // Quote Section
    const quoteY1 = centerY + maxRadius + 120 * scale;
    ctx.font = `italic 400 ${36 * scale}px Georgia, serif`;
    ctx.fillStyle = theme.dotFilled;
    ctx.fillText('"Focus on the present."', centerX, quoteY1);
    ctx.font = `500 ${24 * scale}px sans-serif`;
    ctx.fillStyle = theme.text;
    ctx.fillText('— System', centerX, quoteY1 + 50 * scale);
}

const variants = ['watermark', 'milestone', 'gradient', 'microticks', 'lunar', 'battery'];

variants.forEach(variant => {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');
    drawBase(ctx, variant);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, `idea_${variant}.png`), buffer);
    console.log(`Generated: idea_${variant}.png`);
});
