import Ajv from 'ajv';
import defaults from 'json-schema-defaults';
import rootSchema from '../../schemas/root';
import buildingSchema from '../../schemas/building';
import featureSchema from '../../schemas/feature';
import heatPumpSchema from '../../schemas/heatPump';
export * from './fakeBuildingGenerator';

export function Validator() {
  const ajv = Ajv({
    verbose: true,
  });
  ajv.addSchema(rootSchema);
  ajv.addSchema(buildingSchema);
  ajv.addSchema(featureSchema);
  ajv.addSchema(heatPumpSchema);
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

export function generateHeatPump() {
  return defaults(heatPumpSchema);
}
