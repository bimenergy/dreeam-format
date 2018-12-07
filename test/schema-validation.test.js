import { validateBuilding, Validator } from '../src/npm';
import { Validator as ValidatorDist } from '../dist/npm';
import cuid from 'cuid';

test('get a validator', () => {
  // Given
  const validator = Validator();
  // When
  // use the validator to send in schemas and objects

  // Then
  expect(validator).toBeTruthy();
});

test('validate building', () => {
  // Given
  const building = {
    buildingId: cuid(),
    userId: 'dummy',
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [],
    },
    properties: {},
  };

  // When
  const result = validateBuilding(building);
  // Then
  expect(result).toBeTruthy();
});

test('error building', () => {
  // Given
  const errorBuilding = {};

  const validator = Validator();

  // When
  const error = validator.validate('building', errorBuilding);
  // Then
  expect(error).toBeFalsy();
  expect(validator.errorsText()).toMatch(/should have required property/);
});

test('should work with dist', () => {
  // Give
  const test = {
    projects: [],
    buildings: [],
    indicators: [],
    resourceList: {},
  };
  const validator = ValidatorDist();
  // When
  const result = validator.validate('root', test);
  // Then
  expect(result).toBeTruthy();
});

