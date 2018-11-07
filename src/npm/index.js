import Ajv from 'ajv';
import rootSchema from '../../schemas/root';
import buildingSchema from '../../schemas/building';
import featureSchema from '../../schemas/feature';

export function Validator() {
  const ajv = Ajv({
    verbose: true,
  });
  ajv.addSchema(rootSchema);
  ajv.addSchema(buildingSchema);
  ajv.addSchema(featureSchema);
  return ajv;
}

export function validateBuilding(building) {
  const ajv = Validator();
  const valid = ajv.validate(buildingSchema, building);
  if (!valid) {
    console.warn(ajv.errors);
    return false;
  }
  return true;
}
