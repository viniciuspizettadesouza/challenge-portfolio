export interface ForecastHour {
  hour: number;
  condition: "Clear" | "Clouds" | "Rain";
  temperature: number;
  feelsLike: number;
  humidity: number;
}

export interface LocationForecast {
  address: string;
  latitude: number;
  longitude: number;
  hours: ForecastHour[];
}

export const locationForecasts: LocationForecast[] = [
  {
    address: "Florianópolis, Santa Catarina, Brazil",
    latitude: -27.5949,
    longitude: -48.5482,
    hours: [
      { hour: 18, condition: "Clear", temperature: 21, feelsLike: 21, humidity: 72 },
      { hour: 19, condition: "Clouds", temperature: 20, feelsLike: 20, humidity: 75 },
      { hour: 20, condition: "Clouds", temperature: 19, feelsLike: 19, humidity: 78 },
      { hour: 21, condition: "Clouds", temperature: 18, feelsLike: 18, humidity: 81 },
      { hour: 22, condition: "Rain", temperature: 18, feelsLike: 17, humidity: 83 },
      { hour: 23, condition: "Clear", temperature: 17, feelsLike: 17, humidity: 85 },
    ],
  },
  {
    address: "London, United Kingdom",
    latitude: 51.5072,
    longitude: -0.1276,
    hours: [
      { hour: 22, condition: "Clouds", temperature: 17, feelsLike: 16, humidity: 69 },
      { hour: 23, condition: "Rain", temperature: 16, feelsLike: 15, humidity: 72 },
      { hour: 0, condition: "Rain", temperature: 16, feelsLike: 15, humidity: 75 },
      { hour: 1, condition: "Clouds", temperature: 15, feelsLike: 14, humidity: 77 },
      { hour: 2, condition: "Clouds", temperature: 15, feelsLike: 14, humidity: 78 },
      { hour: 3, condition: "Clear", temperature: 14, feelsLike: 14, humidity: 80 },
    ],
  },
  {
    address: "Lisbon, Portugal",
    latitude: 38.7223,
    longitude: -9.1393,
    hours: [
      { hour: 22, condition: "Clear", temperature: 24, feelsLike: 24, humidity: 55 },
      { hour: 23, condition: "Clear", temperature: 23, feelsLike: 23, humidity: 58 },
      { hour: 0, condition: "Clear", temperature: 22, feelsLike: 22, humidity: 61 },
      { hour: 1, condition: "Clouds", temperature: 21, feelsLike: 21, humidity: 64 },
      { hour: 2, condition: "Clouds", temperature: 20, feelsLike: 20, humidity: 66 },
      { hour: 3, condition: "Clear", temperature: 20, feelsLike: 20, humidity: 67 },
    ],
  },
];

export function findLocationForecast(query: string) {
  const normalisedQuery = query.trim().toLocaleLowerCase();

  if (!normalisedQuery) return undefined;

  return locationForecasts.find(({ address }) =>
    address.toLocaleLowerCase().includes(normalisedQuery),
  );
}

export function nearestLocationForecast(latitude: number, longitude: number) {
  return locationForecasts.reduce((closest, candidate) => {
    const closestDistance =
      (closest.latitude - latitude) ** 2 + (closest.longitude - longitude) ** 2;
    const candidateDistance =
      (candidate.latitude - latitude) ** 2 + (candidate.longitude - longitude) ** 2;

    return candidateDistance < closestDistance ? candidate : closest;
  });
}

export function hourLabels(hours: ForecastHour[]) {
  return hours.map(({ hour }, index) =>
    index === 0 ? "Now" : `${String(hour).padStart(2, "0")}:00`,
  );
}
