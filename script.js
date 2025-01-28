// Eid date (update this date yearly!)
const eidDate = new Date('2024-04-10'); // Example date for Eid 2024

// Moon phase images (you'll add these later)
const moonPhases = [
  'moon/new-moon.png',
  'moon/waxing-crescent.png',
  'moon/first-quarter.png',
  'moon/waxing-gibbous.png',
  'moon/full-moon.png',
  'moon/waning-gibbous.png',
  'moon/last-quarter.png',
  'moon/waning-crescent.png'
];

function updateCountdown() {
  const today = new Date();
  const timeDifference = eidDate - today;
  const daysUntilEid = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  // Update countdown text
  document.getElementById('countdown-timer').textContent = daysUntilEid;

  // Update moon phase (basic logic)
  const moonIndex = Math.floor((daysUntilEid % 29.53) / (29.53 / 8));
  document.getElementById('moon-image').src = moonPhases[moonIndex];
}

// Update every day
setInterval(updateCountdown, 86400000);
updateCountdown();