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
  degreesFromNorth: 'degreesFromNorth',
  degrees: 'degrees',
  personPerSquareMeter: 'personPerSquareMeter',
  people: 'people',
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
  electricityLighting: unitEnumeration.kwhPerYear,
  electricityLightingPerM2: unitEnumeration.kwhPerSquareMeterPerYear,
  electricityAppliances: unitEnumeration.kwhPerYear,
  electricityAppliancesPerM2: unitEnumeration.kwhPerSquareMeterPerYear,
  electricityAuxiliary: unitEnumeration.kwhPerSquareMeterPerYear,
  exteriorWallUValue: unitEnumeration.wattPerSquareMeterKelvin,
  roofUValue: unitEnumeration.wattPerSquareMeterKelvin,
  sogUValue: unitEnumeration.wattPerSquareMeterKelvin,
  windowUValue: unitEnumeration.wattPerSquareMeterKelvin,
  windowFrameUValue: unitEnumeration.wattPerSquareMeterKelvin,
  interiorFloorUValue: unitEnumeration.wattPerSquareMeterKelvin,
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
  exteriorWallInsulationThickness: unitEnumeration.meter,
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
  airTightness: unitEnumeration.literPerSecondPerSquareMeter,
  rotate: unitEnumeration.degreesFromNorth,
  roofAngle: unitEnumeration.degrees,
  numberOfOccupants: unitEnumeration.people,
  dataQuality: unitEnumeration.percent,
};
