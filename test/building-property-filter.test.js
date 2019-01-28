import { getBuildingProperties } from '../src/npm';

test('should get a list of filtered building properties', () => {
  // Given
  const list = getBuildingProperties();
  // When
  expect(list.length).toBeTruthy();
});

test('should get an object of filtered building properties', () => {
  // Given
  const obj = getBuildingProperties(true);
  // When
  expect(obj.name).toBeTruthy();
});
