import { validateBuilding, Validator } from '../src/npm';

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
