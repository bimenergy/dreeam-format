import Ajv from 'ajv';
import defaults from 'json-schema-defaults';
import rootSchema from '../../schemas/root';
import buildingSchema from '../../schemas/building';
import featureSchema from '../../schemas/feature';
import heatPumpSchema from '../../schemas/heatPump';
import buildingPropertyFilter from './buildingPropertyFilter';

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

export function getBuildingProperties(asObject, extended) {
  const { properties } = buildingSchema.allOf[1].properties.properties;
  const propertyFilterList = Object.keys(properties).filter(key =>
    buildingPropertyFilter[key]);
  if (asObject) {
    const obj = propertyFilterList.reduce((memo, key) => {
      if (extended) {
        const p = properties[key];
        memo[key] = {
          key,
          type: p.type,
          enum: p.enum ? p.enum : null,
        };
      } else {
        memo[key] = true;
      }
      return memo;
    }, {});
    return obj;
  }
  return propertyFilterList;
}
