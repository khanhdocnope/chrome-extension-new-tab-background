// ================================================================
// state.js — Global Application State
//
// All mutable state is defined here so every module can share it
// without circular dependencies.
// ================================================================

// ===== SETTINGS STATE =====
let currentTheme    = 'aurora';
let customCSS       = '';
let currentBgImage  = '';
let currentOpacity  = 60;
let glassEnabled    = true;
let glassBlur       = 20;
let currentLang     = 'vi';

// ===== TIME-BASED BACKGROUND STATE =====
let timeBgEnabled   = false;
let timeBgUrls      = { morning: '', noon: '', afternoon: '', evening: '', night: '' };
let currentPeriod   = ''; // tracks the active time period

// ===== UNSPLASH STATE =====
let unsplashKeyword = '';
let unsplashEnabled = false;

// ===== TODO STATE =====
let tasksList = [];

// ===== SUN TIMES STATE =====
let sunTimes        = null; // { sunrise, sunset, solar_noon } as minutes-from-midnight
let sunTimesFetched = false;
let dynamicSunEnabled = true;
