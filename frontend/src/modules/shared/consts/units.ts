export enum EUnits {
  CM = "cm",
  MM = "mm",
  M = "m",
}

const UNITS: Record<EUnits, string> = {
  [EUnits.CM]: "см",
  [EUnits.MM]: "мм",
  [EUnits.M]: "м",
};

const UNITS_LIST = Object.entries(UNITS).map((unit) => ({
  key: unit[0],
  value: unit[0],
  label: unit[1],
}));

export { UNITS, UNITS_LIST };
