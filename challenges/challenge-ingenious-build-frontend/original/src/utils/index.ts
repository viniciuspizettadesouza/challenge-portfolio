import { Stop, GroupedStops } from "@/interfaces";

export function groupStopsByLine(stops: Stop[]) {
  const groupedStops: { [key: number]: Stop[] } = stops.reduce(
    (result: { [key: number]: Stop[] }, stop) => {
      const { line } = stop;
      if (!result[line]) {
        result[line] = [];
      }
      result[line].push(stop);
      return result;
    },
    {}
  );

  return groupedStops;
}

export function groupStopsByStopName(stops: Stop) {
  return stops.reduce((groupedStops: GroupedStops, stop: Stop) => {
    const { stop: stopName } = stop;
    groupedStops[stopName] = [...(groupedStops[stopName] || []), stop];
    return groupedStops;
  }, {});
}

export function parseTime(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const dateObj = new Date();
  dateObj.setHours(hours, minutes, 0, 0);
  return dateObj;
}
