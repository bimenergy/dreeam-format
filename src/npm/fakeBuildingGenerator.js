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

export function generateFakeBuildings(numBuildings) {
  const { features } = geojsonRandom.point(numBuildings);

  const buildings = Array(numBuildings).fill().map((_, i) => {
    const streetName = fakerator.address.streetName();
    const streetNumber = fakerator.address.buildingNumber();
    const storeysAboveGround = fakerator.random.number(1, 8);
    const storeysBelowGround = fakerator.random.number(0, 1);
    const storeyHeight = 3.5;
    return Object.assign(features[i], {
      buildingId: cuid(),
      properties: {
        name: `${streetName} ${streetNumber}`,
        thoroughfareName: streetName,
        thoroughfareNumber: streetNumber,
        localityName: fakerator.address.city(),
        countryName: 'Great Britain',
        postalCode: fakerator.address.postCode(),
        class: getBuildingClass(),
        function: getFunction(),
        usage: getUsage(),
        measuredHeight: storeysAboveGround * storeyHeight,
        roofType: getRoofType(),
        storeysAboveGround,
        storeysBelowGround,
        yearOfConstruction: fakerator.random.number(1900, 2000),
        constructionWeight: getConstructionWeight(),
        floorArea: fakerator.random.number(60, 2000),
      },
    });
  });

  return buildings;
}

export function generateFakeVersions(building) {
  // add random changes to the building
}
