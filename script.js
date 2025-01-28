// script.js
// Configuration (Update these annually)
const RAMADAN_START = new Date('2024-03-11');
const EID_DATE = new Date('2024-04-10');

// Scroll Detection
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const answerScreen = document.querySelector('.answer-screen');
    const moonBackground = document.querySelector('.moon-background');
    
    // Reveal answer after 100px scroll
    answerScreen.style.opacity = Math.min(scrollY / 100, 1);
    
    // Reveal moon background after 200px scroll
    moonBackground.style.opacity = Math.min((scrollY - 200) / 100, 1);
});

// Daily Updates
function updateDisplay() {
    const today = new Date();
    const answerContent = document.getElementById('answer-content');
    
    if (today >= EID_DATE) {
        // Eid has arrived!
        answerContent.innerHTML = `
            <h2>YES! 🎉</h2>
            <img src="eid-animation.gif" class="eid-animation" alt="Eid Mubarak">
        `;
    } else {
        // Ramadan day counter
        const ramadanDay = Math.ceil((today - RAMADAN_START) / (1000 * 60 * 60 * 24));
        answerContent.innerHTML = `
            <h2>No 😔</h2>
            <p>Today is day ${ramadanDay} of Ramadan</p>
        `;
    }
    
    // Moon phase calculation (same as before)
    const daysUntilEid = Math.ceil((EID_DATE - today) / (1000 * 60 * 60 * 24));
    const moonIndex = Math.floor((daysUntilEid % 29.53) / (29.53 / 8));
    document.getElementById('moon-phase').innerHTML = `
        <img src="moon-phase-${moonIndex}.png" alt="Moon Phase" style="image-rendering: pixelated;">
    `;
}

// Update every day
setInterval(updateDisplay, 86400000);
updateDisplay();
