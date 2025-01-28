// script.js
// CONFIGURATION (UPDATE THESE DATES YEARLY)
const RAMADAN_START = new Date('2025-02-28');
const EID_DATE = new Date('2025-03-30'); // Example Eid date

// Moon phase images (update with your uploaded filenames)
const MOON_PHASES = [
    'moon-phase-0.png',
    'moon-phase-1.png',
    'moon-phase-2.png',
    'moon-phase-3.png',
    'moon-phase-4.png',
    'moon-phase-5.png',
    'moon-phase-6.png',
    'moon-phase-7.png'
];

// Scroll Handling
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const title = document.querySelector('.title-screen');
    const answer = document.querySelector('.answer-screen');
    const moon = document.querySelector('.moon-background');

    // Vertical scroll detection
    if (scrollY > lastScroll) { // Scrolling down
        title.style.opacity = Math.max(1 - scrollY/50, 0);
        answer.style.opacity = Math.min((scrollY - 50)/100, 1);
        moon.style.opacity = Math.min((scrollY - 150)/100, 1);
    } else { // Scrolling up
        title.style.opacity = Math.min(1, (50 - scrollY)/50);
        answer.style.opacity = Math.min(1, (150 - scrollY)/100);
        moon.style.opacity = Math.min(1, (250 - scrollY)/100);
    }
    lastScroll = scrollY;
});

// Date Calculations
function updateDisplay() {
    const today = new Date();
    const answerContent = document.getElementById('answer-content');
    
    if (today >= EID_DATE) {
        answerContent.innerHTML = `
            <h2>YES! 🎉</h2>
            <img src="eid-animation.gif" class="eid-animation" alt="Eid Mubarak">
        `;
    } else if (today >= RAMADAN_START) {
        const ramadanDay = Math.ceil((today - RAMADAN_START) / (1000 * 60 * 60 * 24));
        answerContent.innerHTML = `
            <h2>No 😔</h2>
            <p>Today is day ${ramadanDay} of Ramadan</p>
        `;
    } else {
        const daysToRamadan = Math.ceil((RAMADAN_START - today) / (1000 * 60 * 60 * 24));
        answerContent.innerHTML = `
            <h2>Nope</h2>
            <p>${daysToRamadan} days until Ramadan</p>
        `;
    }

    // Moon phase calculation
    const daysUntilEid = Math.ceil((EID_DATE - today) / (1000 * 60 * 60 * 24));
    const moonIndex = Math.floor((daysUntilEid % 29.53) / (29.53 / 8)) % 8;
    document.getElementById('moon-phase').innerHTML = `
        <img src="${MOON_PHASES[moonIndex]}" alt="Moon Phase">
    `;
}

// Initial setup
setInterval(updateDisplay, 86400000); // Update daily
updateDisplay();
