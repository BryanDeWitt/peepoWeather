import "./style.css";

const $ = (selector) => document.querySelector(selector);
const $$ = (element) => document.createElement(element);

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const $form = $("form");
const $location = $(".country");
const $city = $('input[type="text"]');
const $current = $("h2");
const $currentImg = $(".currentImg");
const $dayName = Array.from(document.querySelectorAll(".dayName"));
const $max = Array.from(document.querySelectorAll(".max"));
const $min = Array.from(document.querySelectorAll(".min"));
const $avg = Array.from(document.querySelectorAll(".avg"));
const $icon = Array.from(document.querySelectorAll(".dayIcon"));
let currentLocation = "Minas";
$location.textContent = currentLocation;

let nextDays = [];
let maxTemps = [];
let minTemps = [];
let avgTemps = [];
let icon = [];

window.addEventListener("load", () => {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=a6b637e11e464840ac070159231505&q=${currentLocation}&days=10`
  )
    .then((res) => res.json())
    .then((data) => {
      getInfo(data);
      getDayAndTemps(data);
    });
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  let city = $city.value;
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=a6b637e11e464840ac070159231505&q=${city}&days=10`
  )
    .then((res) => res.json())
    .then((data) => {
      getInfo(data);
      getDayAndTemps(data);
    });
  /* .then((dataRender) => renderDivs(dataRender)); */
});

function getInfo(obj) {
  currentLocation = `${obj.location.name}, ${obj.location.country}`;
  $location.textContent = currentLocation;
  $city.value = "";
  $current.textContent = `${obj.current.temp_c}º`;
  $currentImg.src = `${obj.current.condition.icon}`;
}

function getDayAndTemps(obj) {
  nextDays = [];
  maxTemps = [];
  minTemps = [];
  avgTemps = [];
  icon = [];
  for (let i = 1; i < 7; i++) {
    let thisDay = new Date(0);
    thisDay.setUTCSeconds(obj.forecast.forecastday[i].date_epoch);
    let day = days[thisDay.getDay()];
    nextDays.push(day);
    maxTemps.push(obj.forecast.forecastday[i].day.maxtemp_c);
    minTemps.push(obj.forecast.forecastday[i].day.mintemp_c);
    avgTemps.push(obj.forecast.forecastday[i].day.avgtemp_c);
    icon.push(obj.forecast.forecastday[i].day.condition.icon);
  }
  renderDivs();
}

function renderDivs() {
  for (let i = 0; i < nextDays.length; i++) {
    $dayName[i].textContent = "";
    $dayName[i].textContent = nextDays[i];
    $max[i].textContent = "";
    $max[i].textContent = `Max: ${maxTemps[i]}`;
    $min[i].textContent = "";
    $min[i].textContent = `Min: ${minTemps[i]}`;
    $avg[i].textContent = "";
    $avg[i].textContent = `Avg: ${avgTemps[i]}`;
    $icon[i].src = icon[i];
  }
}
