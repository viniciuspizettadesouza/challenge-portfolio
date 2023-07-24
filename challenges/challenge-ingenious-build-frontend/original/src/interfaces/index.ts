export interface Stop {
  reduce: any;
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
  selectedBusLine: null;
  busLineStops: GroupedStops | null;
  busLineStopsKeys: string[] | null;
  selectedBusLineStop: null;
  sortedBusLineStops: Stop[] | null;
}
