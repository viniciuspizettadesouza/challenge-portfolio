export interface Stop {
  forEach: any;
  reduce: any;
  line: number;
  stop: string;
  order: number;
  time: string;
}

export interface GroupedStops {
  [stopName: string]: Stop[];
}

export interface RootStateBusLines {
  stops: Stop[];
  groupedStopsByLineKeys: string[];
  selectedBusLine: string | null;
  busLineStops: GroupedStops | null;
  busLineStopsKeys: string[] | null;
  selectedBusLineStop: null;
  sortedBusLineStops: Stop[] | null;
}

export interface RootStateBusStops {
  uniqueBusStops: Stop[];
}
