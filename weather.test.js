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
