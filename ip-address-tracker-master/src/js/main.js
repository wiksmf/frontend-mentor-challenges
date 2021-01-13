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
const apiKey = config.API_KEY;

const map = L.map('map');
const blackIcon = L.icon({ iconUrl: 'src/img/icon-location.svg' });

// Getting user's position
const getPosition = async function () {
  try {
    const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}`);
    if (!res.ok) throw new Error('Problem getting location data.');

    const geoData = await res.json();

    loadMap(geoData.location.lat, geoData.location.lng);
    displayInformation(geoData);
  } catch (err) {
    console.error(`⛔ ${err}`);
  }
};

// Loading Leaflet map
const loadMap = function (latitude, longitude) {
  const coords = [latitude, longitude];

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

  map.setView(coords, 13);
  L.marker(coords, { icon: blackIcon }).addTo(map);
};

// Updating information card
const displayInformation = function (geoData) {
  ipInfo.textContent = geoData.ip;
  cityInfo.textContent = geoData.location.city;
  countryInfo.textContent = geoData.location.country;
  postalCodeInfo.textContent = geoData.location.postalCode;
  timezoneInfo.textContent = geoData.location.timezone;
  ispInfo.textContent = geoData.isp;
};

const init = function () {
  getPosition();
  loadMap();
};

init();
