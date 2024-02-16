const inputBox = document.querySelector(".input-box");
const searchbtn = document.getElementById("searchbtn");
const weather_img = document.querySelector(".weather-img");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const feels_like = document.getElementById("feels-like");
const pressure = document.getElementById("pressure");
const error = document.querySelector(".error");
const main = document.querySelector(".main");
const country = document.getElementById("country");

// Api
async function checkWeather(city) {
  const key = "94983edcce42ec6b74517e2aef4ada08";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

  const data = await fetch(url).then((response) => response.json());
  console.log(data);

  // error-function

  if (data.cod === `404`) {
    error.style.display = "flex";
    main.style.display = "none";
    console.log("error");
    return;
  }
  error.style.display = "none";
  main.style.display = "flex";

  // fetching-data-into-html
  // temprature
  temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
  // description
  desc.innerHTML = `${data.weather[0].description} in ${city}`;
  // humidity
  humidity.innerHTML = `${data.main.humidity}%`;
  // wind-speed
  wind_speed.innerHTML = `${data.wind.speed}Km/H`;
  // feels-like
  feels_like.innerHTML = `${Math.round(data.main.feels_like - 273.15)}°C`;
  // pressure
  pressure.innerHTML = `${data.main.pressure} mBar`;
  // country
  country.innerHTML = `${data.sys.country}`;
  // image-data
  switch (data.weather[0].main) {
    case "Rain":
      weather_img.src = "img/raining.png";
      break;
    case "Clouds":
      weather_img.src = "img/clouds.png";
      break;
    case "Clear":
      weather_img.src = "img/sun.png";
      break;
    case "Mist":
      weather_img.src = "img/mist.png";
      break;
    case "Snow":
      weather_img.src = "img/snowfall.png";
    default:
      break;
  }
}

searchbtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
