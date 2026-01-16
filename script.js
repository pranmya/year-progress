document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('wallpaper-canvas');
    const ctx = canvas.getContext('2d');

    // Config
    const WIDTH = 1080;  // Standard Android Portrait Width
    const HEIGHT = 1920; // Standard Android Portrait Height
    const MARGIN = 100;
    const COLS = 19;     // 19 cols * 20 rows approx = ~380 slots (enough for 365)

    // Theme Configs
    const themes = {
        dark: {
            bg: '#0a0a0a',
            dotEmpty: '#2a2a2a',
            dotFilled: '#e0e0e0',
            dotGlow: '#00f0ff',
            text: '#e0e0e0',
            highlight: '#ffffff'
        },
        light: {
            bg: '#f4f4f4',
            dotEmpty: '#d1d1d1',
            dotFilled: '#333333',
            dotGlow: '#ff4757',
            text: '#333333',
            highlight: '#000000'
        },
        cyberpunk: {
            bg: '#0d0221',
            dotEmpty: '#261447',
            dotFilled: '#ff00ff',
            dotGlow: '#00f0ff',
            text: '#00f0ff',
            highlight: '#ffe100'
        }
    };

    let currentTheme = 'dark';

    // Setup Canvas Resolution
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    function getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    function drawWallpaper() {
        const theme = themes[currentTheme];

        // 1. Fill Background
        ctx.fillStyle = theme.bg;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // 2. Date Calc
        const now = new Date();
        const year = now.getFullYear();
        const dayOfYear = getDayOfYear(now);
        const totalDays = 365; // Keeping simple for wallpaper

        // 3. Draw Header Text
        ctx.textAlign = 'center';

        // Year
        ctx.font = 'bold 120px Inter, sans-serif';
        ctx.fillStyle = theme.highlight;
        ctx.fillText(year, WIDTH / 2, 250);

        // Day Counter
        ctx.font = '40px Inter, sans-serif';
        ctx.fillStyle = theme.text;
        ctx.fillText(`Day ${dayOfYear} of ${totalDays}`, WIDTH / 2, 320);

        // 4. Draw Grid
        const gridWidth = WIDTH - (MARGIN * 2);
        // Calculate dot size
        const gap = 15;
        // width = (cols * size) + ((cols - 1) * gap)
        // size = (width - ((cols-1)*gap)) / cols
        const dotSize = (gridWidth - ((COLS - 1) * gap)) / COLS;
        const radius = dotSize / 2;

        let xStart = MARGIN + radius;
        let yStart = 450;

        for (let i = 1; i <= totalDays; i++) {
            // Calculate grid position
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
                ctx.shadowBlur = 0;
            } else if (i === dayOfYear) {
                // Today
                ctx.fillStyle = theme.dotGlow;
                ctx.shadowColor = theme.dotGlow;
                ctx.shadowBlur = 40;
                ctx.fill();
                // Reset shadow for next ops
                ctx.shadowBlur = 0;

                // Add an extra ring for "today"
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
    }

    // --- Theme Logic ---
    function initTheme() {
        const savedTheme = localStorage.getItem('year-progress-theme') || 'dark';
        setTheme(savedTheme);
    }

    function setTheme(themeName) {
        currentTheme = themeName;
        document.body.setAttribute('data-theme', themeName);
        localStorage.setItem('year-progress-theme', themeName);

        // Update Buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            if (btn.dataset.setTheme === themeName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Redraw Canvas
        drawWallpaper();
    }

    // --- UI Logic ---
    const resolutionSelect = document.getElementById('resolution-select');
    const generatedLinkInput = document.getElementById('generated-link');
    const copyBtn = document.getElementById('copy-btn');
    const guideBtn = document.getElementById('toggle-guide-btn');
    const guideModal = document.getElementById('guide-modal');
    const closeModal = document.getElementById('close-modal');

    // Base Repo URL (Adjust user if needed, but this uses the current one)
    const BASE_URL = 'https://raw.githubusercontent.com/pranmya/year-progress/main/';

    function updateLink() {
        const res = resolutionSelect.value;
        let filename = 'wallpaper.png';

        if (res !== 'default') {
            const selectedOpt = resolutionSelect.options[resolutionSelect.selectedIndex];
            // Format: "Samsung S24 Ultra (1440x3120)"
            // Use ID map from option value to construct filename
            // Map matches generate-wallpaper.js IDs
            const resMap = {
                's24u': '1440x3120',
                'nz8p': '1344x2992',
                'i15pm': '1290x2796',
                'i15': '1179x2556',
                's24': '1080x2340',
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
        document.execCommand('copy'); // Legacy but reliable
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy', 2000);
    });

    // Guide Modal
    guideBtn.addEventListener('click', () => guideModal.classList.remove('hidden'));
    closeModal.addEventListener('click', () => guideModal.classList.add('hidden'));
    window.addEventListener('click', (e) => {
        if (e.target === guideModal) guideModal.classList.add('hidden');
    });

    // Theme Buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', (e) => setTheme(e.target.dataset.setTheme));
    });

    // Init
    initTheme();
    updateLink(); // Set initial link
});
