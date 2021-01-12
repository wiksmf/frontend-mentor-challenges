'use strict';

const form = document.querySelector('.form');
const userInput = document.querySelector('.form__input');

const accessToken = config.ACCESS_TOKEN;

class App {
  // #mapEvent;

  constructor() {
    // Get user's position
    this._getPosition();
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        console.warn('Could not get your position'),
      );
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;

    const coords = [latitude, longitude];

    const map = L.map('map').setView(coords, 13);

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
  }
}

const app = new App();
