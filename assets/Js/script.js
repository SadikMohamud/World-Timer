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

function formatTime(timezone, show24h, showSeconds) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
    hour12: !show24h,
  });

  return formatter.format(new Date());
}

// ========================================
// STEP 7: Display all city cards
// ========================================

function showAllCities() {
  const grid = document.getElementById('citiesGrid');
  grid.innerHTML = '';

  let s = 0;
  while (s < selectedCities.length) {
    const city = selectedCities[s];
    const isPrimary = s === primaryCityIndex;
    const period = getTimePeriod(city.timezone);
    const utcOffset = getUTCOffset(city.timezone);

    const card = document.createElement('article');
    if (isPrimary) {
      card.className = 'city-card primary';
    } else {
      card.className = 'city-card';
    }

    let cardHTML = '';

    if (!isPrimary) {
      cardHTML =
        cardHTML +
        '<button class="remove-btn" data-index="' +
        s +
        '">❌</button>';
    }

    cardHTML = cardHTML + '<header class="city-header">';
    cardHTML = cardHTML + '<h3 class="city-name">' + city.name + '</h3>';
    cardHTML = cardHTML + '<span class="utc">' + utcOffset + '</span>';
    cardHTML = cardHTML + '</header>';
    cardHTML =
      cardHTML +
      '<time class="city-time" data-timezone="' +
      city.timezone +
      '">--:--</time>';
    cardHTML =
      cardHTML +
      '<p class="period"><span>' +
      period.icon +
      '</span> ' +
      period.name +
      '</p>';

    card.innerHTML = cardHTML;
    grid.appendChild(card);

    s = s + 1;
  }

  const removeButtons = document.querySelectorAll('.remove-btn');
  let r = 0;
  while (r < removeButtons.length) {
    removeButtons[r].onclick = function (e) {
      const index = parseInt(e.target.dataset.index);
      removeCity(index);
    };
    r = r + 1;
  }

  if (selectedCities[primaryCityIndex]) {
    const primary = selectedCities[primaryCityIndex];
    document.getElementById('primaryLocation').innerHTML =
      primary.name + ',<br>' + primary.country;
  }
}

// ========================================
// STEP 8: Update all times
// ========================================

function updateAllTimes() {
  const now = new Date();

  if (selectedCities[primaryCityIndex]) {
    const primaryTz = selectedCities[primaryCityIndex].timezone;
    const timeString = formatTime(primaryTz, is24Hour, true);
    document.getElementById('mainTime').textContent = timeString;
  }

  const cityTimes = document.querySelectorAll('.city-time');
  let s = 0;
  while (s < cityTimes.length) {
    const el = cityTimes[s];
    const timezone = el.dataset.timezone;
    const timeString = formatTime(timezone, is24Hour, false);
    el.textContent = timeString;
    s = s + 1;
  }

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  document.getElementById('currentDate').textContent =
    dateFormatter.format(now);
}

// ========================================
// STEP 9: Add a city
// ========================================

function addCity(city) {
  let alreadyExists = false;
  let s = 0;
  while (s < selectedCities.length) {
    if (selectedCities[s].timezone === city.timezone) {
      alreadyExists = true;
    }
    s = s + 1;
  }

  if (alreadyExists) {
    alert('This city is already in your list!');
    return;
  }

  selectedCities.push(city);
  showAllCities();
}
