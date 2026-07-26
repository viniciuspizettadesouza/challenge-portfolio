export type Move = "LEFT" | "RIGHT" | "UP" | "DOWN";

interface Position {
  row: number;
  column: number;
}

function parseGrid(value: string) {
  const grid = value
    .trim()
    .split(/\r?\n/)
    .map((row) => [...row.trim()]);
  if (!grid.length || grid.some((row) => row.length !== grid.length)) {
    throw new Error("The grid must be square.");
  }
  return grid;
}

function find(grid: string[][], target: "m" | "p"): Position {
  for (const [row, cells] of grid.entries()) {
    const column = cells.indexOf(target);
    if (column >= 0) return { row, column };
  }
  throw new Error(`The grid must contain "${target}".`);
}

export function fullPath(value: string): Move[] {
  const grid = parseGrid(value);
  const bot = find(grid, "m");
  const princess = find(grid, "p");
  const moves: Move[] = [];

  while (bot.column !== princess.column) {
    if (bot.column < princess.column) {
      bot.column += 1;
      moves.push("RIGHT");
    } else {
      bot.column -= 1;
      moves.push("LEFT");
    }
  }
  while (bot.row !== princess.row) {
    if (bot.row < princess.row) {
      bot.row += 1;
      moves.push("DOWN");
    } else {
      bot.row -= 1;
      moves.push("UP");
    }
  }

  return moves;
}

export function nextMove(value: string): Move | null {
  const grid = parseGrid(value);
  const bot = find(grid, "m");
  const princess = find(grid, "p");

  if (bot.row < princess.row) return "DOWN";
  if (bot.row > princess.row) return "UP";
  if (bot.column < princess.column) return "RIGHT";
  if (bot.column > princess.column) return "LEFT";
  return null;
}
