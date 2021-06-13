'use strict';

const container = document.querySelector('.container');
const textTheme = document.querySelector('.change-text');
const input = document.querySelector('.input-country');
const regionInput = document.querySelector('#region');
const displayCountries = document.querySelector('.countries');

let countries = [];

// Get all countries from the API
async function getCountries() {
  try {
    const res = await fetch(`https://restcountries.eu/rest/v2/all`);
    if (!res) throw new Error('Problem getting data 😲');

    countries = await res.json();
    countries.forEach(item => renderCountry(item));
    sessionStorage.setItem('countries', JSON.stringify(countries));
  } catch (err) {
    alert(`💥 ${err}`);
  }
}

// Display a country from the API on the page
function renderCountry(country) {
  const html = `
      <div class="country" data-country-id=${country.alpha3Code}>
        <img class="country__img" src="${country.flag}" />
        <div class="country__country">
          <h2 class="heading-secondary u-mb-md">${country.name}</h2>
          <p class="additional-info u-mt-sm u-mb-sm"><span class="additional-info--bold">Population: </span>${country.population.toLocaleString()}</p>
          <p class="additional-info u-mt-sm u-mb-sm"><span class="additional-info--bold">Region: </span>${country.region}</p>
          <p class="additional-info u-mt-sm u-mb-sm"><span class="additional-info--bold">Capital: </span>${
            country.capital
          }</p>
        </div>
      </div>
    `;

  displayCountries.insertAdjacentHTML('beforeend', html);
}

// Clear the country container
function clearDisplay() {
  displayCountries.innerHTML = '';
}

// EVENT HANDLERS

// Search for a country using an `input` field
input.addEventListener('keyup', e => {
  clearDisplay();

  const searchedCountries = countries.filter(country =>
    country.name.toLowerCase().includes(input.value.toLowerCase()),
  );

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