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
let label = borderCountries.querySelector(".label");
const detailPage = document.querySelector(".country");
const countryBtn = document.querySelector(".country-btn");
const borderLabel = document.querySelector(".border-label");

const displayDetailsPage = function (data) {
  // const borderData = data[0];
  // console.log(data[0]);
  countryImg.src = `${data.flags.svg}`;
  countryNameHeading.innerText = `${data.name.common}`;
  population.innerText = `${data.population.toLocaleString("en-IN")}`;
  region.innerText = `${data.region}`;
  domain.innerText = `${data.tld.join(", ")}`;
  capital.innerText = `${data.capital}`;
  subRegion.innerText = `${data.subregion}`;
};

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    displayDetailsPage(country);

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

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then((data) => {
            const borderCountryName = data[0].name.common;

            label.innerHTML += `
            <button class="country-btn" id="${border}" type="button">${borderCountryName}</button>`;
          })
          .catch((error) => {
            console.error("Error fetching border country", error);
          });
      });
    }
  });

detailPage.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.classList.contains("country-btn")) {
    label.innerHTML = "";
    const borderId = e.target.id;
    fetch(`https://restcountries.com/v3.1/alpha/${borderId}`)
      .then((res) => res.json())
      .then(([data]) => {
        displayDetailsPage(data);

        if (data.name.nativeName) {
          nativeName.innerText = Object.values(data.name.nativeName)[0].common;
        } else {
          nativeName.innerText = data.name.common;
        }

        if (data.currencies) {
          currencies.innerText = Object.values(data.currencies)
            .map((currency) => currency.name)
            .join(",");
        }

        if (data.languages) {
          languages.innerText = Object.values(data.languages).join(", ");
        }
        // console.log(country);

        if (data.borders) {
          data.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((res) => res.json())
              .then((data) => {
                const borderCountryName = data[0].name.common;

                label.innerHTML += `
            <button class="country-btn" id="${border}" type="button">${borderCountryName}</button>`;
              })
              .catch((error) => {
                console.error("Error fetching border country", error);
              });
          });
        }
      });
  }
});

// Theme Switcher
const header = document.querySelector(".header");
const btn = document.querySelector(".header__mode-switcher");
let darkMode = localStorage.getItem("dark");

const enableDarkMode = function () {
  document.body.classList.add("dark");
  header.classList.add("dark");
  localStorage.setItem("dark", "enabled");
};

const disableDarkMode = function () {
  document.body.classList.remove("dark");
  header.classList.remove("dark");

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

//Back Button
const backBtn = document.querySelector(".back-btn");
backBtn.addEventListener("click", goBack);

function goBack() {
  history.back();
}
