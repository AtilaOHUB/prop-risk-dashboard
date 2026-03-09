import { INSTRUMENTS } from "./instruments";

export function getInstrument(symbol) {
  return INSTRUMENTS[symbol] || null;
}