export const unitEnumeration = {
  degreesCelcius: 'degreesCelcius',
  gramPerKilogram: 'gramPerKilogram',
  kwhPerYear: 'kwhPerYear',
  literPerSecond: 'literPerSecond',
  literPerSecondPerSquareMeter: 'literPerSecondPerSquareMeter',
  meterPerSecond: 'meterPerSecond',
  pascal: 'pascal',
  percent: 'percent',
  squareMeter: 'squareMeter',
  wattHoursPerSquareMeterKelvin: 'wattHoursPerSquareMeterKelvin',
  wattPerKelvin: 'wattPerKelvin',
  wattPerSquareMeter: 'wattPerSquareMeter',
  costPerSquareMeterPerYear: 'costPerSquareMeterPerYear',
  costPerYear: 'costPerYear',
  cost: 'cost',
  kwhPerSquareMeterPerYear: 'kwhPerSquareMeterPerYear',
  wattPerSquareMeterKelvin: 'wattPerSquareMeterKelvin',
  meter: 'meter',
  kilogram: 'kilogram',
  cubicMeter: 'cubicMeter',
  hoursPerDay: 'hoursPerDay',
  cubicMeterPerDay: 'cubicMeterPerDay',
};

export const propertyMap = {
  measuredHeight: unitEnumeration.meter,
  storeyHeightsAboveGround: unitEnumeration.meter,
  storeyHeightsBelowGround: unitEnumeration.meter,
  grossVolume: unitEnumeration.cubicMeter,
  netVolume: unitEnumeration.cubicMeter,
  energyReferenceVolume: unitEnumeration.cubicMeter,
  grossFloorArea: unitEnumeration.squareMeter,
  netFloorArea: unitEnumeration.squareMeter,
  energyReferenceArea: unitEnumeration.squareMeter,
  occupancyTimePerPerson: unitEnumeration.hoursPerDay,
  hotWaterPerPerson: unitEnumeration.cubicMeterPerDay,
  electricityLighting: unitEnumeration.wattPerSquareMeter,
  electricityAppliences: unitEnumeration.wattPerSquareMeter,
  electricityAuxiliary: unitEnumeration.wattPerSquareMeter,
  exteriorWallUValue: unitEnumeration.wattPerSquareMeterKelvin,
  roofUValue: unitEnumeration.wattPerSquareMeterKelvin,
  sogUValue: unitEnumeration.wattPerSquareMeterKelvin,
  windowUValue: unitEnumeration.wattPerSquareMeterKelvin,
  glazing: unitEnumeration.percent,
  width: unitEnumeration.meter,
  length: unitEnumeration.meter,
  shadingFactor: unitEnumeration.percent,
  insideMinTemperature: unitEnumeration.degreesCelcius,
  insideMaxTemperature: unitEnumeration.degreesCelcius,
  exhaustAirFlow: unitEnumeration.literPerSecondPerSquareMeter,
  supplyAirFlow: unitEnumeration.literPerSecondPerSquareMeter,
  energyConsumption: unitEnumeration.kwhPerYear,
  exteriorWallThickness: unitEnumeration.meter,
  transmission: unitEnumeration.kwhPerYear,
  infiltration: unitEnumeration.kwhPerYear,
  ventilation: unitEnumeration.kwhPerYear,
  coolingInRoomAir: unitEnumeration.kwhPerYear,
  coolingInSupplyAir: unitEnumeration.kwhPerYear,
  sewage: unitEnumeration.kwhPerYear,
  ventilationHeatExchange: unitEnumeration.kwhPerYear,
  heatRecoveryToHotTapWater: unitEnumeration.kwhPerYear,
  heatRecoveryHeatPump: unitEnumeration.kwhPerYear,
  solarRadiationThroughWindows: unitEnumeration.kwhPerYear,
  solarEnergyThroughWindow: unitEnumeration.kwhPerYear,
  processEnergy: unitEnumeration.kwhPerYear,
  heatSupply: unitEnumeration.kwhPerYear,
  powerSupply: unitEnumeration.kwhPerYear,
  personHeat: unitEnumeration.kwhPerYear,
};
