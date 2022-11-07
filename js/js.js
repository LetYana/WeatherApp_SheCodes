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
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".general-weather-description").innerHTML =
    response.data.weather[0].description;
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

searchCity("Amsterdam");

//Geolocation API

function showCurrentLocation(position) {
  let apiKey = "1da1773b8d8c37236ad8e28c3090a15f";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentButton = document.querySelector("#my-location");
currentButton.addEventListener("click", getCurrentLocation);
