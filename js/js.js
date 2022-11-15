// Current time
let now = new Date();

let actualDate = document.querySelector(".actual-date");
let actualTime = document.querySelector(".actual-time");

let dayOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = dayOfTheWeek[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augest",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

actualDate.innerHTML = `${month} ${date}, ${year}`;
actualTime.innerHTML = `${day} ${hours}:${minutes}`;

// Forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row" id="forecast-column">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img class="forecast-image" src="src/${
            forecastDay.weather[0].icon
          }.png" alt="weather-image" />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperatue-max">${Math.round(
              forecastDay.temp.max
            )}° </span>
            <span class="weather-forecast-temperatue-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
        </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3980a7c8f2a782241a093131b099f993";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

// City choice
function displayWeatherConditions(response) {
  console.log(response.data);
  document.querySelector(".actual-city").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#main-temp").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector(".general-weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    ".wind"
  ).innerHTML = `Wind: ${response.data.wind.speed} km/h`;

  let iconElement = document.querySelector(".main-weather-image");
  iconElement.setAttribute("src", `src/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "1da1773b8d8c37236ad8e28c3090a15f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".input-city").value;
  searchCity(city);
}

let signUpForm = document.querySelector("#input-city-choice");
signUpForm.addEventListener("submit", handleSubmit);

searchCity("Amsterdam");
