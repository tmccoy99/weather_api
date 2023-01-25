const apiKey = require("./apikey");

class WeatherClient {
  async fetchWeatherData(city) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    return fetch(apiUrl).then((response) => response.json());
  }
}
const client = new WeatherClient();

client.fetchWeatherData("Leeds").then((weatherData) => {
  console.log(`Weather data for ${weatherData.name}:`);
  console.log(weatherData);
});
