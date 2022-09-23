import './css/styles.css';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onClick, DEBOUNCE_DELAY));

function onClick(e) {
    refs.countryListEl.innerHTML = '';
    refs.countryInfoEl.innerHTML = '';
    if (e.target.value !== "") {
         
        fetchCountries(e.target.value.trim()).then(countries => {
            renderCountriesList(countries)
        }
        );
    }
}
function renderCountriesList(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length >= 2 && countries.length <= 10) {
    const markup = countries
      .map(country => {
        return `<li class="country-item"><img class="country-item__image" src = "${country.flags.png}">${country.name.official}</li>`;
      })
      .join('');
    refs.countryListEl.insertAdjacentHTML('beforeend', markup);
  } else if (countries.length === 1) {
    refs.countryInfoEl.insertAdjacentHTML(
      'beforeend',
      `<h1 class="country-name"><img class="country-item__image" src = "${
        countries[0].flags.png
      }" alt = "${countries[0].name.official}">${
        countries[0].name.official
      }</h1>
  <p class="country-info">
  <b>Capital:</b> ${countries[0].capital}
  </p>
  <p class="country-info">
  <b>Population:</b> ${countries[0].population}
  </p>
  <p class="country-info">
  <b>Languages:</b> ${Object.values(countries[0].languages).join(', ')}
  </p>`
    );
  }
}

