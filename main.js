const url = " https://restcountries.com/v3.1/all";

const countriesCards = document.querySelector(".search__results--cards");
const countryCard = countriesCards.children;
const select = document.querySelector("select");
const dropdownOptions = document.querySelectorAll(".option-box");
const region = document.querySelectorAll(".info-region");

//Fetch the data
const LoadAPI = function () {
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.forEach((data) => displayCountries(data)));
};
LoadAPI();

//  Style numbers
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Display all countries

function displayCountries(data) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("results--card");
  newDiv.innerHTML = `
    <img class="flag-img" src="${data.flags.svg}" />
      <div class="country-info">
      <span class="country-name">${data.name.common}</span>
      <ul class="country-properies">
        <li class="property-box">
          Population: <span class="property">${numberWithCommas(
            data.population
          )}</span>
        </li>
        <li class="property-box">
          Region: <span class="property info-region">${data.region}</span>
        </li>
        <li class="property-box">
          Capital: <span class="property">${data.capital}</span>
        </li>
      </ul>
  `;
  countriesCards.appendChild(newDiv);
}

//Display coutries by region
select.addEventListener("change", displayByRegion);
function displayByRegion(data) {
  const regionValue = select.value;

  if (regionValue != "" && regionValue === data.region) {
    countriesCards.style.display = "block";
  }
}
