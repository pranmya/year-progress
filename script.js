document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('wallpaper-canvas');
    const ctx = canvas.getContext('2d');

    // Config
    const WIDTH = 1080;
    const HEIGHT = 1920;

    // Theme Config (Minimal)
    const theme = {
        bg: '#121212',
        dotFilled: '#ffffff',
        dotEmpty: '#262626',
        dotToday: '#ff6b4a',
        text: '#666666',
        accent: '#ff6b4a'
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
        const MARGIN = 100;
        const GAP = 20;

        // 1. Fill Background
        ctx.fillStyle = theme.bg;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // 2. Date Calc
        const now = new Date();
        const year = now.getFullYear();
        const dayOfYear = getDayOfYear(now);
        const totalDays = 365;
        const daysLeft = totalDays - dayOfYear;
        const progressPercent = Math.floor((dayOfYear / totalDays) * 100);

        // 3. Draw Grid
        const cols = 15;
        const gridWidth = WIDTH - (MARGIN * 2);
        const dotSize = (gridWidth - ((cols - 1) * GAP)) / cols;
        const radius = dotSize / 2;

        const totalRows = Math.ceil(totalDays / cols);
        const gridHeight = (totalRows * dotSize) + ((totalRows - 1) * GAP);

        // Center Grid Vertically
        let xStart = MARGIN + radius;
        let yStart = (HEIGHT - gridHeight) / 2;

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
                ctx.fillStyle = theme.dotToday;
                ctx.fill();
            } else {
                // Future
                ctx.fillStyle = theme.dotEmpty;
                ctx.fill();
            }
        }

        // 4. Draw Bottom Text
        ctx.textAlign = 'center';
        ctx.font = '500 40px sans-serif';

        const textY = yStart + gridHeight + 100;

        const part1 = `${daysLeft}d left`;
        const part2 = `  •  ${progressPercent}%`;

        const w1 = ctx.measureText(part1).width;
        const w2 = ctx.measureText(part2).width;
        const totalW = w1 + w2;

        let currentX = (WIDTH / 2) - (totalW / 2);

        // Part 1 (Orange)
        ctx.fillStyle = theme.accent;
        ctx.textAlign = 'left';
        ctx.fillText(part1, currentX, textY);

        // Part 2 (Grey)
        ctx.fillStyle = theme.text;
        ctx.fillText(part2, currentX + w1, textY);
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

    // Init
    drawWallpaper();
    updateLink();

    // Auto-refresh at midnight
    let lastDay = new Date().getDate();
    setInterval(() => {
        const currentDay = new Date().getDate();
        if (currentDay !== lastDay) {
            lastDay = currentDay;
            console.log('Date changed, updating wallpaper...');
            drawWallpaper();
        }
    }, 60000);
});
