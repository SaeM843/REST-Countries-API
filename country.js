const countryName = new URLSearchParams(location.search).get("name");
const countryImg = document.querySelector(".country__details img");
const countryNameHeading = document.querySelector(
  ".country__details--container h1"
);
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const domain = document.querySelector(".domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".language");

const borderCountries = document.querySelector(".country__details--border");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    // console.log(country);
    countryImg.src = country.flags.svg;
    countryNameHeading.innerText = country.name.common;
    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;
    domain.innerText = country.tld.join(", ");
    capital.innerText = country.capital;
    subRegion.innerText = country.subregion;

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(",");
    }

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    }
    // console.log(country);

    console.log(country.borders);
    if (country.borders) {
      country.borders.forEach((border) => {
        console.log(border);
        const borderCountryTags = document.createElement("a");
        borderCountryTags.innerText = border;
        borderCountryTags.href = `country.html?name=${country.name}`;
        borderCountries.append(borderCountryTags);
      });
    }
  });
