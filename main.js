const url = " https://restcountries.com/v3.1/all";

const countriesCards = document.querySelector(".search__results--cards");
const countryCard = countriesCards.children;
// const card = document.querySelector(".results--card");
const select = document.querySelector("select");
const dropdownOptions = document.querySelectorAll(".option-box");
const region = document.querySelectorAll(".info-region");

const searchInput = document.querySelector("input");

const btn = document.querySelector(".header__mode-switcher");
const header = document.querySelector(".header");
const searchSection = document.querySelector(".search");

let allCountriesData;

//Fetch the data
// const LoadAPI = function () {
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) =>
//       data.forEach((data) => {
//         displayCountries(data);
//         allCountriesData = data;
//       })
//     );
// };

const LoadAPI = function () {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCountries(data);
      allCountriesData = data;
    });
};

LoadAPI();

//  Style numbers
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Display all countries

function displayCountries(data) {
  data.forEach((data) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("results--card");
    newDiv.innerHTML = `
    <img class="flag-img" src="${data.flags.svg}" />
      <div class="country-info light">
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
  });
}

//Display coutries by region
const byRegion = function () {
  fetch(`https://restcountries.com/v3.1/region/${select.value}`)
    .then((res) => res.json())
    .then((data) => displayCountries(data));
};

select.addEventListener("change", byRegion);

// Country by serach input

// searchInput.addEventListener("input", (e) => {
//   const filteredCountries = allCountriesData.filter((country) =>
//     country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
//   );
//   displayCountries(filteredCountries);
// });

//Theme Switch

btn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  header.classList.toggle("light");
  searchInput.classList.toggle("light");
  select.classList.toggle("light");
  countriesCards.classList.toggle("light");
  searchSection.classList.toggle("light");
});
