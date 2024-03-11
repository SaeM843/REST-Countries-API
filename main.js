const url = " https://restcountries.com/v3.1/all";

const countriesCards = document.querySelector(".search__results--cards");
const select = document.querySelector(".search__regions");
const searchInput = document.querySelector("input");
const infoOnCard = document.querySelector(".country-info");

let allCountriesData;

//Fetch the data
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
  countriesCards.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("results--card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag" />
      <div class="country-info">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population: </b>${country.population.toLocaleString()}</p>
        <p><b>Region: </b>${country.region}</p>
        <p><b>Capital: </b>${country.capital?.[0]}</p>
      </div>
    `;
    countriesCards.append(countryCard);
  });
}

// Country by serach input
searchInput.addEventListener("input", (e) => {
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  displayCountries(filteredCountries);
});

select.addEventListener("change", (e) => {
  if (select.value == "placeholder") {
    fetch(url)
      .then((res) => res.json())
      .then(displayCountries);
  } else {
    fetch(`https://restcountries.com/v3.1/region/${select.value}`)
      .then((res) => res.json())
      .then(displayCountries);
  }
});

// Theme Switch
const header = document.querySelector(".header");
const btn = document.querySelector(".header__mode-switcher");
let darkMode = localStorage.getItem("dark");

const enableDarkMode = function () {
  document.body.classList.add("dark");
  header.classList.add("dark");
  searchInput.classList.add("dark");
  select.classList.add("dark");
  localStorage.setItem("dark", "enabled");
};

const disableDarkMode = function () {
  document.body.classList.remove("dark");
  header.classList.remove("dark");
  searchInput.classList.remove("dark");
  select.classList.remove("dark");
  localStorage.setItem("dark", "disabled");
};
if (darkMode === "enabled") {
  enableDarkMode();
}

btn.addEventListener("click", () => {
  darkMode = localStorage.getItem("dark");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
