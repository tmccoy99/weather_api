const apiKey = require("./apikey");

class WeatherClient {
  async fetchWeatherData(city) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    return fetch(apiUrl).then((response) => response.json());
  }
}

class Weather {
  constructor(client, io = console) {
    this.data;
    this.client = client;
    this.io = io;
  }

  async load(city) {
    this.data = await this.client.fetchWeatherData(city);
  }

  async loadContinuous(city) {
    this.data = await this.client.fetchWeatherData(city);
    setInterval(async () => {
      this.data = await this.client.fetchWeatherData(city);
    }, 2000);
  }

  getWeatherData() {
    return this.data;
  }

  async compareWith(city) {
    const otherData = await this.client.fetchWeatherData(city);
    return this.data.main.temp > otherData.main.temp
      ? this.data.name
      : otherData.name;
  }

  displayWeather() {
    this.io.log(this.#formatForDisplay("City", this.data.name));
    this.io.log(this.#formatForDisplay("Weather", this.data.weather[0].main));
    this.io.log(this.#formatForDisplay("Temperature", this.data.main.temp));
    this.io.log(
      this.#formatForDisplay("Feels like", this.data.main.feels_like)
    );
    this.io.log(
      this.#formatForDisplay("Humidity", `${this.data.main.humidity}%`)
    );
  }

  #formatForDisplay(key_str, value) {
    return `${key_str}:` + " ".repeat(14 - key_str.length) + `${value}`;
  }
}

module.exports = {
  Weather: Weather,
  WeatherClient: WeatherClient,
};
