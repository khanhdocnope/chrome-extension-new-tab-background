// ================================================================
// main.js — App Initialization and Clock Loop
// Depends on: all other modules
// ================================================================

// ===== CLOCK =====
function updateClock(forceBgUpdate = false) {
  const now = new Date();
  const h   = String(now.getHours()).padStart(2, '0');
  const m   = String(now.getMinutes()).padStart(2, '0');
  clockEl.textContent = `${h}:${m}`;

  // Date formatting
  if (currentLang === 'vi') {
    const day   = DAYS_VI[now.getDay()];
    const month = MONTHS_VI[now.getMonth()];
    dateEl.textContent = `${day}, ${now.getDate()} ${month} ${now.getFullYear()}`;
  } else {
    const day   = DAYS_EN[now.getDay()];
    const month = MONTHS_EN[now.getMonth()];
    dateEl.textContent = `${day}, ${month} ${now.getDate()}, ${now.getFullYear()}`;
  }

  // Determine current period (dynamic or fixed fallback)
  const t       = LANGS[currentLang];
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const period  = getSunPeriod(nowMins);

  // Update greeting
  const greetingMap = {
    morning:   t.greeting_morning,
    noon:      t.greeting_noon,
    afternoon: t.greeting_afternoon,
    evening:   t.greeting_evening,
    night:     t.greeting_night
  };
  greetingEl.textContent = greetingMap[period] || t.greeting_morning;

  // Apply time-based background if enabled
  if (timeBgEnabled && !unsplashEnabled) {
    if (period !== currentPeriod || forceBgUpdate) {
      currentPeriod = period;
      const url = timeBgUrls[period];
      if (url) {
        applyBgImage(url, currentOpacity, true);
      } else {
        removeImage();
      }
    }
  }
}

// ===== STARTUP =====
setInterval(updateClock, 1000);
updateClock();
createStars();

// Fetch sun times async — won't block the UI
fetchDynamicSunTimes().then(() => updateClock(true));

// Load persisted settings and tasks
loadSettings();
loadTasks();
