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

  console.log(response.data.wind.speed);
  let iconElement = document.querySelector(".main-weather-image");
  iconElement.setAttribute("src", `src/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "1da1773b8d8c37236ad8e28c3090a15f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector(".input-city").value;
  searchCity(city);
}

let signUpForm = document.querySelector("#input-city-choice");
signUpForm.addEventListener("submit", handleSubmit);

//Geolocation API

//fahrenheit
function showFahrenheitTemp(event) {
  event.preventDefault();
  let TempElement = document.querySelector("#main-temp");
  //remove active class from celsiusLink
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  TempElement.innerHTML = Math.round(FahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let TempElement = document.querySelector("#main-temp");
  //remove active class from celsiusLink
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  TempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("Amsterdam");
