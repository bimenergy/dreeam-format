import { generateFakeBuildings } from '../src/npm/fakeBuildingGenerator';
import { validateBuilding } from '../src/npm';

test('fake building should be valid', () => {
  // Given
  const building = generateFakeBuildings(1)[0];
  // When
  const result = validateBuilding(building);
  console.log(result);
  // Then
  expect(result).toBeTruthy();
});
