'use strict';

const container = document.querySelector('.container');
const textTheme = document.querySelector('.change-text');
const btnBack = document.querySelector('.btn-back');
const displayCountry = document.querySelector('.country-details');

const countries = JSON.parse(sessionStorage.getItem('countries'));
const country = JSON.parse(sessionStorage.getItem('country'));

// Display the details of a specific country
function renderCountry(country) {
  const html = `
      <div class="country" data-country-id=${country.alpha3Code}>
        <img class="country__img" src="${country.flag}" />
        <div class="country__country">
          <h1 class="country__name">${country.name}</h1>
          <p class="country__name-native"><span>Native Name: </span>
            ${country.nativeName}</p>
          <p class="country__population"><span>Population: </span>
            ${country.population.toLocaleString()}</p>
          <p class="country__region"><span>Region: </span>
            ${country.region}</p>
          <p class="country__sub-region"><span>Sub Region: </span>
            ${country.subregion}</p>
          <p class="country__capital"><span>Capital: </span>
            ${country.capital}</p>
          <p class="country__domain"><span>Top Level Domain: </span>
            ${country.topLevelDomain}</p>
          <p class="country__currencies">
            <span>Currencies: </span>${renderList(country.currencies)}
          </p>
          <p class="country__languages">
            <span>Languages: </span>${renderList(country.languages)}
          </p>
        </div>
        <ul class="country__borders">
          <p class="country__border">Border Countries: </p>
            ${renderBorders(country.borders)}
        </ul>
      </div>
    `;

  displayCountry.insertAdjacentHTML('beforeend', html);
}

// Display the borders of a country
function renderBorders(borders) {
  let html = '';

  if (borders.length < 1) return 'No neighbour found';

  borders.forEach(border => {
    getBorderName(border);
    const [borderID, borderName] = getBorderName(border);
    html += `<li class="border" data-border-id=${borderID}>${borderName}</li>`;
  });

  return html;
}

// Get border ID and name
function getBorderName(border) {
  const borderName = countries.filter(country => country.alpha3Code === border);
  return [borderName[0].alpha3Code, borderName[0].name];
}

// Render list of strings from array
function renderList(list) {
  return list.map(el => el.name).join(', ');
}

// EVENT HANDLERS

// Click through to the border countries on the detail page
displayCountry.addEventListener('click', e => {
  if (e.target.closest('.border')) {
    const ID = e.target.closest('.border').dataset.borderId;
    const country = countries.filter(country => country.alpha3Code === ID);
    displayCountry.removeChild(document.querySelector('.country'));
    renderCountry(country[0]);
  }
});

// Go back to the homepage
btnBack.addEventListener('click', () => {
  window.location = 'index.html';
});

countries ? renderCountry(country[0]) : window.location = 'index.html' ;
