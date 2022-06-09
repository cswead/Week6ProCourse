// day and month logs
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// adding the live date and time

function dateToday(event) {
  let month = months[now.getMonth()];
  let day = days[now.getDay()];
  let subHeading = document.querySelector(".dateToday");
  let timeHours = now.getHours();
  let timeMins = now.getMinutes();
  console.log(timeHours);
  subHeading.innerHTML = `${day}, ${timeHours}:${timeMins}`;
}
dateToday();

// changing the city text based on search

function chosenCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityImput");
  let cityChange = document.querySelector("#citySelected");
  console.log(cityChange);
  cityChange.innerHTML = `${city.value}`;
}
let detailForm = document.querySelector("#cityForm");
detailForm.addEventListener("submit", chosenCity);

// changing the temp based on celcius and fahrenheight

function celciusLink(event) {
  event.preventDefault();
  let celciusElements = document.querySelectorAll(".temp");
  celciusElements.forEach(function (element) {
    element.innerHTML = 44;
  });
}

function fahLink(event) {
  event.preventDefault();
  let fahElements = document.querySelectorAll(".temp");
  fahElements.forEach(function (element) {
    element.innerHTML = 66;
  });
}

let celciusSelectors = document.querySelectorAll(".celciusLink");
celciusSelectors.forEach(function (selector) {
  selector.addEventListener("click", celciusLink);
});

let fahSelectors = document.querySelectorAll(".fahLink");
fahSelectors.forEach(function (selector) {
  selector.addEventListener("click", fahLink);
});

// adding in the temperature today based on searched City
function newChosenCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityImput");
  apiChosenCity(city.value);
}
let detailFormNew = document.querySelector("#cityForm");
detailFormNew.addEventListener("submit", newChosenCity);

function apiChosenCity(city) {
  let apiKey = "3b37b3ce3faa04a811223a14131db55d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather); //ads the temperature call from api
  axios.get(apiUrl).then(weatherSummary); //ads the weather description call from api
}

function showWeather(response) {
  let city = document.querySelector("#citySelected");
  city.innerHTML = response.data.name;
  let temp = document.querySelector("#tempToday");
  temp.innerHTML = `The estimated temperature today is ${response.data.main.temp} ℃`;
}

// adding in the weather description today based on searched City

function weatherSummary(response) {
  console.log(response.data.weather[0].description);
  let city = document.querySelector("#citySelected");
  let weatherToday = document.querySelector("#weatherSummary");
  weatherToday.innerHTML = response.data.weather[0].description;
}

// getting data from the geo api
document.querySelector("#geoSearch").addEventListener("click", () => {
  function retrievePosition(position) {
    let geoApiKey = "5bd76300836a0463d8f43511534ac83e";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${geoApiKey}`;
    axios.get(url).then(showWeather);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
});
