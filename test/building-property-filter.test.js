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

test('should get an extended object of filtered building properties', () => {
  // Given
  const obj = getBuildingProperties(true, true);
  // When
  expect(obj.name.key === 'name').toBeTruthy();
});

test('should get an array of extended objects of filtered building properties', () => {
  // Given
  const list = getBuildingProperties(false, true);
  // When
  expect(list[0].key === 'name').toBeTruthy();
});
