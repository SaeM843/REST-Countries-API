const url = "https://restcountries.com/v2/all";

const countriesCards = document.querySelector(".search__results--cards");

//Fetch the data
const LoadAPI = function () {
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.forEach((data) => displayCountries(data)));
};

LoadAPI();

function displayCountries(data) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("results--card");
  newDiv.innerHTML = `
    <img class="flag-img" src="${data.flag}" />
      <div class="country-info">
      <span class="country-name">${data.name}</span>
      <ul class="country-properies">
        <li class="property-box">
          Population: <span class="property">${data.population}</span>
        </li>
        <li class="property-box">
          Region: <span class="property">${data.region}</span>
        </li>
        <li class="property-box">
          Capital: <span class="property">${data.capital}</span>
        /li>
      </ul>
  `;
  countriesCards.appendChild(newDiv);
}
