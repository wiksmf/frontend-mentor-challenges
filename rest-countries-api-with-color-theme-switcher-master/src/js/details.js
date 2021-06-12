'use strict';

const container = document.querySelector('.container');
const btnSwitchTheme = document.querySelector('.btn--theme');
const textTheme = document.querySelector('.change-text')
const btnBack = document.querySelector('.btn-back');
const displayCountry = document.querySelector('.country-details');

const country = JSON.parse(sessionStorage.getItem('country'));
const countries = JSON.parse(sessionStorage.getItem('countries'));


let darkTheme = sessionStorage.getItem('darkTheme'); 

// Toggle the color scheme between light and dark mode
function darkThemeOn () {
  container.classList.add('dark-theme');
  textTheme.textContent = 'Dark Mode'
  sessionStorage.setItem('darkTheme', 'true');
}

function darkThemeOff () {
  container.classList.remove('dark-theme');
  textTheme.textContent = 'Light Mode'
  sessionStorage.setItem('darkTheme', null);
}
 
if (darkTheme === 'true') darkThemeOn();

btnSwitchTheme.addEventListener('click', () => {
  darkTheme = sessionStorage.getItem('darkTheme'); 
  (darkTheme !== 'true') ? darkThemeOn() : darkThemeOff(); 
});



btnBack.addEventListener('click', () => {
  window.location = 'index.html';
});

// Display a specific country from the API on the page
function renderCountry(country) {
  const html = `
      <div class="country" data-country-id=${country.alpha3Code}>
        <img class="country__img" src="${country.flag}" />
        <div class="country__country">
          <h1 class="country__name">${country.name}</h1>
          <p class="country__name-native"><span>Native Name</span>
            ${country.nativeName}</p>
          <p class="country__population"><span>Population:</span>
            ${country.population}</p>
          <p class="country__region"><span>Region:</span>
            ${country.region}</p>
          <p class="country__sub-region"><span>Sub Region:</span>
            ${country.subregion}</p>
          <p class="country__capital"><span>Capital:</span>
            ${country.capital}</p>
          <p class="country__domain"><span>Top Level Domain:</span>
            ${country.topLevelDomain}</p>
          <p class="country__currencies">
            <span>Currencies:</span>${renderList(country.currencies)}
          </p>
          <p class="country__languages">
            <span>Languages:</span>${renderList(country.languages)}
          </p>
        </div>
        <div class="country__borders">
          <p class="country__border">Border Countries: </p>
            ${renderBorders(country.borders)}
        </div>
      </div>
    `;

  displayCountry.insertAdjacentHTML('beforeend', html);
}

// Display a country borders
function renderBorders(borders) {
  let html = '';

  if (borders.length < 1) return 'No neighbour found';

  borders.forEach(border => {
    const [borderID, borderName] = getBorderName(border);
    html += `<li class="border" data-border-id=${borderID}>${borderName}</li>`;
  });
  return html;
}

function getBorderName(border) {
  const borderName = countries.filter(country => country.alpha3Code === border);
  return [borderName[0].alpha3Code, borderName[0].name];
}

function renderList(list) {
  return list.map(el => el.name).join(', ');
}

renderCountry(country[0]);

// Click through to the border countries on the detail page
displayCountry.addEventListener('click', e => {
  if (e.target.closest('.border')) {
    const ID = e.target.closest('.border').dataset.borderId;
    const country = countries.filter(country => country.alpha3Code === ID);
    displayCountry.removeChild(document.querySelector('.country'));
    renderCountry(country[0]);
  }
});