import { getTranslation } from '../dist/npm';

test('translation data should be accessable', () => {
  // Given
  const lang = getTranslation('en');
  // Then
  expect(lang.properties.name).toBe('Name');
});
