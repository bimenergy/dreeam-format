/* eslint-disable quote-props */
import {
  action,
  useStrict,
  extendObservable,
  toJS,
} from 'mobx';

// schemas
import buildingSchema from '../../schemas/building';
import rootSchema from '../../schemas/root';

useStrict(true);

function extractEntities(entities, entity, properties, definitions, recursive) {
  if (properties && entity.properties) {
    Object.keys(entity.properties).forEach(key => {
      const prop = entity.properties[key];
      if (prop.$id) {
        entities.push(prop);
        if (recursive) {
          extractEntities(entities, prop, properties, definitions, recursive);
        }
      }
    });
  } else if (entity.allOf) {
    entity.allOf.forEach(a => {
      if (a.properties && recursive) {
        extractEntities(entities, a, properties, definitions, recursive);
      }
    });
  }
  if (definitions && entity.definitions) {
    Object.keys(entity.definitions).forEach(key => {
      const prop = entity.definitions[key];
      if (prop.$id) {
        entities.push(prop);
        if (recursive) {
          extractEntities(entities, prop, properties, definitions, recursive);
        }
      }
    });
  }
  return entities;
}

const schemas = [rootSchema, buildingSchema];

// what to display in the first section of the left menu (main entities)
const mainSchemas = [
  rootSchema,
  buildingSchema,
  rootSchema.definitions.alternative,
  rootSchema.definitions.scenario,
  rootSchema.definitions.project,
  rootSchema.definitions.resourceList,
  rootSchema.definitions.indicator,
];

const subSchemas = schemas.reduce((memo, s) => {
  extractEntities(memo, s, true, true, true);
  return memo;
}, []).sort((a, b) => {
  if (a.$id < b.$id) return -1;
  if (a.$id > b.$id) return 1;
  return 0;
});

// map with key: $id, value: entity
const schemaMap = [...schemas, ...subSchemas].reduce((memo, schema) => {
  if (schema.$id) {
    memo[schema.$id] = schema; // eslint-disable-line
  }
  return memo;
}, {});

const initialState = {
  selectedEntityId: rootSchema.$id, // store an object from schema (or a complete schema)
};

/**
 * Keeps the result from simulation to update different result views
 */
class Schema {
  constructor() {
    extendObservable(this, initialState);
    // static data
    this.mainEntities = mainSchemas;
    this.subEntities = subSchemas;
    this.schemaMap = schemaMap;
  }

  setSelectedEntityId = action(entityId => {
    this.selectedEntityId = entityId;
  });
}

export default Schema;
