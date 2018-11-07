import Ajv from 'ajv';
import draft07 from 'ajv/lib/refs/json-schema-draft-07';
import rootSchema from '../../schemas/root';
import buildingSchema from '../../schemas/building';

export function Validator() {
  const ajv = Ajv();
  ajv.addMetaSchema(draft07);
  ajv.addSchema(rootSchema);
  ajv.addSchema(buildingSchema);
  return ajv;
}

export function validateBuilding(building) {
  const validator = Validator();
  return validator.validate('building', building);
}
