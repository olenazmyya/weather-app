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
}
let search = document.querySelector("#form");
search.addEventListener("submit", saveCity);
