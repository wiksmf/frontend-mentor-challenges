'use strict';

const container = document.querySelector('.container');
const btnSwitchTheme = document.querySelector('.btn--theme');
const textTheme = document.querySelector('.change-text')
const input = document.querySelector('.input-country');
const regionInput = document.querySelector('#region');
const displayCountries = document.querySelector('.countries');

let countries = [];
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


// Get all countries from the API
async function getCountries() {
  try {
    const res = await fetch(`https://restcountries.eu/rest/v2/all`);
    if (!res) throw new Error('Problem getting country');

    countries = await res.json();
    countries.forEach(item => renderCountry(item));
    sessionStorage.setItem('countries', JSON.stringify(countries));
  } catch (err) {
    console.log(`💥 ${err}`);
  }
}

// Display a country from the API on the page
function renderCountry(country) {
  const html = `
      <div class="country" data-country-id=${country.alpha3Code}>
        <img class="country__img" src="${country.flag}" />
        <div class="country__country">
          <h3 class="country__name">${country.name}</h3>
          <p class="country__row"><span>Population:</span>${country.population}</p>
          <p class="country__region"><span>Region:</span>${country.region}</p>
          <p class="country__capital"><span>Capital:</span>${country.capital}</p>
        </div>
      </div>
    `;

  displayCountries.insertAdjacentHTML('beforeend', html);
}

// Clear the country container
function clearDisplay() {
  displayCountries.innerHTML = '';
}

// Search for a country using an `input` field
input.addEventListener('keyup', e => {
  clearDisplay();

  const searchedCountries = countries.filter(country =>
    country.name.toLowerCase().includes(input.value.toLowerCase()),
  );

  sessionStorage.setItem('countries', JSON.stringify(searchedCountries));
  searchedCountries.forEach(country => renderCountry(country));
});

// Filter countries by region
regionInput.addEventListener('change', e => {
  clearDisplay();

  if (e.target.value === 'all')
    countries.forEach(country => renderCountry(country));

  const searchedRegion = countries.filter(country =>
    country.region.toLowerCase().includes(e.target.value),
  );

  sessionStorage.setItem('countries', JSON.stringify(searchedRegion));
  searchedRegion.forEach(country => renderCountry(country));
});

// Click on a country to see more detailed information on a separate page
displayCountries.addEventListener('click', e => {
  if (e.target.closest('.country')) {
    const ID = e.target.closest('.country').dataset.countryId;
    const countryDetails = countries.filter(
      country => country.alpha3Code === ID,
    );

    sessionStorage.setItem('country', JSON.stringify(countryDetails));
    window.location = 'details.html';
  }
});

getCountries();