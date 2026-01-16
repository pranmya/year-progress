document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const yearTitle = document.getElementById('year-title');
    const currentDayNumSpan = document.getElementById('current-day-num');
    const totalDays = 365; // Fixed as per requirements

    // Function to calculate Day of Year
    function getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    // Initialize Grid
    function initGrid() {
        gridContainer.innerHTML = '';
        for (let i = 1; i <= totalDays; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.id = `day-${i}`;
            // Stagger animation slightly for cool effect on load
            dot.style.animationDelay = `${i * 2}ms`;
            gridContainer.appendChild(dot);
        }
    }

    // Update State
    function updateProgress() {
        const now = new Date();
        const year = now.getFullYear();
        const dayOfYear = getDayOfYear(now);

        yearTitle.textContent = year;
        currentDayNumSpan.textContent = dayOfYear;

        // Loop through all dots and update classes
        for (let i = 1; i <= totalDays; i++) {
            const dot = document.getElementById(`day-${i}`);
            if (!dot) continue;

            // Reset classes
            dot.className = 'dot';

            if (i < dayOfYear) {
                dot.classList.add('filled');
            } else if (i === dayOfYear) {
                dot.classList.add('today');
            }
        }
    }

    // Theme Logic
    function initTheme() {
        const savedTheme = localStorage.getItem('year-progress-theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        updateActiveButton(savedTheme);
    }

    function setTheme(themeName) {
        document.body.setAttribute('data-theme', themeName);
        localStorage.setItem('year-progress-theme', themeName);
        updateActiveButton(themeName);
    }

    function updateActiveButton(themeName) {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            if (btn.dataset.setTheme === themeName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Event Listeners for Theme Buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        if (btn.id === 'help-btn') return; // Skip help button here

        btn.addEventListener('click', (e) => {
            const theme = e.target.dataset.setTheme;
            setTheme(theme);
        });
    });

    // Modal Logic
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const closeModal = document.getElementById('close-modal');

    helpBtn.addEventListener('click', () => {
        helpModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        helpModal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === helpModal) {
            helpModal.classList.add('hidden');
        }
    });

    // Initial setup
    initGrid();
    initTheme(); // Load theme
    updateProgress();

    // Check for updates every minute
    setInterval(updateProgress, 60000);

    // Also update when tab becomes visible again (in case day changed while sleeping)
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            updateProgress();
        }
    });
});
