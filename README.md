# 🌍 TimeScroll

**TimeScroll** is a modern, responsive World Clock web application that displays real-time clocks across multiple global cities. Built with HTML, CSS, and vanilla JavaScript, this project demonstrates clean code architecture, dynamic DOM manipulation, and responsive design principles.

> **Note:** This was my second project for Code Institute, with a strong emphasis on improving my JavaScript skills through practical, real-world application development.

---

## 🔗 Live Demo

**[View Live Application](https://sadikmohamud.github.io/World-Timer)**

---

## 📌 Project Overview

TimeScroll provides users with an intuitive interface to monitor time across different global cities simultaneously. The application features dynamic content generation, real-time updates, and a polished user experience across all devices.

### Key Capabilities

- ✅ **Dynamic City Management** - Search and add cities from a curated list
- ✅ **Real-Time Updates** - Automatic clock synchronization every second
- ✅ **Time Format Toggle** - Switch between 12-hour and 24-hour formats
- ✅ **Theme Switching** - Toggle between light and dark modes
- ✅ **Primary City Feature** - Highlight your main timezone with enhanced styling
- ✅ **Time Period Indicators** - Visual feedback showing morning, day, evening, or night
- ✅ **UTC Offset Display** - Clear timezone information for each city
- ✅ **Responsive Design** - Seamless experience on desktop, tablet, and mobile

---

## 🎯 Learning Objectives

This project was developed as part of my Code Institute journey, focusing on:

### Technical Skills
- **JavaScript Fundamentals** - Variables, loops, functions, and control flow
- **DOM Manipulation** - Dynamic HTML generation and content updates
- **Event Handling** - User interactions and real-time search functionality
- **Data Management** - Working with arrays and objects
- **Browser APIs** - Intl.DateTimeFormat for timezone handling
- **CSS Custom Properties** - Theme switching with CSS variables
- **Responsive Web Design** - Mobile-first approach with media queries

### Development Practices
- **Code Organization** - Modular function structure with clear responsibilities
- **Debugging** - Resolving deployment issues (case-sensitive paths on GitHub Pages)
- **Cross-Browser Testing** - Ensuring compatibility across different browsers
- **Accessibility** - Semantic HTML and ARIA attributes
- **Version Control** - Git workflow and GitHub Pages deployment

---

## ✨ Features

### Core Functionality

#### ⏱️ **Real-Time World Clocks**
- Automatic updates every second using `setInterval()`
- Accurate time calculation using native JavaScript `Date` object
- Timezone handling with `Intl.DateTimeFormat` API

#### 🔍 **Smart City Search**
- Live search filtering as you type
- Search by city name or country
- Dropdown results with click-to-add functionality
- Duplicate prevention system

#### 🌓 **Dark Mode Toggle**
- Smooth theme transitions with CSS variables
- Persistent visual state during session
- Optimized color contrast for accessibility

#### 🕐 **Flexible Time Formats**
- Toggle between 12-hour (AM/PM) and 24-hour formats
- Consistent formatting across all clocks
- Active state indicators on format buttons

#### 📍 **Primary City Display**
- Large hero clock for your main timezone
- Special styling with contrasting colors
- Protected from deletion

#### 🏙️ **City Cards**
- Clean, card-based layout for each city
- UTC offset display for quick reference
- Time period icons (🌅 Morning, ☀️ Day, 🌆 Evening, 🌙 Night)
- Hover effects and smooth animations
- Remove functionality for non-primary cities

#### 📱 **Fully Responsive**
- Mobile-first design approach
- Adaptive grid layouts (1 column → 2 columns → 4 columns)
- Optimized typography scaling across breakpoints
- Touch-friendly interactive elements

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup structure |
| **CSS3** | Responsive styling, animations, dark mode |
| **JavaScript (ES6)** | Dynamic functionality and time management |
| **Intl.DateTimeFormat API** | Timezone and date formatting |
| **CSS Custom Properties** | Theme switching and design consistency |
| **GitHub Pages** | Live deployment and hosting |

---

## 📂 Project Structure

```
world-timer/
│
├── index.html              # Main HTML structure
├── assets/
│   ├── css/
│   │   └── styles.css      # All styling and responsive design
│   ├── js/
│   │   └── script.js       # Core JavaScript functionality
│   └── images/
│       └── responsiveness.png  # Documentation screenshot
└── README.md               # Project documentation
```

### Code Organization

**HTML (`index.html`)**
- Semantic structure with `<header>`, `<main>`, `<footer>`
- ARIA labels for accessibility
- Minimal hard-coded content (dynamically generated)

**CSS (`styles.css`)**
- CSS variable-based theming
- Mobile-first responsive breakpoints (640px, 1024px)
- Organized sections (reset, variables, components, responsive)
- Smooth transitions and hover effects

**JavaScript (`script.js`)**
- Modular function design
- Clear separation of concerns:
  - Data management (cities, settings)
  - Time calculations (UTC offsets, formatting)
  - UI rendering (cards, search results)
  - Event handling (search, theme, format toggle)

---

## 🚀 How It Works

### Time Management
```javascript
// Updates all clocks every second
setInterval(updateAllTimes, 1000);

// Formats time for specific timezone
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
```

### Dynamic Content Generation
- City cards are **not** hard-coded in HTML
- JavaScript generates all cards from the `selectedCities` array
- Content updates trigger complete re-rendering for consistency

### Search Functionality
- Live filtering on keystroke using `oninput` event
- Case-insensitive matching against city names and countries
- Click handler dynamically attached to each result

### Dark Mode Implementation
- CSS custom properties define color schemes
- JavaScript toggles `dark-mode` class on `<body>`
- All colors reference CSS variables for instant theme switching

---

## 📱 Responsive Design Showcase

TimeScroll adapts seamlessly across all device sizes:

- **Mobile (< 640px)**: Single-column layout, compact navigation
- **Tablet (640px - 1023px)**: Two-column grid, expanded controls
- **Desktop (1024px+)**: Four-column grid, centered hero clock, maximum detail

*Screenshot:*
![Responsive Design](./assets/images/responsiveness.png)

---

## 🧪 Local Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic command line knowledge (optional)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sadikmohamud/world-timer.git
   ```

2. **Navigate to the project folder:**
   ```bash
   cd world-timer
   ```

3. **Open in browser:**
   - **Option A:** Double-click `index.html`
   - **Option B:** Use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
     ```
   - Open browser to `http://localhost:8000`

### No Build Process Required
This project uses vanilla JavaScript with no dependencies, bundlers, or build tools. Just open and run!

---

## 💡 Code Highlights

### Dynamic City Cards
Cities are rendered from JavaScript arrays, not hard-coded HTML:
```javascript
function showAllCities() {
  const grid = document.getElementById('citiesGrid');
  grid.innerHTML = ''; // Clear existing
  
  selectedCities.forEach((city, index) => {
    const card = document.createElement('article');
    // Build card content dynamically
    card.innerHTML = `...`;
    grid.appendChild(card);
  });
}
```

### Real-Time Updates
```javascript
// Update every second
setInterval(updateAllTimes, 1000);
```

### Theme Switching
```css
:root {
  --bg-primary: #ff5722;
  --text-primary: #000;
}

body.dark-mode {
  --bg-primary: #1a1a1a;
  --text-primary: #fff;
}
```

---

## 📚 What I Learned

### JavaScript Skills Developed
- ✅ Working with the `Date` object and time calculations
- ✅ Manipulating the DOM dynamically (`createElement`, `innerHTML`, `appendChild`)
- ✅ Event handling (`onclick`, `oninput`, event delegation)
- ✅ Array methods and loops for data processing
- ✅ Using the `Intl.DateTimeFormat` API for internationalization
- ✅ Managing application state with global variables

### CSS Techniques
- ✅ CSS custom properties for theming
- ✅ Mobile-first responsive design with media queries
- ✅ Grid and Flexbox layouts
- ✅ Smooth transitions and hover effects

### Development Practices
- ✅ Debugging deployment issues (GitHub Pages case sensitivity)
- ✅ Code organization and commenting
- ✅ Testing across multiple devices and browsers
- ✅ Writing semantic, accessible HTML
- ✅ Version control with Git and GitHub

---

## 🐛 Challenges Overcome

### Case-Sensitive File Paths
**Problem:** GitHub Pages is case-sensitive, but local development (Windows/Mac) is not.

**Solution:** Ensured all file paths match exact casing:
```html
<!-- Wrong -->
<link rel="stylesheet" href="./Assets/CSS/Styles.css" />

<!-- Correct -->
<link rel="stylesheet" href="./assets/css/styles.css" />
```

### Time Zone Calculations
**Challenge:** Handling different time zones accurately without external libraries.

**Solution:** Leveraged `Intl.DateTimeFormat` with `timeZone` option for native browser support.

---

## 🔮 Future Improvements

- [ ] **Expanded City Database** - Add more cities and dynamic timezone support
- [ ] **User Preferences** - Save selected cities and theme preference to `localStorage`
- [ ] **Custom City Addition** - Allow users to add any city via timezone selection
- [ ] **Time Zone Converter** - Compare times between selected cities
- [ ] **Analog Clock Option** - Visual clock faces alongside digital display
- [ ] **Geolocation Detection** - Auto-detect user's timezone
- [ ] **Enhanced Animations** - Smooth card additions/removals with CSS transitions
- [ ] **Keyboard Navigation** - Full keyboard accessibility for search and controls
- [ ] **PWA Features** - Offline support and install-to-device capability
- [ ] **Event Notifications** - Alerts for important times in selected cities

---

## 🤝 Acknowledgements

- **GitHub Copilot** - Assistance with JavaScript logic and best practices
- **ChatGPT** - Guidance on debugging and deployment troubleshooting
- **Code Institute** - Curriculum and learning resources
- **MDN Web Docs** - Reference for web APIs and standards

---

## 👤 Author

**Sadik Mohamud**
