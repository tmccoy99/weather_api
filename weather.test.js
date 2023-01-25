const { Weather } = require("./weather");
const classes = require("./weather");

let weather;
const mockClient = {
  fetchWeatherData: jest.fn(),
};

beforeEach(() => {
  weather = new classes.Weather(mockClient);
});

it("load(city) loads city weather data, getWeatherData() returns it", (done) => {
  mockClient.fetchWeatherData.mockResolvedValueOnce({
    name: "London",
    temp: 22,
  });
  weather.load("London").then(() => {
    expect(mockClient.fetchWeatherData).toHaveBeenCalledWith("London");
    const data = weather.getWeatherData();
    expect(data.name).toBe("London");
    expect(data.temp).toBe(22);
    done();
  });
});

it("compareWith(city) returns the name of the city with the highest temperature out of the loaded city and the inputted city", (done) => {
  mockClient.fetchWeatherData.mockResolvedValueOnce({
    name: "London",
    main: { temp: 22 },
  });
  weather
    .load("London")
    .then(() => {
      expect(mockClient.fetchWeatherData).toHaveBeenCalledWith("London");
      mockClient.fetchWeatherData.mockResolvedValueOnce({
        name: "Brighton",
        main: { temp: 25 },
      });
      return weather.compareWith("Brighton");
    })
    .then((result) => {
      expect(mockClient.fetchWeatherData).toHaveBeenCalledWith("Brighton");
      expect(result).toBe("Brighton");
      done();
    });
});

it("displayWeather() logs formattted information from saved data", (done) => {
  io = { log: jest.fn() };
  weather = new Weather(mockClient, io);
  mockClient.fetchWeatherData.mockResolvedValueOnce({
    name: "London",
    main: {
      temp: 20,
      feels_like: 22,
      humidity: 55,
    },
    weather: [{ main: "Drizzle" }],
  });
  weather.load("London").then(() => {
    weather.displayWeather();
    expect(io.log).toHaveBeenCalledWith("City:" + " ".repeat(10) + "London");
    expect(io.log).toHaveBeenCalledWith("Weather:" + " ".repeat(7) + "Drizzle");
    expect(io.log).toHaveBeenCalledWith("Temperature:" + " ".repeat(3) + "20");
    expect(io.log).toHaveBeenCalledWith("Feels like:" + " ".repeat(4) + "22");
    expect(io.log).toHaveBeenCalledWith("Humidity:" + " ".repeat(6) + "55%");
    done();
  });
});

it("After data is loaded, refreshes every 2 seconds", async (done) => {
  mockClient.fetchWeatherData.mockResolvedValueOnce({
    name: "London",
    main: {
      temp: 20,
      feels_like: 22,
      humidity: 55,
    },
    weather: [{ main: "Drizzle" }],
  });
  await weather.loadContinuous("London");
  expect(weather.getWeatherData().main.temp).toBe(20);
  mockClient.fetchWeatherData.mockResolvedValueOnce({
    name: "London",
    main: {
      temp: 25,
      feels_like: 22,
      humidity: 55,
    },
    weather: [{ main: "Drizzle" }],
  });
  setTimeout(() => {}, 2500).then(() => {
    expect(weather.getWeatherData().main.temp).toBe(25);
    done();
  });
});
