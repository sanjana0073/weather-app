const apiKey = "fc67f73347c33d84d1db555dffd337f5";
const searchInput = document.querySelector(".search input[type='text']");
const searchButton = document.querySelector(".search button");
const weatherTable = document.querySelector(".weather-table");

// Fetch historical weather data for a specific date and city
async function fetchHistoricalWeatherData(city, date) {
  const apiUrl = `https://your-historical-weather-api.com/api/v1/data?city=${city}&date=${date}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data; // Adjust this based on the API's response structure
}

// Display historical weather data in the table
function displayWeatherData(date, weatherData) {
  const row = document.createElement("tr");
  
  const dateCell = document.createElement("td");
  dateCell.textContent = formatDate(date);
  row.appendChild(dateCell);
  
  const tempCell = document.createElement("td");
  tempCell.textContent = `${Math.round(weatherData.main.temp)}°C`;
  row.appendChild(tempCell);
  
  const humidityCell = document.createElement("td");
  humidityCell.textContent = `${weatherData.main.humidity}%`;
  row.appendChild(humidityCell);
  
  const windCell = document.createElement("td");
  windCell.textContent = `${weatherData.wind.speed}km/hr`;
  row.appendChild(windCell);
  
  const pressureCell = document.createElement("td");
  pressureCell.textContent = `${weatherData.main.pressure}pa`;
  row.appendChild(pressureCell);
  
  weatherTable.appendChild(row);
}

// Fetch and display historical weather data for the past 7 days
async function fetchPastWeekWeather(city) {
  const currentDate = new Date();
  for (let daysAgo = 1; daysAgo <= 7; daysAgo++) {
    const targetDate = new Date(currentDate);
    targetDate.setDate(targetDate.getDate() - daysAgo);
    const formattedDate = formatDate(targetDate); // Format the date as needed
    const weatherData = await fetchHistoricalWeatherData(city, formattedDate);
    displayWeatherData(targetDate, weatherData);
  }
}

// Call the fetchPastWeekWeather function when the page loads
window.addEventListener("load", function () {
  fetchPastWeekWeather("YourCityName");
});

// Rest of your existing code
// ...

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

