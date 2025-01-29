// script.js
// Configuration
const RAMADAN_START = new Date('2025-02-28');
const EID_DATE = new Date('2025-03-30');

// Moon phase images (12 phases)
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

// Update Section 2 Answer
function updateAnswer() {
    const now = new Date();
    const answerContent = document.getElementById('answer-content');

    if (now >= EID_DATE) {
        // Eid has arrived!
        answerContent.innerHTML = `
            <img src="eid-animation.gif" class="eid-animation" alt="Eid Mubarak">
        `;
    } else if (now >= RAMADAN_START) {
        // It's Ramadan but not Eid
        const ramadanDay = Math.ceil((now - RAMADAN_START) / (1000 * 60 * 60 * 24));
        answerContent.innerHTML = `
            <h1>Come on, it's only day ${ramadanDay} of Ramadan.</h1>
        `;
    } else {
        // Not Ramadan yet
        const daysToRamadan = Math.ceil((RAMADAN_START - now) / (1000 * 60 * 60 * 24));
        answerContent.innerHTML = `
            <h1>Have some sabr, Ramadan starts in ${daysToRamadan} days.</h1>
        `;
    }
}

// Moon Phase Calculation
function updateMoonPhase() {
    const now = new Date();
    const refNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57)); // Reference new moon
    const synodicMonth = 29.53058867; // Lunar cycle length
    const diffDays = (now - refNewMoon) / (1000 * 60 * 60 * 24);
    const moonAge = (diffDays % synodicMonth + synodicMonth) % synodicMonth;
    const phaseIndex = Math.floor(moonAge / (synodicMonth / 12)) % 12;

    document.getElementById('moon-phase').innerHTML = `
        <img src="${MOON_PHASES[phaseIndex]}" alt="Moon Phase">
    `;
}

// Initial setup
setInterval(() => {
    updateAnswer();
    updateMoonPhase();
}, 3600000); // Update hourly
updateAnswer();
updateMoonPhase();
