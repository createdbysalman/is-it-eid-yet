// script.js
// Configuration
const RAMADAN_START = new Date('2025-02-28');
const EID_DATE = new Date('2025-03-30');
const MOON_PHASES = [
    'new-moon.png',          // 0
    'waxing-crescent-1.png', // 1
    'waxing-crescent-2.png', // 2
    'first-quarter.png',     // 3
    'waxing-gibbous-1.png',  // 4
    'waxing-gibbous-2.png',  // 5
    'full-moon.png',         // 6
    'waning-gibbous-1.png',  // 7
    'waning-gibbous-2.png',  // 8
    'last-quarter.png',      // 9
    'waning-crescent-1.png', // 10
    'waning-crescent-2.png'  // 11
];

// Accurate Moon Phase Calculation
function getMoonPhase(date) {
    const refNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57));
    const synodicMonth = 29.53058867;
    const diffDays = (date - refNewMoon) / (1000 * 60 * 60 * 24);
    const moonAge = (diffDays % synodicMonth + synodicMonth) % synodicMonth;
    return Math.floor(moonAge / (synodicMonth / 12)) % 12;
}

// Scroll Handling
let currentSection = 0;
let isScrolling = false;

window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    isScrolling = true;
    
    const direction = e.deltaY > 0 ? 1 : -1;
    currentSection = Math.min(Math.max(currentSection + direction, 0), 2);
    
    window.scrollTo({
        top: currentSection * window.innerHeight,
        behavior: 'smooth'
    });
    
    setTimeout(() => { isScrolling = false; }, 800);
});

// Date Calculations
function updateDisplay() {
    const now = new Date();
    const answerContent = document.getElementById('answer-content');
    
    if (now >= EID_DATE) {
        answerContent.innerHTML = `<img src="eid-animation.gif" class="eid-animation" alt="Eid Mubarak">`;
    } else if (now >= RAMADAN_START) {
        const ramadanDay = Math.ceil((now - RAMADAN_START) / (1000 * 60 * 60 * 24));
        answerContent.innerHTML = `${ramadanDay}`;
    } else {
        const daysToRamadan = Math.ceil((RAMADAN_START - now) / (1000 * 60 * 60 * 24));
        answerContent.innerHTML = `${daysToRamadan}`;
    }

    // Update moon phase
    const phaseIndex = getMoonPhase(now);
    document.getElementById('moon-phase').innerHTML = `<img src="${MOON_PHASES[phaseIndex]}" alt="Moon Phase">`;
}

// Initial setup
setInterval(updateDisplay, 3600000); // Update hourly
updateDisplay();
