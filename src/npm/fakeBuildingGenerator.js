import cuid from 'cuid';
import Fakerator from 'fakerator';
import geojsonRandom from 'geojson-random';

const fakerator = Fakerator('en-EN');

function getConstructionWeight() {
  const index = fakerator.random.number(0, 3);
  const constructionWeights = ['veryLight', 'light', 'medium', 'heavy'];
  return constructionWeights[index];
}

function getBuildingClass() {
  const classes = [
    'habitation',
    'sanitation',
    'habitation',
    'administration',
    'habitation',
    'business, trade',
    'habitation',
    'catering',
    'habitation',
    'recreation',
    'habitation',
    'sport',
    'habitation',
    'culture',
    'habitation',
    'church institution',
    'habitation',
    'agriculture, forestry',
    'habitation',
    'schools, education, research',
    'habitation',
    'maintainence and waste management',
    'habitation',
    'healthcare',
    'habitation',
    'communicating',
    'habitation',
    'security',
    'habitation',
    'storage',
    'habitation',
    'industry',
    'habitation',
    'traffic',
    'habitation',
    'function',
    'habitation',
  ];
  const index = fakerator.random.number(0, 35);
  return classes[index];
}

function getFunction() {
  const functions = [
    'residential building',
    'tenement',
    'residential- and administration building',
    'residential- and office building',
    'residential- and business building',
    'residential- and commercial building',
    'holiday house',
    'summer house',
    'office building',
    'business building',
    'industrial building',
    'factory',
  ];
  const index = fakerator.random.number(0, 11);
  return functions[index];
}

function getUsage() {
  return getFunction();
}

function getRoofType() {
  const roofs = [
    'flatRoof',
    'monopitchRoof',
    'dualPentRoof',
    'gabledRoof',
    'hippedRoof',
    'half-hippedRoof',
    'mansardRoof',
    'pavilionRoof',
    'coneRoof',
    'copulaRoof',
    'sawtoothRoof',
    'archRoof',
    'pyramidalBroachRoof',
    'combinationOfRoofForms',
  ];
  const index = fakerator.random.number(0, 13);
  return roofs[index];
}

function getBuildingType() {
  const types = [
    'apartmentBlock',
    'multiFamilyHouse',
    'rowHouse',
    'singleFamilyHouse',
    'terracedHouse',
  ];
  const index = fakerator.random.number(0, 4);
  return types[index];
}

export function generateFakeBuildings(numBuildings) {
  const bb = [-2.6893740122, 50.9172557586, 0.5197601167, 52.7304000171];
  const { features } = geojsonRandom.point(numBuildings, bb);

  const buildings = Array(numBuildings).fill().map((_, i) => {
    const streetName = fakerator.address.streetName();
    const streetNumber = fakerator.address.buildingNumber();
    const storeysAboveGround = fakerator.random.number(1, 8);
    const storeysBelowGround = fakerator.random.number(0, 1);
    const storeyHeight = 3.5;
    const measuredHeight = storeysAboveGround * storeyHeight;
    const grossFloorArea = fakerator.random.number(60, 2000);
    const netFloorArea = fakerator.random.number(60, grossFloorArea);
    const energyReferenceArea = fakerator.random.number(netFloorArea, grossFloorArea);
    const grossVolume = grossFloorArea * measuredHeight;
    const netVolume = netFloorArea * measuredHeight;
    const energyReferenceVolume = energyReferenceArea * measuredHeight;

    return Object.assign(features[i], {
      buildingId: cuid(),
      userId: 'testuser',
      creationDate: new Date().toISOString(),
      properties: {
        longitude: features[i].geometry.coordinates[0],
        latitude: features[i].geometry.coordinates[1],
        name: `${streetName} ${streetNumber}`,
        thoroughfareName: streetName,
        thoroughfareNumber: streetNumber,
        localityName: fakerator.address.city(),
        countryName: 'Great Britain',
        postalCode: fakerator.address.postCode(),
        class: getBuildingClass(),
        function: getFunction(),
        usage: getUsage(),
        buildingType: getBuildingType(),
        measuredHeight,
        roofType: getRoofType(),
        storeysAboveGround,
        storeysBelowGround,
        storeyHeightsAboveGround: Array(storeysAboveGround).fill().map((a, j) => j * storeyHeight),
        storeyHeightsBelowGround: storeysBelowGround ? [storeyHeight] : [],
        yearOfConstruction: fakerator.random.number(1900, 2000),
        constructionWeight: getConstructionWeight(),
        grossFloorArea,
        netFloorArea,
        energyReferenceArea,
        grossVolume,
        netVolume,
        energyReferenceVolume,
      },
    });
  });

  return buildings;
}

export function generateFakeVersions(building) {
  // add random changes to the building
}
