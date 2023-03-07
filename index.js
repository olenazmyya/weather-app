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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="weather-forecast-date">${day}</div>
        <img src="http://openweathermap.org/img/wn/10d@2x.png" width="45" />
          <div class="weather-forecast-temp">
              <span class="weather-forecast-temp-max">17°C</span>
              <span class="weather-forecast-temp-min"> 10°C</span>
            </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let button = document.querySelector("button");
button.onclick = function showBar() {
  slideSearch.style.display = "block";
};
let slideSearch = document.querySelector(".citySearch");

function saveCity(city) {
  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("#city");
  h1.innerHTML = searchInput.value;
  let city = h1.innerHTML;
  saveCity(searchInput.value);
}

saveCity("Lviv");
displayForecast();

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = `${temperature}°C`;
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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
