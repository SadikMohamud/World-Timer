// ========================================
// STEP 1: Store all available cities data
// ========================================
// Master list of all cities that users can search for and add
// Each city object contains: name, timezone (IANA format), and country

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

// ========================================
// STEP 2: Store currently selected/displayed cities
// ========================================
// Array of cities currently shown on the dashboard
// First city (index 0) is the primary/featured city by default

let selectedCities = [
  { name: 'Mogadishu', timezone: 'Africa/Mogadishu', country: 'Somalia' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', country: 'USA' },
  { name: 'New York', timezone: 'America/New_York', country: 'USA' },
  { name: 'London', timezone: 'Europe/London', country: 'UK' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan' },
];

// ========================================
// STEP 3: Global settings/state variables
// ========================================

let is24Hour = false;           // Time format: false = 12-hour (AM/PM), true = 24-hour
let isDarkMode = false;         // Theme state: false = light mode, true = dark mode
let primaryCityIndex = 0;       // Index of the primary/featured city (default: Mogadishu at index 0)

// ========================================
// STEP 4: Get UTC offset for a timezone
// ========================================
// Calculates and returns the UTC offset for a given timezone
// Example: "UTC+3" or "UTC-5"

function getUTCOffset(timezone) {
  const now = new Date();
  
  // Create a formatter to get timezone information
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'short',
  });

  // Extract the timezone part from the formatted date
  const parts = formatter.formatToParts(now);
  let s = 0;
  let tzPart = null;
  
  // Loop through parts to find the timeZoneName
  while (s < parts.length) {
    if (parts[s].type === 'timeZoneName') {
      tzPart = parts[s];
    }
    s = s + 1;
  }

  // If timezone name contains GMT, convert it to UTC format
  if (tzPart && tzPart.value.includes('GMT')) {
    return tzPart.value.replace('GMT', 'UTC');
  }

  // Calculate offset manually by comparing UTC time with timezone time
  const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  const offset = (tzDate - utcDate) / (1000 * 60 * 60); // Convert milliseconds to hours
  const sign = offset >= 0 ? '+' : ''; // Add + sign for positive offsets
  return 'UTC' + sign + offset;
}

// ========================================
// STEP 5: Get time period (morning/day/evening/night)
// ========================================
// Determines what time of day it is in the given timezone
// Returns an object with an emoji icon and period name

function getTimePeriod(timezone) {
  // Get the current hour in 24-hour format for the timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    hour12: false,
  });

  const hour = parseInt(formatter.format(new Date()));

  // Determine period based on hour ranges
  if (hour >= 6 && hour < 12) {
    return { icon: '🌅', name: 'Morning' };      // 6 AM - 11:59 AM
  }
  if (hour >= 12 && hour < 18) {
    return { icon: '☀️', name: 'Day' };          // 12 PM - 5:59 PM
  }
  if (hour >= 18 && hour < 22) {
    return { icon: '🌆', name: 'Evening' };      // 6 PM - 9:59 PM
  }
  return { icon: '🌙', name: 'Night' };          // 10 PM - 5:59 AM
}

// ========================================
// STEP 6: Format time for a timezone
// ========================================
// Formats the current time for a specific timezone
// Parameters:
//   - timezone: IANA timezone string (e.g., 'America/New_York')
//   - show24h: boolean for 24-hour vs 12-hour format
//   - showSeconds: boolean to include/exclude seconds

function formatTime(timezone, show24h, showSeconds) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,  // Only include seconds if requested
    hour12: !show24h,                             // hour12 is opposite of show24h
  });

  return formatter.format(new Date());
}

// ========================================
// STEP 7: Display all city cards
// ========================================
// Renders all selected cities as cards in the grid
// The primary city gets special styling

function showAllCities() {
  const grid = document.getElementById('citiesGrid');
  grid.innerHTML = ''; // Clear existing content

  let s = 0;
  // Loop through each selected city
  while (s < selectedCities.length) {
    const city = selectedCities[s];
    const isPrimary = s === primaryCityIndex;     // Check if this is the primary city
    const period = getTimePeriod(city.timezone);  // Get time period (morning/day/etc.)
    const utcOffset = getUTCOffset(city.timezone); // Get UTC offset

    // Create card element
    const card = document.createElement('article');
    
    // Apply different class for primary city (gets orange background)
    if (isPrimary) {
      card.className = 'city-card primary';
    } else {
      card.className = 'city-card';
    }

    // Build card HTML
    let cardHTML = '';

    // Add remove button for non-primary cities
    if (!isPrimary) {
      cardHTML =
        cardHTML +
        '<button class="remove-btn" data-index="' +
        s +
        '">×</button>';
    }

    // Add city header (name and UTC offset)
    cardHTML = cardHTML + '<header class="city-header">';
    cardHTML = cardHTML + '<h3 class="city-name">' + city.name + '</h3>';
    cardHTML = cardHTML + '<span class="utc">' + utcOffset + '</span>';
    cardHTML = cardHTML + '</header>';
    
    // Add time display (will be updated by updateAllTimes function)
    cardHTML =
      cardHTML +
      '<time class="city-time" data-timezone="' +
      city.timezone +
      '">--:--</time>';
    
    // Add time period indicator (morning/day/evening/night)
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

  // Attach click handlers to all remove buttons
  const removeButtons = document.querySelectorAll('.remove-btn');
  let r = 0;
  while (r < removeButtons.length) {
    removeButtons[r].onclick = function (e) {
      const index = parseInt(e.target.dataset.index); // Get city index from data attribute
      removeCity(index);
    };
    r = r + 1;
  }

  // Update the primary location title in the header
  if (selectedCities[primaryCityIndex]) {
    const primary = selectedCities[primaryCityIndex];
    document.getElementById('primaryLocation').innerHTML =
      primary.name + ',<br>' + primary.country;
  }
}

// ========================================
// STEP 8: Update all times
// ========================================
// Updates the time display for all clocks on the page
// Called every second by setInterval

function updateAllTimes() {
  const now = new Date();

  // Update the main/hero clock (shows primary city's time with seconds)
  if (selectedCities[primaryCityIndex]) {
    const primaryTz = selectedCities[primaryCityIndex].timezone;
    const timeString = formatTime(primaryTz, is24Hour, true); // Include seconds
    document.getElementById('mainTime').textContent = timeString;
  }

  // Update all city card times (without seconds)
  const cityTimes = document.querySelectorAll('.city-time');
  let s = 0;
  while (s < cityTimes.length) {
    const el = cityTimes[s];
    const timezone = el.dataset.timezone; // Get timezone from data attribute
    const timeString = formatTime(timezone, is24Hour, false); // No seconds
    el.textContent = timeString;
    s = s + 1;
  }

  // Update the current date display
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
// Adds a new city to the selectedCities array
// Prevents duplicates and refreshes the display

function addCity(city) {
  let alreadyExists = false;
  let s = 0;
  
  // Check if city is already in the list (compare by timezone)
  while (s < selectedCities.length) {
    if (selectedCities[s].timezone === city.timezone) {
      alreadyExists = true;
    }
    s = s + 1;
  }

  // Alert user if city is already added
  if (alreadyExists) {
    alert('This city is already in your list!');
    return;
  }

  // Add city to the array and refresh display
  selectedCities.push(city);
  showAllCities();
}

// ========================================
// STEP 10: Remove a city
// ========================================
// Removes a city from the selectedCities array
// Cannot remove the primary city

function removeCity(index) {
  // Prevent removing the primary city
  if (index === primaryCityIndex) {
    alert('Cannot remove your primary city!');
    return;
  }

  // Remove the city from the array
  selectedCities.splice(index, 1);

  // Adjust primary city index if necessary
  // (if we removed a city before the primary, the primary's index shifts down)
  if (index < primaryCityIndex) {
    primaryCityIndex = primaryCityIndex - 1;
  }

  // Refresh the display
  showAllCities();
}

// ========================================
// STEP 11: Search for cities
// ========================================
// Filters allCities based on search input
// Shows matching results in dropdown

function searchCities() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.toLowerCase(); // Convert to lowercase for case-insensitive search
  const resultsDiv = document.getElementById('searchResults');

  // Hide results if query is too short
  if (query.length < 2) {
    resultsDiv.classList.remove('active');
    return;
  }

  resultsDiv.innerHTML = ''; // Clear previous results

  let s = 0;
  let resultsHTML = '';
  
  // Loop through all cities and find matches
  while (s < allCities.length) {
    const city = allCities[s];
    const cityNameLower = city.name.toLowerCase();
    const countryLower = city.country.toLowerCase();

    // Check if query matches city name or country
    if (cityNameLower.includes(query) || countryLower.includes(query)) {
      // Build HTML for this search result
      resultsHTML =
        resultsHTML +
        '<div class="search-result-item" data-city=\'' +
        JSON.stringify(city) +  // Store city data as JSON in data attribute
        "'>";
      resultsHTML = resultsHTML + city.name + ', ' + city.country;
      resultsHTML = resultsHTML + '</div>';
    }

    s = s + 1;
  }

  // Display results and show the dropdown
  resultsDiv.innerHTML = resultsHTML;
  resultsDiv.classList.add('active');

  // Attach click handlers to search result items
  const resultItems = document.querySelectorAll('.search-result-item');
  let r = 0;
  while (r < resultItems.length) {
    resultItems[r].onclick = function (e) {
      const city = JSON.parse(e.target.dataset.city); // Parse city data from data attribute
      addCity(city);
      document.getElementById('searchInput').value = '';              // Clear search input
      document.getElementById('searchResults').classList.remove('active'); // Hide results
    };
    r = r + 1;
  }
}

// ========================================
// STEP 12: Toggle theme (light/dark mode)
// ========================================
// Switches between light and dark mode
// Updates body class and theme icon

function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('themeIcon');

  if (isDarkMode) {
    // Switch to light mode
    body.classList.remove('dark-mode');
    themeIcon.textContent = '🌙';   // Show moon icon for light mode
    isDarkMode = false;
  } else {
    // Switch to dark mode
    body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';   // Show sun icon for dark mode
    isDarkMode = true;
  }
}

// ========================================
// STEP 12B: Add city button theme toggle (unused/incomplete)
// ========================================
// NOTE: This function appears to be incomplete or unused
// It references an element 'addCityBtn' that doesn't exist in the HTML
// Possibly leftover from earlier development

function addCityBtn() {
  const addCityBtn = document.getElementById('addCityBtn');

  if (isDarkMode) {
    addCityBtn.classList.remove('add-city-btn-bg-color');
    isDarkMode = false;
  } else {
    addCityBtn.classList.add('add-city-btn-bg-color');
    isDarkMode = true;
  }
}

// ========================================
// STEP 13: Set time format (12h or 24h)
// ========================================
// Switches between 12-hour and 24-hour time format
// Updates button active states and refreshes all times

function setTimeFormat(is24h) {
  is24Hour = is24h; // Update global setting

  const btn12h = document.getElementById('btn12h');
  const btn24h = document.getElementById('btn24h');

  // Update button active states
  if (is24h) {
    btn12h.classList.remove('active');
    btn24h.classList.add('active');
  } else {
    btn12h.classList.add('active');
    btn24h.classList.remove('active');
  }

  // Refresh all time displays with new format
  updateAllTimes();
}

// ========================================
// STEP 14: Start everything (initialize app)
// ========================================
// Main initialization function that runs when the DOM is loaded
// Sets up all event listeners and starts the clock

function startApp() {
  // Initial display of cities and times
  showAllCities();
  updateAllTimes();
  
  // Update times every second (1000 milliseconds)
  setInterval(updateAllTimes, 1000);

  // Attach event listeners to interactive elements
  document.getElementById('themeToggle').onclick = toggleTheme;
  
  // 12h format button
  document.getElementById('btn12h').onclick = function () {
    setTimeFormat(false);
  };
  
  // 24h format button
  document.getElementById('btn24h').onclick = function () {
    setTimeFormat(true);
  };
  
  // Search input - trigger search on every keystroke
  document.getElementById('searchInput').oninput = searchCities;
  
  // Add city button - focuses the search input when clicked
  document.getElementById('addCityBtn').onclick = function () {
    document.getElementById('searchInput').focus();
  };

  // Close search results when clicking outside the search container
  document.onclick = function (e) {
    const searchContainer = document.querySelector('.search-container');
    const clickedInside = searchContainer.contains(e.target); // Check if click was inside search
    if (!clickedInside) {
      document.getElementById('searchResults').classList.remove('active');
    }
  };
}

// ========================================
// Start the app when the DOM is fully loaded
// ========================================
document.addEventListener('DOMContentLoaded', startApp);
