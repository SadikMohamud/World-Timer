//============================
//Store all cities data
//============================

const allCities = [
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', country: 'USA' },
  { name: 'New York', timezone: 'America/New_York', country: 'USA' },
  { name: 'London', timezone: 'Europe/London', country: 'UK' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan' },
  { name: 'Sydney', timezone: 'Australia/Sydney', country: 'Australia' },
  { name: 'Paris', timezone: 'Europe/Paris', country: 'France' },
  { name: 'Berlin', timezone: 'Europe/Berlin', country: 'Germany' },
  { name: 'Moscow', timezone: 'Europe/Moscow', country: 'Russia' },
  { name: 'Beijing', timezone: 'Asia/Shanghai', country: 'China' },
  { name: 'Mumbai', timezone: 'Asia/Kolkata', country: 'India' },
  { name: 'São Paulo', timezone: 'America/Sao_Paulo', country: 'Brazil' },
  { name: 'Cairo', timezone: 'Africa/Cairo', country: 'Egypt' },
  {
    name: 'Johannesburg',
    timezone: 'Africa/Johannesburg',
    country: 'South Africa',
  },
  { name: 'Dubai', timezone: 'Asia/Dubai', country: 'UAE' },
  { name: 'Singapore', timezone: 'Asia/Singapore', country: 'Singapore' },
  { name: 'Mogadishu', timezone: 'Africa/Mogadishu', country: 'Somalia' },
];

//============================
//Store selected cities
//============================

let selectedCities = [
  { name: 'Mogadishu', timezone: 'Africa/Mogadishu', country: 'Somalia' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', country: 'USA' },
  { name: 'New York', timezone: 'America/New_York', country: 'USA' },
  { name: 'London', timezone: 'Europe/London', country: 'UK' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan' },
];

//==========================
//Settings
//============================

let is24Hour = false;
let isDarkMode = false;
let primaryCityIndex = 0; // Mogadishu is default primary city

//============================
//get UtC offset for a timezone

// ========================================
// STEP 4: Get UTC offset for a timezone
// ========================================

function getUTCOffset(timezone) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'short',
  });

  const parts = formatter.formatToParts(now);
  let s = 0;
  let tzPart = null;
  while (s < parts.length) {
    if (parts[s].type === 'timeZoneName') {
      tzPart = parts[s];
    }
    s = s + 1;
  }

  if (tzPart && tzPart.value.includes('GMT')) {
    return tzPart.value.replace('GMT', 'UTC');
  }

  const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  const offset = (tzDate - utcDate) / (1000 * 60 * 60);
  const sign = offset >= 0 ? '+' : '';
  return 'UTC' + sign + offset;
}

// ========================================
// STEP 5: Get time period (morning/day/evening/night)
// ========================================

function getTimePeriod(timezone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    hour12: false,
  });

  const hour = parseInt(formatter.format(new Date()));

  if (hour >= 6 && hour < 12) {
    return { icon: '🌅', name: 'Morning' };
  }
  if (hour >= 12 && hour < 18) {
    return { icon: '☀️', name: 'Day' };
  }
  if (hour >= 18 && hour < 22) {
    return { icon: '🌆', name: 'Evening' };
  }
  return { icon: '🌙', name: 'Night' };
}

// ========================================
// STEP 6: Format time for a timezone
// ========================================
