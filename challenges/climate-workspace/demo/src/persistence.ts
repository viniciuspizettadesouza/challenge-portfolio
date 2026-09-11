export const WEATHER_STORAGE_KEY = "challenge-portfolio/weather-forecast/v1";

export interface WeatherState {
  version: 1;
  selectedId: string;
  history: string[];
}

type StorageReader = Pick<Storage, "getItem">;
type StorageWriter = Pick<Storage, "setItem">;

export function readWeatherState(
  storage?: StorageReader,
): WeatherState | undefined {
  try {
    if (!storage) return undefined;
    const value: unknown = JSON.parse(
      storage.getItem(WEATHER_STORAGE_KEY) ?? "null",
    );
    if (!value || typeof value !== "object") return undefined;
    const state = value as Partial<WeatherState>;
    if (
      state.version !== 1 ||
      typeof state.selectedId !== "string" ||
      !Array.isArray(state.history)
    )
      return undefined;
    if (!state.history.every((item) => typeof item === "string"))
      return undefined;
    return {
      version: 1,
      selectedId: state.selectedId,
      history: state.history.slice(0, 5),
    };
  } catch {
    return undefined;
  }
}

export function writeWeatherState(
  storage: StorageWriter | undefined,
  state: WeatherState,
) {
  try {
    if (!storage) return false;
    storage.setItem(WEATHER_STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
