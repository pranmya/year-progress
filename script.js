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

        // --- LAYOUT: TEXT AT TOP, GRID BELOW ---
        ctx.textAlign = 'center';

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
        const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toUpperCase();

        // 1. Draw Text (Top)
        const topPadding = 320;

        ctx.font = '700 80px sans-serif';
        ctx.fillStyle = theme.accent;
        ctx.fillText(quote, WIDTH / 2, topPadding);

        const timeY = topPadding + 70;
        ctx.font = '600 50px sans-serif';
        ctx.fillStyle = '#bbbbbb';
        ctx.fillText(timeString, WIDTH / 2, timeY);

        const statsY = timeY + 50;
        ctx.font = '500 30px sans-serif';
        ctx.fillStyle = theme.text;
        ctx.fillText(`${dateString}  •  ${daysLeft}D LEFT  •  ${progressPercent}%`, WIDTH / 2, statsY);

        // 2. Draw Grid (Below Text)
        const gridStartY = statsY + 80;

        const cols = 15;
        const gridWidth = WIDTH - (MARGIN * 2);
        const dotSize = (gridWidth - ((cols - 1) * GAP)) / cols;
        const radius = dotSize / 2;

        let xStart = MARGIN + radius;
        let yStart = gridStartY;

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

    // Auto-refresh: Live Clock (1 second)
    let lastDay = new Date().getDate();
    setInterval(() => {
        const now = new Date();
        const currentDay = now.getDate();

        // If date changed, redraw everything (new dot)
        if (currentDay !== lastDay) {
            lastDay = currentDay;
            console.log('Date changed, updating wallpaper...');
            drawWallpaper();
        }
        // If just time changed, redraw to update clock
        else {
            drawWallpaper();
        }
    }, 1000);
});
