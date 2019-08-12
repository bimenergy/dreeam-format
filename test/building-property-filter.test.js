import { getBuildingProperties, propertyMap } from '../src/npm';
import buildingSchema from '../schemas/building';
import { unitEnumeration } from '../src/npm/propertyUnits';

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
  expect(obj.exteriorWallUValue.decimals).toBe(2);
});

test('should get an array of extended objects of filtered building properties', () => {
  // Given
  const list = getBuildingProperties(false, true);
  // When
  expect(list[0].key === 'name').toBeTruthy();
  expect(list.find(p => p.decimals === 1)).toBeTruthy();
});

test('should have schema properties for the filter list', () => {
  // Given
  const list = getBuildingProperties();
  // When
  list.forEach(key => {
    expect(buildingSchema.allOf[1].properties.properties.properties[key]).toBeTruthy();
  });
});

test('should have property for each unit enumeration', () => {
  // Given
  const { properties } = buildingSchema.allOf[1].properties.properties;
  // When
  Object.keys(propertyMap).forEach(key => {
    // few exceptions
    if (key.slice(-2) !== 'M2') {
      expect(properties[key]).toBeTruthy();
    }
  });
});

test('should have unit enumeration for each post in propertyMap', () => {
  // Given
  const properties = propertyMap;
  // When
  Object.keys(properties).forEach(key => {
    expect(unitEnumeration[properties[key]]).toBeTruthy();
  });
});
