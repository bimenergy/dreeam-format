import { generateFakeBuildings } from '../src/npm/fakeBuildingGenerator';
import { validateBuilding } from '../src/npm';

test('fake building should be valid', () => {
  // Given
  const building = generateFakeBuildings(1)[0];
  console.log(building);
  // When
  const result = validateBuilding(building);
  // Then
  expect(result).toBeTruthy();
});
