export type WeatherCondition = "Clear" | "Clouds" | "Rain" | "Partly cloudy";

export interface ForecastHour {
  index: number;
  label: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  condition: WeatherCondition;
  description: string;
}

export interface LocationForecast {
  id: string;
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  startHour: number;
  hours: ForecastHour[];
}

type LocationSeed = Omit<LocationForecast, "hours"> & {
  temperature: number;
  humidity: number;
  conditions: WeatherCondition[];
};

const seeds: LocationSeed[] = [
  {
    id: "florianopolis",
    city: "Florianópolis",
    region: "Santa Catarina",
    country: "Brazil",
    latitude: -27.5949,
    longitude: -48.5482,
    startHour: 18,
    temperature: 21,
    humidity: 72,
    conditions: ["Clear", "Partly cloudy", "Clouds", "Rain"],
  },
  {
    id: "sao-paulo",
    city: "São Paulo",
    region: "São Paulo",
    country: "Brazil",
    latitude: -23.5505,
    longitude: -46.6333,
    startHour: 18,
    temperature: 20,
    humidity: 60,
    conditions: ["Partly cloudy", "Clouds", "Rain", "Clouds"],
  },
  {
    id: "lisbon",
    city: "Lisbon",
    region: "Lisbon",
    country: "Portugal",
    latitude: 38.7223,
    longitude: -9.1393,
    startHour: 22,
    temperature: 24,
    humidity: 55,
    conditions: ["Clear", "Clear", "Partly cloudy", "Clear"],
  },
  {
    id: "london",
    city: "London",
    region: "England",
    country: "United Kingdom",
    latitude: 51.5072,
    longitude: -0.1276,
    startHour: 22,
    temperature: 17,
    humidity: 69,
    conditions: ["Clouds", "Rain", "Rain", "Partly cloudy"],
  },
];

const descriptions: Record<WeatherCondition, string> = {
  Clear: "clear sky",
  Clouds: "overcast clouds",
  Rain: "light rain",
  "Partly cloudy": "scattered clouds",
};

function expand(seed: LocationSeed): ForecastHour[] {
  return Array.from({ length: 48 }, (_, index) => {
    const hour = (seed.startHour + index) % 24;
    const day = Math.floor((seed.startHour + index) / 24);
    const condition =
      seed.conditions[Math.floor(index / 3) % seed.conditions.length];
    const curve = Math.round(Math.sin((index - 4) / 5) * 3);
    const temperature = seed.temperature + curve - day;
    return {
      index,
      label: `${day ? `Day ${day + 1} · ` : ""}${String(hour).padStart(2, "0")}:00`,
      temperature,
      feelsLike: temperature - (condition === "Rain" ? 1 : 0),
      humidity: Math.min(
        96,
        seed.humidity + Math.round(index / 4) + (condition === "Rain" ? 7 : 0),
      ),
      condition,
      description: descriptions[condition],
    };
  });
}

export const forecasts: LocationForecast[] = seeds.map((seed) => ({
  ...seed,
  hours: expand(seed),
}));

export function locationLabel(location: LocationForecast) {
  return `${location.city}, ${location.region}, ${location.country}`;
}
