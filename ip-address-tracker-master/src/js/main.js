'use strict';

const form = document.querySelector('.form');
const userInput = document.querySelector('.form__input');
const ipInfo = document.querySelector('.card-box__ip');
const cityInfo = document.querySelector('.card-box__city');
const countryInfo = document.querySelector('.card-box__country');
const postalCodeInfo = document.querySelector('.card-box__postalCode');
const timezoneInfo = document.querySelector('.card-box__timezone');
const ispInfo = document.querySelector('.card-box__isp');

const accessToken = config.ACCESS_TOKEN;
const url = `https://geo.ipify.org/api/v1?apiKey=${config.API_KEY}`;

const map = L.map('map');
const blackIcon = L.icon({ iconUrl: 'src/img/icon-location.svg' });

// Get user's position
const getPosition = async function () {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Problem getting location data.');

    const geoData = await res.json();
    updateMap(geoData.location.lat, geoData.location.lng);
    displayInformation(geoData);
  } catch (err) {
    console.error(`⛔ ${err}`);
  }
};

// Track Address
const trackAddress = async function () {
  try {
    const res = await fetch(`${url}&domain=${userInput.value}`);
    if (!res.ok) throw new Error('Problem getting location data.');

    const userData = await res.json();
    updateMap(userData.location.lat, userData.location.lng);
    displayInformation(userData);
  } catch (err) {
    console.error(`⛔ ${err}`);
  }
};

// Update position on map
const updateMap = function (latitude, longitude) {
  const coords = [latitude, longitude];

  map.setView(coords, 13);
  L.marker(coords, { icon: blackIcon }).addTo(map);
};

// Load Leaflet map
const loadMap = function () {
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: accessToken,
    },
  ).addTo(map);
};

// Update information card
const displayInformation = function (geoData) {
  ipInfo.textContent = geoData.ip;
  cityInfo.textContent = geoData.location.city;
  countryInfo.textContent = geoData.location.country;
  postalCodeInfo.textContent = geoData.location.postalCode;
  timezoneInfo.textContent = geoData.location.timezone;
  ispInfo.textContent = geoData.isp;
};

// Collect input from the user
form.addEventListener('submit', e => {
  e.preventDefault();
  trackAddress();
  userInput.value = '';
  userInput.focus();
});

const init = function () {
  getPosition();
  loadMap();
};

init();
