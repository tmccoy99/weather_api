const classes = require("./weather_client");

let weather;

beforeEach(() => {
  weather = new classes.Weather(client);
});

it("after loading data for given city, getWeatherData returns the data", () => {
  weather.load("London");
  expect(weather.getWeatherData()).toStrictEqual();
});
