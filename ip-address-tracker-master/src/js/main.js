'use strict';

const form = document.querySelector('.form');
const userInput = document.querySelector('.form__input');
const infoCard = document.querySelector('.card');

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
  let html = `
    <div class="card-box">
      <h2 class="heading-secondary u-margin-bottom-small">IP ADDRESS</h2>
      <p class="card-box__info">${geoData.ip}</p>
    </div>
    <div class="card-box">
      <h2 class="heading-secondary u-margin-bottom-small">LOCATION</h2>
      <p class="card-box__info">${geoData.location.city}, ${geoData.location.country} ${geoData.location.postalCode}</p>
    </div>
    <div class="card-box">
      <h2 class="heading-secondary u-margin-bottom-small">TIMEZONE</h2>
      <p class="card-box__info">UTC${geoData.location.timezone}</p>
    </div>
    <div class="card-box">
      <h2 class="heading-secondary u-margin-bottom-small">ISP</h2>
      <p class="card-box__info">${geoData.isp}</p>
    </div>
  `;

  infoCard.insertAdjacentHTML('afterbegin', html);
};

const init = function () {
  getPosition();
  loadMap();
};

init();
