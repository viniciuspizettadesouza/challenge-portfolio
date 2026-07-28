import rawData from "../../original/data.json";

export interface BusStop {
  line: number;
  stop: string;
  order: number;
  time: string;
}

export const stops = rawData.stops as BusStop[];

export function getLines(records: BusStop[]) {
  return [...new Set(records.map(({ line }) => line))].sort((a, b) => a - b);
}

export function getStopsForLine(records: BusStop[], line: number) {
  const ordered = records
    .filter((record) => record.line === line)
    .sort((a, b) => a.order - b.order || a.stop.localeCompare(b.stop));

  return [...new Map(ordered.map((record) => [record.stop, record])).values()];
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function getTimesForStop(records: BusStop[], line: number, stop: string) {
  return records
    .filter((record) => record.line === line && record.stop === stop)
    .map(({ time }) => time)
    .sort((a, b) => timeToMinutes(a) - timeToMinutes(b));
}

export function getUniqueStops(
  records: BusStop[],
  query = "",
  direction: "ascending" | "descending" = "ascending",
) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const unique = [...new Set(records.map(({ stop }) => stop))].filter((stop) =>
    stop.toLocaleLowerCase().includes(normalizedQuery),
  );

  return unique.sort((a, b) =>
    direction === "ascending" ? a.localeCompare(b) : b.localeCompare(a),
  );
}
