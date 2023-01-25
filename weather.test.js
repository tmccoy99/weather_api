const classes = require("./weather");

let weather;
const mockClient = {
  fetchWeatherData: jest.fn(),
};

beforeEach(() => {
  weather = new classes.Weather(mockClient);
});

it("load method loads city weather data, getWeatherData returns it", (done) => {
  mockClient.fetchWeatherData.mockResolvedValueOnce({
    city: "London",
    temp: 22,
  });
  weather.load("London").then(() => {
    expect(mockClient.fetchWeatherData).toHaveBeenCalledWith("London");
    const data = weather.getWeatherData();
    expect(data.city).toBe("London");
    expect(data.temp).toBe(22);
    done();
  });
});
