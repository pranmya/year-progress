document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('wallpaper-canvas');
    const ctx = canvas.getContext('2d');

    // Config
    const WIDTH = 1080;
    const HEIGHT = 1920;

    // Theme Config (Minimal / User Requested)
    const theme = {
        bg: '#121212',        // Very dark grey
        dotFilled: '#ffffff', // Past days: White
        dotEmpty: '#262626',  // Future days: Dark Grey
        dotToday: '#ff6b4a',  // Today: Orange/Coral
        text: '#666666',      // Text: Grey
        accent: '#ff6b4a'     // Accent text: Orange
    };

    // Setup Canvas
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    function getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    function drawWallpaper() {
        const scale = 1;
        
        // 1. Fill Background
        ctx.fillStyle = theme.bg;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // 2. Date Calc
        const now = new Date();
        const year = now.getFullYear();
        const dayOfYear = getDayOfYear(now);
        const totalDays = (year % 4 === 0) ? 366 : 365;
        const daysLeft = totalDays - dayOfYear;
        const progressPercent = Math.round((dayOfYear / totalDays) * 100);

        // Pick Word & Quote
        // Using window.WORDS and window.QUOTES loaded from data.js
        const wordsArr = window.WORDS || ["RELENTLESS"];
        const quotesArr = window.QUOTES || [{text: "Fallback quote.", author: "System"}];
        
        const wordIndex = (dayOfYear - 1) % wordsArr.length;
        const word = wordsArr[wordIndex].toUpperCase();

        const quoteIndex = Math.floor((dayOfYear - 1) / 2) % quotesArr.length;
        const quoteObj = quotesArr[quoteIndex];
        const quoteText = quoteObj.text;
        const authorText = `— ${quoteObj.author}`;

        const dateString = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}  •  ${daysLeft}D LEFT  •  ${progressPercent}%`;

        // Layout Parameters
        const centerX = WIDTH / 2;

        // 1. Top Section: Word
        const wordY = 420 * scale; // Moved down from 350
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Dynamic Font Size for Word
        let wordFontSize = 80 * scale;
        ctx.font = `700 ${wordFontSize}px sans-serif`;
        while (ctx.measureText(word).width > WIDTH - (100 * scale) && wordFontSize > 40 * scale) {
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

        // 3. Rings of Time
        const availableHeightForRings = HEIGHT - dateY - (400 * scale); // 400px reserved for quote
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
                // Gradient of Time
                const gradient = ctx.createLinearGradient(centerX - r, centerY - r, centerX + r, centerY + r);
                gradient.addColorStop(0, '#a200ff'); // Purple
                gradient.addColorStop(1, '#ff6b4a'); // Orange
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 6 * scale;
            } else {
                ctx.strokeStyle = theme.dotEmpty;
                ctx.lineWidth = 1.5 * scale;
            }
            ctx.stroke();
        }

        // 3.5 Micro-Ticks for 52 Weeks
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
        
        // Quote Word Wrapping
        ctx.font = `italic 400 ${36 * scale}px Georgia, serif`;
        const qWords = quoteText.split(' ');
        let line = '"';
        let lines = [];
        const maxQuoteWidth = WIDTH - (120 * scale);
        
        for (let n = 0; n < qWords.length; n++) {
            const testLine = line + qWords[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxQuoteWidth && n > 0) {
                lines.push(line.trim());
                line = qWords[n] + ' ';
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
    }

    // --- UI Logic ---
    const resolutionSelect = document.getElementById('resolution-select');
    const generatedLinkInput = document.getElementById('generated-link');
    const copyBtn = document.getElementById('copy-btn');
    const guideBtn = document.getElementById('toggle-guide-btn');
    const guideModal = document.getElementById('guide-modal');
    const closeModal = document.getElementById('close-modal');

    // Base Repo URL
    const BASE_URL = 'https://raw.githubusercontent.com/pranmya/year-progress/main/';

    function updateLink() {
        const res = resolutionSelect.value;
        let filename = 'wallpaper.png';

        if (res !== 'default') {
            const resMap = {
                's24u': '1440x3120',
                'nz8p': '1344x2992',
                'i15pm': '1290x2796',
                'i15': '1179x2556',
                's24': '1080x2340',
                'fhdplus': '1080x2400',
                'op12': '1440x3216',
                'x1v': '1644x3840',
                'hd': '720x1280',
                'fold': '2200x2480'
            };

            if (resMap[res]) {
                filename = `wallpaper-${resMap[res]}.png`;
            }
        }

        generatedLinkInput.value = BASE_URL + filename;
    }

    resolutionSelect.addEventListener('change', updateLink);

    copyBtn.addEventListener('click', () => {
        generatedLinkInput.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy', 2000);
    });

    // Guide Modal
    guideBtn.addEventListener('click', () => guideModal.classList.remove('hidden'));
    closeModal.addEventListener('click', () => guideModal.classList.add('hidden'));
    window.addEventListener('click', (e) => {
        if (e.target === guideModal) guideModal.classList.add('hidden');
    });

    // Theme toggle Logic
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selected = btn.getAttribute('data-set-theme');
            if (selected === 'dark') {
                theme.bg = '#121212';
                theme.dotFilled = '#ffffff';
                theme.dotEmpty = '#262626';
                theme.accent = '#ff6b4a';
                theme.text = '#666666';
            } else if (selected === 'light') {
                theme.bg = '#f4f4f4';
                theme.dotFilled = '#111111';
                theme.dotEmpty = '#dddddd';
                theme.accent = '#ff6b4a';
                theme.text = '#666666';
            } else if (selected === 'cyberpunk') {
                theme.bg = '#0d0221';
                theme.dotFilled = '#00ffcc';
                theme.dotEmpty = '#261b40';
                theme.accent = '#ff007f';
                theme.text = '#888888';
            }
            drawWallpaper();
        });
    });

    // Init
    // Ensure data.js is loaded
    if (window.WORDS && window.QUOTES) {
        drawWallpaper();
    } else {
        // Retry shortly if script hasn't fully loaded
        setTimeout(drawWallpaper, 100);
    }
    updateLink();

    // Auto-refresh: Live Clock (1 second)
    let lastDay = new Date().getDate();
    setInterval(() => {
        const now = new Date();
        const currentDay = now.getDate();

        // If date changed, redraw everything
        if (currentDay !== lastDay) {
            lastDay = currentDay;
            console.log('Date changed, updating wallpaper...');
            drawWallpaper();
        }
    }, 1000);
});
