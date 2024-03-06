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

select.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/${select.value}`)
    .then((res) => res.json())
    .then((data) => displayCountries(data));
});

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
searchInput.addEventListener("input", (e) => {
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  displayCountries(filteredCountries);
});
// const countryName = document.getElementsByClassName("country-name");
// searchInput.addEventListener("input", (e) => {
//   Array.from(countryName).forEach((country) => {
//     if (
//       country.innerText.toLowerCase().includes(searchInput.value.toLowerCase())
//     ) {
//       country.parentElement.parentElement.style.display = "block";
//     } else {
//       country.parentElement.parentElement.style.display = "none";
//     }
//   });
// });

//Theme Switch
const searchSection = document.querySelector(".search");
const header = document.querySelector(".header");
const btn = document.querySelector(".header__mode-switcher");

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  header.classList.toggle("light");
  searchInput.classList.toggle("dark");
  select.classList.toggle("dark");
  infoOnCard.classList.toggle("light");
  countriesCards.classList.toggle("dark");
  // cards.classList.toggle("light");
  // searchSection.classList.toggle("light");
});

// const region = document.getElementsByClassName("info-region");
// const regionOnCard = document.querySelector(".region");
// dropdownOptions.forEach((option) => option.addEventListener("change"));
// dropdownOptions.forEach((option) =>
//   option.addEventListener("change", (e) => {
//     console.log("hi");
//     Array.from(region).forEach((reg) => {
//       if (reg.innerText.includes(option.innerText)) {
//         reg.parentElement.parentElement.style.display = "block";
//       } else {
//         reg.parentElement.parentElement.style.display = "none";
//       }
//     });
//   })
// );
// select.addEventListener("change", () => {
//   const op = select.options[select.selectedIndex];
//   //console.log(op.value);
//   if (region.innerText === op.value) {
//     region.parentElement.parentElement.parentElement.parentElement.style.display =
//       "block";
//   } else {
//     region.parentElement.parentElement.parentElement.parentElement.style.display =
//       "none";
//   }
// });
select.addEventListener("change", (e) => {
  console.log(select.value);
  fetch(`https://restcountries.com/v3.1/region/${select.value}`)
    .then((res) => res.json())
    .then(displayCountries);
});
