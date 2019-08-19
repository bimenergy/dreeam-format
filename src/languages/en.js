/* eslint-disable quotes, quote-props */
export default {
  doc: {
    root: `The root entity describes the stock repository itself, which could be thought of as one or several databases.
      The format will emerge slowly towards maturity and changes will be inevitable. The formats that are followed are primarily:
      CityGML and the Energy ADE for overall structure and lower level of detailed data. A good graphical overview can be found at
      https://github.com/cstb/citygml-energy/blob/master/doc/UML-Diagrams_Energy-ADE.pdf. gbXML and IFC are used at higher level of
      detail to improve compatibility with the BIM domain. The DREEAM format is highly opinionated and primarily used as an
      unambiguous representation of data to be used internally at application level, yet enable import and export of open standard
      formats which often fail to be suitable for application development due to high flexibility and complexity. Links to documentations
      of gbXML: http://www.gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html and IFC: http://www.buildingsmart-tech.org/ifc/IFC4/final/html/
      (and version 2x3: http://www.buildingsmart-tech.org/ifc/IFC2x3/TC1/html/index.htm)`,
    building: `The building is a central entity in the DREEAM format and follows several 
      descriptions from open formats, such as CityGML, IFC, gbXML.
      The attributes object is used as the most simple bearer of information of a building, and is complemented
      with geometric descriptions both from GeoJSON (simpler geometry) and gbXML (detailed geometry). Note that the building
      needs to be a valid GeoJSON Feature which means that at least one geographic coordinate must be defined (Point). Normally though
      a polygon is used representing the building footprint`,
    buildingType: `Classification of building according with their usage and form
      (e.g. single-family house, multi-family house, office building, industrial building).
      The enumeration (citygml: code list) will be specific for DREEAM and the allowed values will be added as we go`,
    constructionWeight: `Classification of building according with their construction structure
      - veryLight
      - light
      - medium
      - heavy`,
    energyPerformanceCertification: `Energy Efficiency Rating according with a given certification or label
      (e.g. PassivHaus, LEED Platinium, KfW Effizienzhaus 100).`,
    refurbishmentMeasure: `Reference designation of the degree of refurbishment.
      This reference may be European (from the Tabula project) or local (used for the Energy Action Plan of a city)`,
    floorArea: `Floor area considered for the normalization of the standard energy demands`,
    planarGeometry: `List of points defining a loop. There are no repeated points in the list. All data are global,
      with the assumption that positive Z is up, and if CADModelAzimuth is undefined or zero,
      positive X is East and positive Y is North. If CADModelAzimuth is defined it is the angle of positive Y to North,
      positive X is the vectorial product of Y and Z. If geometry is to be precise, use Longitude,
      Latitude and Elevation in the Location element to define the origin. Otherwise the origin is an arbitrary point.
      Use PlanarGeometry to define a three dimensional polygon that lies on a plane, and has no self-intersection.`,
    properties: `This list of properties should be sufficient to generate a full building parametrically. As soon as the
      set of properties is NOT enough to describe details, or the defaults needs to be overridden, complementary data is used
      in the building such as spaces and surfaces. Currently this is a gross list from the CityGML standard (building attributes),
      and the documentation forms a net list through further description of the properties below.
      This means some of the properties in the list could possible be removed,
      as well as a there could be a need for more properties.`,
    thermalZone: `A thermal zone is a zone of a building which serves as unit for the building heating and cooling simulation. For the simulation, a thermal zone is considered as isothermal.
      It is a semantic object, which may be or not related to a geometric entity`,
  },
  properties: {
    name: 'Name',
    description: 'Description',
    countryName: 'Country',
    localityName: 'City/town/village',
    thoroughfareNumber: 'Street number',
    thoroughfareName: 'Street name',
    postalCode: 'Postal code',
    location: 'Location',
    buildingType: 'Building type',
    class: 'Class',
    function: 'Function',
    usage: 'Usage',
    measuredHeight: 'Measured height',
    roofType: 'Roof type',
    storeysAboveGround: 'Storeys above ground',
    storeysBelowGround: 'Storeys below ground',
    storeyHeightsAboveGround: 'Storey heights above ground',
    storeyHeightsBelowGround: 'Storey heights below ground',
    numberOfApartments: 'Number of apartments',
    numberOfRooms: 'Number of rooms',
    numberOfBuildingUnits: 'Number of building units',
    yearOfConstruction: 'Year of construction',
    yearOfDemolition: 'Year of demolition',
    constructionWeight: 'Construction weight',
    energyPerformanceCertificationId: 'Energy performance certification ID',
    energyPerformanceCertificationName: 'Energy performance certification name',
    energyPerformanceCertificationRating: 'Energy performance certification rating',
    isLandmarked: 'Is landmarked',
    grossVolume: 'Gross volume',
    netVolume: 'Net volume',
    energyReferenceVolume: 'Energy reference volume',
    grossFloorArea: 'Gross floor area',
    netFloorArea: 'Net floor area',
    energyReferenceArea: 'Energy reference area',
    width: 'Width',
    length: 'Length',
    glazing: 'Glazing',
    rotate: 'Rotate',
    buildingMainConstruction: 'Building main construction',
    exteriorWallThickness: 'Exterior wall thickness',
    exteriorWallUValue: 'Exterior wall U-value',
    exteriorWallIsInsulated: 'Exterior walls are insulated?',
    exteriorWallInsulationThickness: 'Exterior wall insulation thickness',
    roofUValue: 'Roof U-value',
    interiorFloorUValue: 'Interior floor U-value',
    windowUValue: 'Window U-value',
    windowFrameUValue: 'Window frame U-value',
    sogUValue: 'Ground slab U-value',
    windowType: 'Window type',
    windowFrameMaterial: 'Window frame material',
    conditionExteriorWalls: 'Exterior wall condition',
    conditionWindows: 'Windows condition',
    conditionRoof: 'Roof condition',
    insideMinTemperature: 'Inside min temperature',
    insideMaxTemperature: 'Inside max temperature',
    numberOfOccupants: 'Number of occupants',
    numberOfOccupantsPerM2: 'Number of occupants per m²',
    occupancyTimePerPerson: 'Occupancy hours per person',
    hotWaterPerPerson: 'Hot water use per person',
    electricityLighting: 'Electricity for lighting',
    electricityLightingPerM2: 'Electricity for lighting per m²',
    electricityAppliences: 'Electricity for appliences',
    electricityAppliencesPerM2: 'Electricity for appliences per m²',
    electricityAuxiliary: 'Electricity for auxiliary',
    heatingSystemType: 'Heating system type',
    heatingSystemIsDecentralised: 'Heating system is decentralised',
    energyCarrier: 'Energy carrier',
    energyCarrierYearOfConstruction: 'Energy carrier year of construction',
    conditionHeatingSystem: 'Heating system condition',
    ventilationType: 'Ventilation type',
    exhaustAirFlow: 'Exhaust air flow',
    supplyAirFlow: 'Supply air flow',
    conditionVentilation: 'Ventilation system condition',
    airTightness: 'Air tightness',
    transmission: 'Transmission',
    infiltration: 'Infiltration',
    ventilation: 'Ventilation',
    coolingInRoomAir: 'Cooling in room air',
    coolingInSupplyAir: 'Cooling in supply air',
    sewage: 'Hot tap water',
    ventilationHeatExchange: 'Ventilation heat exchange',
    heatRecoveryToHotTapWater: 'Heat recovery to hot tap water',
    heatRecoveryHeatPump: 'Heat recovery heat pump',
    solarEnergyThroughWindow: 'Solar energy through windows',
    processEnergy: 'Process energy',
    heatSupply: 'Heating demand',
    powerSupply: 'Power supply',
    personHeat: 'Person heat',
    veryLight: 'Very light',
    light: 'Light',
    medium: 'Medium',
    heavy: 'Heavy',
    squareMeter: 'm²',
    meter: 'm',
    cubicMeter: 'm³',
    kilogram: 'kg',
    wattPerSquareMeterKelvin: 'W/m²K',
    percent: '%',
    degreesCelcius: '°C',
    hoursPerDay: 'h/day',
    cubicMeterPerDay: 'm³/day',
    wattPerSquareMeter: 'W/m²',
    literPerSecondPerSquareMeter: 'l/s m²',
    personPerSquareMeter: 'persons/m²',
    apartmentBlock: 'Apartment block',
    multiFamilyHouse: 'Multi-family house',
    rowHouse: 'Row house',
    singleFamilyHouse: 'Single family house',
    terracedHouse: 'Terraced house',
    boiler: 'Boiler',
    wood: 'Wood',
    stone: 'Stone',
    concrete: 'Concrete',
    brick: 'Brick',
    single: 'Single',
    double: 'Double',
    triple: 'Triple',
    natural: 'Natural',
    hip: 'Hip roof',
    gabled: 'Gabled roof',
    flat: 'Flat roof',
    roofShape: 'Roof shape',
    roofAngle: 'Roof angle',
    kwhPerYear: 'kWh/year',
    kwhPerSquareMeterPerYear: 'kWh/m²/year',
    degreesFromNorth: '°',
    degrees: '°',
    yes: 'Yes',
    no: 'No',
    dontknow: 'Dont know',
    district: 'District heating',
    heatPump: 'Heat pump',
    heatPumpGeothermal: 'Geothermal heat pump',
    heatPumpExhaustAir: 'Exhaust air heat pump',
    heatPumpAirAir: 'Air air heat pump',
    heatPumpAirWater: 'Air water heat pump',
    electricity: 'Direct electricity',
    geometryType: 'Geometry type',
    singleStructure: 'Single structure',
    perimeterBlock: 'Perimeter block',
    openBlock: 'Open block',
    geometryAttachment: 'Geometry attachment',
    detached: 'Detached',
    oneSideAttached: 'One side attached',
    twoSidesAttached: 'Two sides attached',
    averageStoreyHeight: 'Average storey height',
    hasBalconies: 'Has balconies',
    numberOfBalconies: 'Number of balconies',
    poor: 'Poor',
    ok: 'Ok',
    good: 'Good',
    excellent: 'Excellent',
    exteriorWallInsideMaterial: 'Exterior wall inside material',
    exteriorWallOutsideMaterial: 'Exterior wall outside material',
    exteriorWallRenovatedYear: 'Exterior wall renovated year',
    exteriorWallRenovationDegree: 'Exterior wall renovation degree',
    roofRenovatedYear: 'Roof renovated year',
    roofIsRenovated: 'Roof is renovated',
    heatedAttic: 'Heated attic',
    doubleWithCoating: 'Double with coating',
    tripleWithCoating: 'Triple with coating',
    windowsRenovatedYear: 'Windows renovated year',
    plastic: 'Plastic',
    wooden: 'Wooden',
    aluminium: 'Aluminium',
    woodProtected: 'Wood protected',
    woodAluminium: 'Wood aluminium',
    shadingFactor: 'Shading factor',
    shadingLevel: 'Shading level',
    heatingSystemRenovatedYear: 'Heating system renovated year',
    gas: 'Gas',
    oil: 'Oil',
    districtHeating: 'District heating',
    exhaustAir: 'Exhaust air',
    exhaustSupplyAir: 'Exhaust and supply air',
    heatRecovery: 'Heat recovery',
    ventilationRenovatedYear: 'Ventilation renovated year',
    mechanicVentilationSystem: 'Mechanic ventilation system',
    solarCells: 'Solar cells',
    powerOfBoiler: 'Power of boiler',
    circuitTemperatures: 'Circuit temperatures',
    circuitInsulation: 'Circuit insulation',
    hotWaterSystemType: 'Hot water system type',
    accessToHeatingInfrastructureGas: 'Access to heating infrastructure, gas',
    accessToHeatingInfrastructureDistrictHeating: 'Access to heating infrastructure, district heating',
    coolingSystemRenovatedYear: 'Cooling system year of renovation',
    energyConsumption: 'Energy consumption',
    none: 'None',
    low: 'Low',
    standard: 'Standard',
    high: 'High',
    partially: 'Partially',
    people: 'People',
    creationDate: 'Created',
    updateDate: 'Updated',
  },
};
