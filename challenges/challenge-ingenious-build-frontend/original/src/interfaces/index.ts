export interface Stop {
  line: number;
  stop: string;
  order: number;
  time: string;
}

export interface GroupedStops {
  [stopName: string]: Stop[];
}

export interface RootState {
  stops: Stop[];
  groupedStopsByLineKeys: string[];
  busLineStops: GroupedStops | null;
  busLineStopsKeys: string[] | null;
  selectedBusLineStop: null;
  sortedBusLineStops: Stop[] | null;
}
