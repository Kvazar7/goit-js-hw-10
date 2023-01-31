import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import SERCH from './js/fetchCountries.js'

const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryData = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputCountry.addEventListener(
    "input", 
    debounce(() => {
        
    let name = inputCountry.value.trim()
    console.log(name)

        if (inputCountry.value === "")
            return clearAll();
        else
            
    SERCH.fetchCountries(name)
        .then((data) => {
            if (data.status === 404) 
                return Notiflix.Notify.warning("Oops, there is no country with that name");
            else if (data.length > 10)
                return Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
            else if (data.length === 1)
                return data.reduce((markup, data) =>
                creatMarkUp(data) + markup, "");
            else return data.reduce((markup, data) =>
                creatMarkUplist(data) + markup, "");
        })

        .then( updData || updList)

  }, DEBOUNCE_DELAY)
);

function creatMarkUp( data ) {
    const allLanguage = Object.values(data.languages)
    return `<img src=${data.flags.svg} class="country-flag" alt="country flag" width="300" height="200">
        <h2 class="country-name">${data.name.official}</h2>
        <p class="capital">Capital: ${data.capital}</p>
        <p class="population">Population: ${data.population}</p>
        <p class="languages">Languages: ${allLanguage}</p>`
};

function creatMarkUplist( data ) {
    return `<li>
        <img src=${data.flags.svg} class="country-flag" alt="country flag" width="30" height="20">
        <h2 class="country-name">${data.name.official}</h2>
        </li>`
};

function clearAll() {
    countryList.innerHTML = "";
    countryData.innerHTML = "";
};
function updList(markup) {
    countryList.innerHTML = markup
};
function updData(markup) {
    if (markup !== undefined)
        countryData.innerHTML = markup
    else 
        return
    console.log(markup)
};

