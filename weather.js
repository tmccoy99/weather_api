const apiKey = require("./apikey");

class WeatherClient {
  async fetchWeatherData(city) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    return fetch(apiUrl).then((response) => response.json());
  }
}

class Weather {}

module.exports = {
  Weather: Weather,
  WeatherClient: WeatherClient,
};
