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
let time = new Date().toLocaleTimeString("en-US", {
  hour12: false,
  hour: "numeric",
  minute: "numeric",
});
let date = document.querySelector("#dateAndTime");
date.innerHTML = `${day}, ${time}`;

let button = document.querySelector("button");
button.onclick = function showBar() {
  slideSearch.style.display = "block";
};
let slideSearch = document.querySelector(".citySearch");

function saveCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("#city");
  h1.innerHTML = searchInput.value;
  let city = h1.innerHTML;
  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
  console.log(apiURL);
}
let search = document.querySelector("#form");
search.addEventListener("submit", saveCity);

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = `🌤 ${temperature}°C`;
  let minTemp = Math.round(response.data.main.temp_min);
  let minElement = document.querySelector("#min");
  minElement.innerHTML = `min ${minTemp}°C`;
  let maxTemp = Math.round(response.data.main.temp_max);
  let maxElement = document.querySelector("#max");
  maxElement.innerHTML = `max ${maxTemp}°C`;
  let feelsLike = Math.round(response.data.main.feels_like);
  let feelElement = document.querySelector("#realfeel");
  feelElement.innerHTML = `feels like ${feelsLike}°C`;
  let humidityParam = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `humidity ${humidityParam} %`;
}
