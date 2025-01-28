// script.js
// Configuration (Update annually)
const RAMADAN_START = new Date('2025-02-28');
const EID_DATE = new Date('2025-03-30');
const MOON_PHASES = ['moon-phase-0.png', 'moon-phase-1.png', ..., 'moon-phase-7.png'];

// Section Management
const sections = document.querySelectorAll('.section');
let currentSection = 0;

function updateSections() {
    sections.forEach((section, index) => {
        section.classList.remove('active', 'inactive-above');
        if (index === currentSection) {
            section.classList.add('active');
        } else if (index < currentSection) {
            section.classList.add('inactive-above');
        }
    });
}

// Scroll Handling
let isScrolling = false;
window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    isScrolling = true;
    
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection++;
    } else if (e.deltaY < 0 && currentSection > 0) {
        currentSection--;
    }
    
    updateSections();
    setTimeout(() => { isScrolling = false; }, 1000);
}, { passive: true });

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
setInterval(updateDisplay, 86400000);
updateDisplay();
updateSections();
