const url = "https://restcountries.com/v3.1/all";

//Fetch the data
const LoadAPI = function () {
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCountries(data));
};

// function displayCountries()
