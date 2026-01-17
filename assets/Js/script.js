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
//============================

function fetUtcOffset(timezone) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'short',
  });
}
