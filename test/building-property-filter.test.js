import { getBuildingProperties } from '../src/npm';
import buildingSchema from '../schemas/building';

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

test('should have schema properties for the filter list', () => {
  // Given
  const list = getBuildingProperties();
  // When
  list.forEach(key => {
    expect(buildingSchema.allOf[1].properties.properties.properties[key]).toBeTruthy();
  });
});
