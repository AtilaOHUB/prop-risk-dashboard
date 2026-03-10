export const CFD_LIBRARY = {
  forex: {
    label: "Forex CFDs",
    items: {
      EURUSD: { label: "EURUSD", valuePerPoint: 100000, defaultPrice: 1.085 },
      GBPUSD: { label: "GBPUSD", valuePerPoint: 100000, defaultPrice: 1.285 },
      USDJPY: { label: "USDJPY", valuePerPoint: 1000, defaultPrice: 148.5 },
      AUDUSD: { label: "AUDUSD", valuePerPoint: 100000, defaultPrice: 0.655 },
      USDCAD: { label: "USDCAD", valuePerPoint: 100000, defaultPrice: 1.355 },
      USDCHF: { label: "USDCHF", valuePerPoint: 100000, defaultPrice: 0.885 },
      NZDUSD: { label: "NZDUSD", valuePerPoint: 100000, defaultPrice: 0.605 },
    },
  },
  indices: {
    label: "Index CFDs",
    items: {
      US30: { label: "US30", valuePerPoint: 1, defaultPrice: 39100 },
      US100: { label: "US100", valuePerPoint: 1, defaultPrice: 20850 },
      SPX500: { label: "SPX500", valuePerPoint: 1, defaultPrice: 5150 },
      GER40: { label: "GER40", valuePerPoint: 1, defaultPrice: 17750 },
      UK100: { label: "UK100", valuePerPoint: 1, defaultPrice: 7720 },
      JP225: { label: "JP225", valuePerPoint: 1, defaultPrice: 38800 },
    },
  },
  metals: {
    label: "Metal CFDs",
    items: {
      XAUUSD: { label: "Gold (XAUUSD)", valuePerPoint: 100, defaultPrice: 2950 },
      XAGUSD: { label: "Silver (XAGUSD)", valuePerPoint: 5000, defaultPrice: 32.5 },
    },
  },
  crypto: {
    label: "Crypto CFDs",
    items: {
      BTCUSD: { label: "BTCUSD", valuePerPoint: 1, defaultPrice: 92000 },
      ETHUSD: { label: "ETHUSD", valuePerPoint: 1, defaultPrice: 3400 },
      XRPUSD: { label: "XRPUSD", valuePerPoint: 10000, defaultPrice: 2.55 },
      SOLUSD: { label: "SOLUSD", valuePerPoint: 100, defaultPrice: 145 },
    },
  },
  energy: {
    label: "Energy CFDs",
    items: {
      USOIL: { label: "USOIL", valuePerPoint: 1000, defaultPrice: 77.5 },
      UKOIL: { label: "UKOIL", valuePerPoint: 1000, defaultPrice: 81.2 },
      NATGAS: { label: "NATGAS", valuePerPoint: 10000, defaultPrice: 1.95 },
    },
  },
};

export const allCfdItems = Object.values(CFD_LIBRARY).flatMap((group) =>
  Object.entries(group.items).map(([key, value]) => ({
    key,
    ...value,
    group: group.label,
  }))
);

export function getCfdByKey(key) {
  return allCfdItems.find((i) => i.key === key);
}