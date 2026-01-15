function updateClocks() {
  const laTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  document.getElementById('la-time').innerText = laTime;

  const londonTime = new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  document.getElementById('primaryLocation').innerText = londonTime;
}

updateClocks(); // run once immediately
setInterval(updateClocks, 1000); // update every second
