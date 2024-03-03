const url = " https://restcountries.com/v3.1/all";

const countriesCards = document.querySelector(".search__results--cards");
const countryCard = countriesCards.children;
const cards = document.querySelector(".results--card");
const select = document.querySelector("select");
const dropdownOptions = document.querySelectorAll(".option-box");

// const regionOnCard = document.querySelector(".region");

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

// const LoadAPI = function () {
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       displayCountries(data);
//       allCountriesData = data;
//     });
// };

const LoadAPI = function () {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((data) => displayCountries(data));
    });
};

LoadAPI();

//  Style numbers
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Display all countries

// function displayCountries(data) {
//   data.forEach((data) => {
//     const newDiv = document.createElement("div");
//     newDiv.classList.add("results--card");
//     newDiv.innerHTML = `
//       <div class="flag-img">
//         <img src="${data.flags.svg}" />
//       </div>
//       <div class="country-info light">
//       <span class="country-name">${data.name.common}</span>
//       <ul class="country-properies">
//         <li class="property-box">
//           Population: <span class="property">${numberWithCommas(
//             data.population
//           )}</span>
//         </li>
//         <li class="region property-box">
//           Region: <span class="property info-region">${data.region}</span>
//         </li>
//         <li class="property-box">
//           Capital: <span class="property">${data.capital}</span>
//         </li>
//       </ul>
//   `;
//     countriesCards.appendChild(newDiv);
//   });
// }

function displayCountries(data) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("results--card");
  newDiv.innerHTML = `
      <div class="flag-img">
        <img src="${data.flags.svg}" />
      </div>
      <div class="country-info">
      <span class="country-name">${data.name.common}</span>
      <ul class="country-properies">
        <li class="property-box">
          Population: <span class="property">${numberWithCommas(
            data.population
          )}</span>
        </li>
        <li class="region property-box">
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
// const byRegion = function () {
//   fetch(`https://restcountries.com/v3.1/region/${select.value}`)
//     .then((res) => res.json())
//     .then((data) => displayCountries(data));
// };

// function byRegion() {
//   const selectedRigion =
//     select.options[select.selectedIndex].text.toLowerCase();
//   console.log(selectedRigion);

//   // const regions = document.getElementsByTagName("li");

//   cards.forEach((card) => {
//     if (regionOnCard.innerText.toLowerCase().indexOf(selectedRigion) != -1) {
//       regionOnCard.parentElement.parentElement.style.display = "block";
//     } else {
//       regionOnCard.parentElement.parentElement.style.display = "none";
//     }
//   });
// }

//select.addEventListener("change", byRegion);

// Country by serach input
const countryName = document.getElementsByClassName("country-name");
searchInput.addEventListener("input", (e) => {
  Array.from(countryName).forEach((country) => {
    if (
      country.innerText.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      country.parentElement.parentElement.style.display = "block";
    } else {
      country.parentElement.parentElement.style.display = "none";
    }
  });
});

//Theme Switch

btn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  header.classList.toggle("light");
  searchInput.classList.toggle("light");
  select.classList.toggle("light");
  cards.classList.toggle("light");
  searchSection.classList.toggle("light");
});

const region = document.getElementsByClassName("info-region");
const regionOnCard = document.querySelector(".region");
// dropdownOptions.forEach((option) => option.addEventListener("change"));
dropdownOptions.forEach((option) =>
  option.addEventListener("change", (e) => {
    console.log("hi");
    Array.from(region).forEach((reg) => {
      if (reg.innerText.includes(option.innerText)) {
        reg.parentElement.parentElement.style.display = "block";
      } else {
        reg.parentElement.parentElement.style.display = "none";
      }
    });
  })
);

// function changeByRegion(e) {
//   e.preventDefult();
//   console.log("hi");
// Array.from(region).forEach((reg) => {
//   if (
//     reg.innerText.toLowerCaese().includes(region.innerHTML.toLowerCaese())
//   ) {
//     reg.parentElement.parentElement.style.display = "block";
//   } else {
//     reg.parentElement.parentElement.style.display = "none";
//   }
// });
// }
