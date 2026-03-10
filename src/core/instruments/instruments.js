export const instruments = {
  EURUSD: {
    symbol: "EURUSD",
    assetClass: "forex",
    pricePrecision: 5,
    tickSize: 0.00001,
    pipSize: 0.0001,
    lotStep: 0.01,
    minLot: 0.01,
    contractSize: 100000,
    valuePerPoint: 100000,
  },

  GBPUSD: {
    symbol: "GBPUSD",
    assetClass: "forex",
    pricePrecision: 5,
    tickSize: 0.00001,
    pipSize: 0.0001,
    lotStep: 0.01,
    minLot: 0.01,
    contractSize: 100000,
    valuePerPoint: 100000,
  },

  USDJPY: {
    symbol: "USDJPY",
    assetClass: "forex",
    pricePrecision: 3,
    tickSize: 0.001,
    pipSize: 0.01,
    lotStep: 0.01,
    minLot: 0.01,
    contractSize: 100000,
    valuePerPoint: 1000,
  },

  XAUUSD: {
    symbol: "XAUUSD",
    assetClass: "metal",
    pricePrecision: 2,
    tickSize: 0.01,
    pipSize: 0.10,
    lotStep: 0.01,
    minLot: 0.01,
    contractSize: 100,
    valuePerPoint: 100,
  },

  XAGUSD: {
    symbol: "XAGUSD",
    assetClass: "metal",
    pricePrecision: 3,
    tickSize: 0.001,
    pipSize: 0.01,
    lotStep: 0.01,
    minLot: 0.01,
    contractSize: 5000,
    valuePerPoint: 5000,
  },

  BTCUSD: {
    symbol: "BTCUSD",
    assetClass: "crypto",
    pricePrecision: 2,
    tickSize: 0.01,
    pipSize: 1,
    lotStep: 0.01,
    minLot: 0.01,
    contractSize: 1,
    valuePerPoint: 1,
  },

  ETHUSD: {
    symbol: "ETHUSD",
    assetClass: "crypto",
    pricePrecision: 2,
    tickSize: 0.01,
    pipSize: 1,
    lotStep: 0.01,
    minLot: 0.01,
    contractSize: 1,
    valuePerPoint: 1,
  },

  XRPUSD: {
    symbol: "XRPUSD",
    assetClass: "crypto",
    pricePrecision: 4,
    tickSize: 0.0001,
    pipSize: 0.01,
    lotStep: 1,
    minLot: 1,
    contractSize: 10000,
    valuePerPoint: 10000,
  },

  SOLUSD: {
    symbol: "SOLUSD",
    assetClass: "crypto",
    pricePrecision: 2,
    tickSize: 0.01,
    pipSize: 1,
    lotStep: 0.1,
    minLot: 0.1,
    contractSize: 100,
    valuePerPoint: 100,
  },
};

export function getInstrumentDefinition(symbol) {
  return instruments[symbol] ?? null;
}

export default instruments;