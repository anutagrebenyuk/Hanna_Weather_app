//Current date
let now = new Date();
function formattedDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = months[date.getMonth()];
  let day = days[date.getDay()];
  let dateNow = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = document.querySelector("#curr-date");
  formattedDate.innerHTML = `${day} ${month} ${dateNow}, ${hours}:${minutes}`;
}
formattedDate(now);
//or formattedDate(new Date());

//To update name of searched city
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  console.log(response);
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#clouds").innerHTML =
    response.data.weather[0].description;
}

function updateCity(event) {
  event.preventDefault();
  let apiKey = "7017d65a526be0558677d25fee70c883";
  let city = document.querySelector("#cityEntered").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", updateCity);

//to show current geolaction and temperature there
function showPosition() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "7017d65a526be0558677d25fee70c883";
  let units = "metric";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}
let buttonCurrLocation = document.querySelector(".btn-location");
buttonCurrLocation.addEventListener("click", showPosition);

//Challenge 3
function convertToCelcius(event) {
  event.preventDefault();
  let celciusTemp = document.querySelector("#temperature");
  celciusTemp.innerHTML = 23;
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#temperature");
  fahrenheitTemp.innerHTML = 73;
  //Math.round((temperature * 9) / 5 + 32);
}
let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", convertToCelcius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
