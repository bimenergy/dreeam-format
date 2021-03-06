import Ajv from 'ajv';
import defaults from 'json-schema-defaults';
import rootSchema from '../../schemas/root';
import buildingSchema from '../../schemas/building';
import featureSchema from '../../schemas/feature';
import heatPumpSchema from '../../schemas/heatPump';
import buildingPropertyFilter from './buildingPropertyFilter';
import en from '../languages/en';

export * from './propertyUnits';

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

function getExtendedProperty(key, schema, filterProperty) {
  return {
    key,
    type: schema.type,
    enum: schema.enum ? schema.enum : null,
    min: schema.min,
    max: schema.max,
    decimals: filterProperty ? filterProperty.decimals : undefined,
  };
}

export function getBuildingProperties(asObject, extended) {
  const { properties } = buildingSchema.allOf[1].properties.properties;
  const propertyFilterList = Object.keys(properties).filter(key =>
    buildingPropertyFilter[key]);
  if (asObject) {
    const obj = propertyFilterList.reduce((memo, key) => {
      if (extended) {
        const p = properties[key];
        memo[key] = getExtendedProperty(key, p, buildingPropertyFilter[key]);
      } else {
        memo[key] = true;
      }
      return memo;
    }, {});
    return obj;
  } else if (extended) {
    return propertyFilterList.map(key =>
      getExtendedProperty(key, properties[key], buildingPropertyFilter[key]));
  }
  return propertyFilterList;
}

export function getTranslation(lang) {
  const translations = {
    en,
  };
  return translations[lang] || {};
}
