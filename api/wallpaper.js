const { createCanvas, registerFont } = require('canvas');
const path = require('path');
const { WORDS, QUOTES } = require('../data.js');

try {
    registerFont(path.join(__dirname, '..', 'fonts', 'CourierPrime-Bold.ttf'), { family: 'Courier Prime', weight: 'bold' });
    registerFont(path.join(__dirname, '..', 'fonts', 'Outfit.ttf'), { family: 'Outfit', weight: 'normal' });
    registerFont(path.join(__dirname, '..', 'fonts', 'Outfit-Medium.ttf'), { family: 'OutfitMedium' });
    registerFont(path.join(__dirname, '..', 'fonts', 'Outfit-Bold.ttf'), { family: 'Outfit', weight: 'bold' });
    registerFont(path.join(__dirname, '..', 'fonts', 'Lora-Italic.ttf'), { family: 'Lora', style: 'italic' });
} catch (e) {
    console.log("Could not load local fonts", e);
}

module.exports = async function (req, res) {
    try {
        // Allow dynamic width and height from the URL (e.g., ?w=1080&h=2400)
        // Default to our Universal High-Res Canvas (2160x4800) if none provided
        let width = parseInt(req.query.w || req.query.width || 2160);
        let height = parseInt(req.query.h || req.query.height || 4800);
        
        // Safety bounds to prevent memory overflow
        width = Math.min(Math.max(width, 720), 4000);
        height = Math.min(Math.max(height, 1280), 8000);

        const scale = width / 1080;
        
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const theme = {
            bg: '#121212',
            dotFilled: '#ffffff',
            dotEmpty: '#3a3a3a', // Brightened from #262626
            dotToday: '#ff6b4a',
            text: '#999999',     // Brightened from #666666
            accent: '#ff6b4a'
        };

        // Current Date Calculation (Shifted to IST: UTC + 5:30)
        const nowUtc = new Date();
        const now = new Date(nowUtc.getTime() + (5.5 * 60 * 60 * 1000));
        
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        const totalDays = (now.getFullYear() % 4 === 0) ? 366 : 365;
        const daysLeft = totalDays - dayOfYear;
        const progressPercent = Math.round((dayOfYear / totalDays) * 100);

        const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
        const dateString = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}  •  ${dayOfWeek}  •  ${daysLeft}D LEFT  •  ${progressPercent}%`;

        // Pick Word & Quote
        const wordIndex = (dayOfYear - 1) % WORDS.length;
        const word = WORDS[wordIndex].toUpperCase();

        const quoteIndex = Math.floor((dayOfYear - 1) / 2) % QUOTES.length;
        const quoteObj = QUOTES[quoteIndex];
        const quoteText = quoteObj.text;
        const authorText = `— ${quoteObj.author}`;

        // --- DRAWING LOGIC ---
        ctx.fillStyle = theme.bg;
        ctx.fillRect(0, 0, width, height);
        
        const centerX = width / 2;
        
        // 1. Top Section: Word
        const wordY = 420 * scale; 
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        let wordFontSize = 80 * scale;
        ctx.font = `bold ${wordFontSize}px "Courier Prime", monospace`;
        while (ctx.measureText(word).width > width - (100 * scale) && wordFontSize > 40 * scale) {
            wordFontSize -= 2 * scale;
            ctx.font = `bold ${wordFontSize}px "Courier Prime", monospace`;
        }
        
        ctx.fillStyle = theme.accent;
        ctx.fillText(word, centerX, wordY);
        
        // 2. Date String
        const dateY = wordY + 80 * scale;
        ctx.font = `normal ${34 * scale}px "OutfitMedium", sans-serif`;
        ctx.fillStyle = '#aaaaaa'; // Reverted from white to a legible light grey
        ctx.fillText(dateString, centerX, dateY);
        
        // 3. Rings
        const availableHeightForRings = height - dateY - (400 * scale); 
        const centerY = dateY + (availableHeightForRings / 2.2); 
        
        const maxRadius = Math.min(410 * scale, availableHeightForRings / 2.7); 
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
                const gradient = ctx.createLinearGradient(centerX - r, centerY - r, centerX + r, centerY + r);
                gradient.addColorStop(0, '#a200ff');
                gradient.addColorStop(1, '#ff6b4a');
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 6 * scale;
            } else {
                ctx.strokeStyle = theme.dotEmpty;
                ctx.lineWidth = 1.5 * scale;
            }
            ctx.stroke();
        }
        
        // 3.5 Micro-Ticks
        const outerR = maxRadius + 25 * scale;
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
        
        // 4. Quote Section
        const quoteY1 = centerY + maxRadius + 120 * scale;
        ctx.font = `italic 400 ${36 * scale}px "Lora", serif`;
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
        ctx.font = `normal ${34 * scale}px "OutfitMedium", sans-serif`;
        ctx.fillStyle = theme.accent;
        ctx.fillText(authorText, centerX, authorY);
        
        // --- SEND RESPONSE ---
        // Instead of writing to fs, we send the buffer directly as a web response!
        const buffer = canvas.toBuffer('image/png');
        
        // Set caching headers so Vercel caches it for 1 hour at the Edge Network
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error while generating wallpaper');
    }
};
