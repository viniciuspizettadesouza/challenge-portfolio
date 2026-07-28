export interface HourlyWeather {
  time: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  weather: string;
  description: string;
  icon: "sun" | "cloud" | "rain" | "partly-cloudy";
}

export interface CityForecast {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  updatedAt: string;
  hourly: HourlyWeather[];
}

const cityForecasts: CityForecast[] = [
  {
    city: "Florianópolis",
    country: "Brazil",
    latitude: -27.5949,
    longitude: -48.5482,
    updatedAt: "28 July · 18:00",
    hourly: [
      { time: "18:00", temp: 21, feelsLike: 21, humidity: 72, weather: "Clear", description: "clear sky", icon: "sun" },
      { time: "19:00", temp: 20, feelsLike: 20, humidity: 75, weather: "Clouds", description: "few clouds", icon: "partly-cloudy" },
      { time: "20:00", temp: 19, feelsLike: 19, humidity: 78, weather: "Clouds", description: "scattered clouds", icon: "partly-cloudy" },
      { time: "21:00", temp: 18, feelsLike: 18, humidity: 81, weather: "Clouds", description: "broken clouds", icon: "cloud" },
      { time: "22:00", temp: 18, feelsLike: 17, humidity: 83, weather: "Clouds", description: "broken clouds", icon: "cloud" },
      { time: "23:00", temp: 17, feelsLike: 17, humidity: 85, weather: "Clear", description: "clear sky", icon: "sun" },
    ],
  },
  {
    city: "London",
    country: "United Kingdom",
    latitude: 51.5072,
    longitude: -0.1276,
    updatedAt: "28 July · 22:00",
    hourly: [
      { time: "22:00", temp: 17, feelsLike: 16, humidity: 69, weather: "Clouds", description: "overcast clouds", icon: "cloud" },
      { time: "23:00", temp: 16, feelsLike: 15, humidity: 72, weather: "Rain", description: "light rain", icon: "rain" },
      { time: "00:00", temp: 16, feelsLike: 15, humidity: 75, weather: "Rain", description: "light rain", icon: "rain" },
      { time: "01:00", temp: 15, feelsLike: 14, humidity: 77, weather: "Clouds", description: "broken clouds", icon: "cloud" },
      { time: "02:00", temp: 15, feelsLike: 14, humidity: 78, weather: "Clouds", description: "scattered clouds", icon: "partly-cloudy" },
      { time: "03:00", temp: 14, feelsLike: 14, humidity: 80, weather: "Clear", description: "clear sky", icon: "sun" },
    ],
  },
  {
    city: "Lisbon",
    country: "Portugal",
    latitude: 38.7223,
    longitude: -9.1393,
    updatedAt: "28 July · 22:00",
    hourly: [
      { time: "22:00", temp: 24, feelsLike: 24, humidity: 55, weather: "Clear", description: "clear sky", icon: "sun" },
      { time: "23:00", temp: 23, feelsLike: 23, humidity: 58, weather: "Clear", description: "clear sky", icon: "sun" },
      { time: "00:00", temp: 22, feelsLike: 22, humidity: 61, weather: "Clear", description: "clear sky", icon: "sun" },
      { time: "01:00", temp: 21, feelsLike: 21, humidity: 64, weather: "Clouds", description: "few clouds", icon: "partly-cloudy" },
      { time: "02:00", temp: 20, feelsLike: 20, humidity: 66, weather: "Clouds", description: "few clouds", icon: "partly-cloudy" },
      { time: "03:00", temp: 20, feelsLike: 20, humidity: 67, weather: "Clear", description: "clear sky", icon: "sun" },
    ],
  },
  {
    city: "São Paulo",
    country: "Brazil",
    latitude: -23.5505,
    longitude: -46.6333,
    updatedAt: "28 July · 18:00",
    hourly: [
      { time: "18:00", temp: 20, feelsLike: 19, humidity: 60, weather: "Clouds", description: "scattered clouds", icon: "partly-cloudy" },
      { time: "19:00", temp: 19, feelsLike: 18, humidity: 63, weather: "Clouds", description: "broken clouds", icon: "cloud" },
      { time: "20:00", temp: 18, feelsLike: 17, humidity: 65, weather: "Clouds", description: "broken clouds", icon: "cloud" },
      { time: "21:00", temp: 17, feelsLike: 16, humidity: 69, weather: "Rain", description: "light rain", icon: "rain" },
      { time: "22:00", temp: 17, feelsLike: 16, humidity: 71, weather: "Rain", description: "light rain", icon: "rain" },
      { time: "23:00", temp: 16, feelsLike: 16, humidity: 74, weather: "Clouds", description: "overcast clouds", icon: "cloud" },
    ],
  },
];

export function expandHourlyForecast(hours: HourlyWeather[], total = 48) {
  const firstHour = Number(hours[0]?.time.slice(0, 2) ?? 0);

  return Array.from({ length: total }, (_, index) => {
    const source = hours[index % hours.length];
    const cycle = Math.floor(index / hours.length);
    const hour = (firstHour + index) % 24;
    const temperatureOffset = cycle === 0 ? 0 : Math.round(Math.sin(index / 4) * 2);

    return {
      ...source,
      time: `${String(hour).padStart(2, "0")}:00`,
      temp: source.temp + temperatureOffset,
      feelsLike: source.feelsLike + temperatureOffset,
      humidity: Math.min(96, source.humidity + cycle),
    };
  });
}

export const forecasts = cityForecasts.map((forecast) => ({
  ...forecast,
  hourly: expandHourlyForecast(forecast.hourly),
}));

export function findForecast(query: string) {
  const normalisedQuery = query.trim().toLocaleLowerCase();

  return forecasts.find(({ city, country }) =>
    `${city}, ${country}`.toLocaleLowerCase().includes(normalisedQuery),
  );
}

export function closestForecast(latitude: number, longitude: number) {
  return forecasts.reduce((closest, candidate) => {
    const closestDistance =
      (closest.latitude - latitude) ** 2 + (closest.longitude - longitude) ** 2;
    const candidateDistance =
      (candidate.latitude - latitude) ** 2 + (candidate.longitude - longitude) ** 2;

    return candidateDistance < closestDistance ? candidate : closest;
  });
}

export function addSearchHistory(history: string[], city: string) {
  return [city, ...history.filter((entry) => entry !== city)].slice(0, 5);
}
