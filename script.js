// script.js
// Configuration (Update annually)
const RAMADAN_START = new Date('2025-02-28');
const EID_DATE = new Date('2025-03-30');
const MOON_PHASES = ['new-moon.png', 'waxing-crescent.png', 'first-quarter.png', 
                    'waxing-gibbous.png', 'full-moon.png', 'waning-gibbous.png', 
                    'last-quarter.png', 'waning-crescent.png'];

// Accurate Moon Phase Calculation
function getMoonPhase(date) {
    // Reference new moon date (example: January 11, 2024 11:57 UTC)
    const refNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57));
    const synodicMonth = 29.53058867; // Length of lunar cycle in days
    
    // Calculate days since reference new moon
    const diffDays = (date - refNewMoon) / (1000 * 60 * 60 * 24);
    const moonAge = (diffDays % synodicMonth + synodicMonth) % synodicMonth;
    
    // Determine phase index (0-7)
    return Math.floor(moonAge / (synodicMonth / 8));
}

// Scroll Handling with Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Date Calculations
function updateDisplay() {
    const now = new Date();
    const answerContent = document.getElementById('answer-content');
    
    if (now >= EID_DATE) {
        answerContent.innerHTML = `
            <h2>YES! 🎉</h2>
            <img src="eid-animation.gif" class="eid-animation" alt="Eid Mubarak">
        `;
    } else if (now >= RAMADAN_START) {
        const ramadanDay = Math.ceil((now - RAMADAN_START) / (1000 * 60 * 60 * 24));
        answerContent.innerHTML = `
            <h2>No 😔</h2>
            <p>Today is day ${ramadanDay} of Ramadan</p>
        `;
    } else {
        const daysToRamadan = Math.ceil((RAMADAN_START - now) / (1000 * 60 * 60 * 24));
        answerContent.innerHTML = `
            <h2>Nope</h2>
            <p>${daysToRamadan} days until Ramadan</p>
        `;
    }

    // Update moon phase
    const phaseIndex = getMoonPhase(now);
    document.getElementById('moon-phase').innerHTML = `
        <img src="${MOON_PHASES[phaseIndex]}" alt="Moon Phase">
        <p>Current Moon: ${MOON_PHASES[phaseIndex].split('.')[0].replace('-', ' ')}</p>
    `;
}

// Initial setup
setInterval(updateDisplay, 3600000); // Update hourly
updateDisplay();
