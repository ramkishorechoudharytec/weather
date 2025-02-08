const searchBtn = document.getElementById('searchBtn');
const input_box = document.querySelector('.input-box');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const winds = document.getElementById('winds');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const weather_details = document.querySelector('.weather-details');
const weather_box = document.querySelector('.weather-box');

async function checkweather(city) {
    const api_key = "7e0465f4cbcba58dce48d98c75da77a0";
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(api_url).then(response => response.json());

    console.log(weather_data);


    if (weather_data.cod === "404") {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        weather_details.style.display = "none";
        weather_box.style.display = "none";
        console.log("City not found");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    weather_details.style.display = "flex";
    weather_box.style.display = "flex";

    // Convert from Kelvin to Celsius
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    winds.innerHTML = `${weather_data.wind.speed} km/h`;

    if (weather_data.weather[0].main === 'Clouds') {
        weather_img.src = "./assets/cloud.png";
    } 
    else if (weather_data.weather[0].main === 'Rain') {
        weather_img.src = "./assets/Rain.png";
    } 
    else if (weather_data.weather[0].main === 'Clear') {
        weather_img.src = "./assets/Clear.png";
    } 
    else if (weather_data.weather[0].main === 'Mist') {
        weather_img.src = "./assets/Mist.png";
    } 
    else {
        weather_img.src = "./assets/Rain.png";
    }
}

searchBtn.addEventListener('click', () => {
    checkweather(input_box.value);
});
