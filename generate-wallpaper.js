const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const { WORDS, QUOTES } = require('./data.js');

// Current Date Calculation
const now = new Date();
const start = new Date(now.getFullYear(), 0, 0);
const diff = now - start;
const oneDay = 1000 * 60 * 60 * 24;
const dayOfYear = Math.floor(diff / oneDay);
const totalDays = (now.getFullYear() % 4 === 0) ? 366 : 365;
const daysLeft = totalDays - dayOfYear;
const progressPercent = Math.round((dayOfYear / totalDays) * 100);

const dateString = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}  •  ${daysLeft}D LEFT  •  ${progressPercent}%`;

// Pick Word & Quote
const wordIndex = (dayOfYear - 1) % WORDS.length;
const word = WORDS[wordIndex].toUpperCase();

// Each quote lasts 2 days
const quoteIndex = Math.floor((dayOfYear - 1) / 2) % QUOTES.length;
const quoteObj = QUOTES[quoteIndex];
const quoteText = quoteObj.text;
const authorText = `— ${quoteObj.author}`;

const theme = {
    bg: '#121212',
    text: '#666666',
    accent: '#ff6b4a',
    dotFilled: '#ffffff',
    dotEmpty: '#262626'
};

const RESOLUTIONS = [
    { name: 'default', width: 1080, height: 2340 },
    { name: '1440x3120', width: 1440, height: 3120 },
    { name: '1344x2992', width: 1344, height: 2992 },
    { name: '1290x2796', width: 1290, height: 2796 },
    { name: '1179x2556', width: 1179, height: 2556 },
    { name: '1080x2340', width: 1080, height: 2340 },
    { name: '1080x2400', width: 1080, height: 2400 },
    { name: '1440x3216', width: 1440, height: 3216 },
    { name: '1644x3840', width: 1644, height: 3840 },
    { name: '720x1280', width: 720, height: 1280 },
    { name: '2200x2480', width: 2200, height: 2480 }
];

RESOLUTIONS.forEach(res => {
    const { width, height, name } = res;
    const scale = width / 1080;
    
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);
    
    const centerX = width / 2;
    
    // 1. Top Section: Word
    const wordY = 350 * scale;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Dynamic Font Size for Word (in case it's long)
    let wordFontSize = 80 * scale;
    ctx.font = `700 ${wordFontSize}px sans-serif`;
    while (ctx.measureText(word).width > width - (100 * scale) && wordFontSize > 40 * scale) {
        wordFontSize -= 2 * scale;
        ctx.font = `700 ${wordFontSize}px sans-serif`;
    }
    
    ctx.fillStyle = theme.accent;
    ctx.fillText(word, centerX, wordY);
    
    // 2. Date String
    const dateY = wordY + 80 * scale;
    ctx.font = `500 ${30 * scale}px sans-serif`;
    ctx.fillStyle = theme.text;
    ctx.fillText(dateString, centerX, dateY);
    
    // 3. Rings
    // We want the rings to be centered between the Date String and the Quote section.
    const availableHeightForRings = height - dateY - (400 * scale); // 400px reserved for quote
    const centerY = dateY + (availableHeightForRings / 2.2); // slightly above exact center
    
    const maxRadius = Math.min(450 * scale, availableHeightForRings / 2.5); // Ensure it fits
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
            ctx.strokeStyle = theme.accent;
            ctx.lineWidth = 6 * scale;
        } else {
            ctx.strokeStyle = theme.dotEmpty;
            ctx.lineWidth = 1.5 * scale;
        }
        ctx.stroke();
    }
    
    // 4. Quote Section
    const quoteY1 = centerY + maxRadius + 120 * scale;
    
    // Quote Word Wrapping
    ctx.font = `italic 400 ${36 * scale}px Georgia, serif`;
    const wordsArr = quoteText.split(' ');
    let line = '"';
    let lines = [];
    const maxQuoteWidth = width - (120 * scale);
    
    for (let n = 0; n < wordsArr.length; n++) {
        const testLine = line + wordsArr[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxQuoteWidth && n > 0) {
            lines.push(line.trim());
            line = wordsArr[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line.trim() + '"');
    
    ctx.fillStyle = theme.dotFilled;
    let currentQuoteY = quoteY1;
    lines.forEach(l => {
        ctx.fillText(l, centerX, currentQuoteY);
        currentQuoteY += 50 * scale;
    });
    
    // Author
    const authorY = currentQuoteY + 30 * scale;
    ctx.font = `500 ${24 * scale}px sans-serif`;
    ctx.fillStyle = theme.text;
    ctx.fillText(authorText, centerX, authorY);
    
    // Output File
    const fileName = name === 'default' ? 'wallpaper.png' : `wallpaper-${name}.png`;
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, fileName), buffer);
    console.log(`Generated: ${fileName} (${width}x${height})`);
});
