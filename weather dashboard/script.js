const apiKey = "715e23e19bd1e00a0218c686f06dd3e9";
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const condition = document.getElementById("condition");
const errorMessage = document.getElementById("errorMessage");

searchBtn.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();

  if (city !== "") {
    getWeather(city);
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    errorMessage.textContent = "";

    const response = await fetch(url);

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Parse nested JSON data
    const temp = data.main.temp;
    const hum = data.main.humidity;
    const wind = data.wind.speed;
    const weatherCondition = data.weather[0].description;

    // Render data dynamically
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${temp} °C`;
    humidity.textContent = `Humidity: ${hum}%`;
    windSpeed.textContent = `Wind Speed: ${wind} m/s`;
    condition.textContent = `Condition: ${weatherCondition}`;

  } catch (error) {
    errorMessage.textContent = error.message;

    cityName.textContent = "--";
    temperature.textContent = "Temperature: --";
    humidity.textContent = "Humidity: --";
    windSpeed.textContent = "Wind Speed: --";
    condition.textContent = "Condition: --";
  }
}