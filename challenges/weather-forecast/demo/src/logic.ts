import {
  forecasts,
  locationLabel,
  type ForecastHour,
  type LocationForecast,
} from "./fixtures";

export { forecasts, locationLabel } from "./fixtures";
export type {
  ForecastHour,
  LocationForecast,
  WeatherCondition,
} from "./fixtures";

export function normalizeLocation(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLocaleLowerCase();
}

export function findForecast(query: string) {
  const normalized = normalizeLocation(query);
  if (!normalized) return undefined;
  return forecasts.find((forecast) => {
    const searchable = normalizeLocation(
      `${forecast.city} ${forecast.region} ${forecast.country} ${locationLabel(forecast)}`,
    );
    return (
      searchable.includes(normalized) ||
      normalized.includes(normalizeLocation(forecast.city)) ||
      normalized.includes(normalizeLocation(forecast.region))
    );
  });
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function distanceInKilometers(
  latitudeA: number,
  longitudeA: number,
  latitudeB: number,
  longitudeB: number,
) {
  const earthRadius = 6371;
  const latitudeDelta = toRadians(latitudeB - latitudeA);
  const longitudeDelta = toRadians(longitudeB - longitudeA);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(toRadians(latitudeA)) *
      Math.cos(toRadians(latitudeB)) *
      Math.sin(longitudeDelta / 2) ** 2;
  return 2 * earthRadius * Math.asin(Math.sqrt(haversine));
}

export function nearestForecast(latitude: number, longitude: number) {
  return forecasts.reduce((nearest, candidate) =>
    distanceInKilometers(
      latitude,
      longitude,
      candidate.latitude,
      candidate.longitude,
    ) <
    distanceInKilometers(
      latitude,
      longitude,
      nearest.latitude,
      nearest.longitude,
    )
      ? candidate
      : nearest,
  );
}

export function comparisonHours(hours: ForecastHour[]) {
  return hours.slice(0, 6);
}

export function addSearchHistory(
  history: string[],
  location: LocationForecast,
) {
  const label = locationLabel(location);
  return [
    label,
    ...history.filter(
      (item) => normalizeLocation(item) !== normalizeLocation(label),
    ),
  ].slice(0, 5);
}
