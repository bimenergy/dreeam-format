import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import nomnoml from 'nomnoml';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

function generateNomnomlTitle(title, id, type) {
  return `${title} (${id}):${type}`;
}

// refactor!
function generateNomnomlFromSchemaEntity(entity, schemaMap) {
  const title = generateNomnomlTitle(entity.title, entity.$id, entity.type);
  let result = `[${title}]`;
  if (entity.enum) {
    const enumString = entity.enum.join(';');
    result += `\n[${title}]-[${entity.title} Enumeration|${enumString}]`;
  }
  let properties;
  if (entity.properties) {
    properties = entity.properties; // eslint-disable-line
  } else if (entity.allOf && entity.allOf.find(a => a.properties)) {
    properties = entity.allOf.find(a => a.properties).properties; // eslint-disable-line
  }
  if (!properties) {
    return result;
  }
  const content = Object.keys(properties).reduce((memo, key) => {
    const item = properties[key];
    if (item.type === 'array' && item.items && item.items.$ref) {
      const definition = schemaMap[item.items.$ref];
      if (definition) {
        definition.minItems = item.minItems || 0;
        definition.maxItems = item.maxItems || '*';
        memo.composites.push(definition);
      } else {
        console.warn(`definition could not be found: ${item.items.$ref}`);
      }
    } else if (item.$ref) {
      const definition = schemaMap[item.$ref];
      if (definition) {
        definition.minItems = item.minItems || 0;
        definition.maxItems = item.maxItems || '*';
        memo.composites.push(definition);
      } else {
        console.warn(`definition could not be found: ${item.$ref}`);
      }
    } else {
      memo.attributes.push(`${key}: ${item.type}`);
    }
    return memo;
  }, {
    composites: [],
    attributes: [],
  });
  result = `#direction:right\n[${title}|${content.attributes.join(';')}]`;
  content.composites.forEach(c => {
    const min = c.minItems || 0;
    const max = c.maxItems || '*';
    const minMaxString = min === max ? min : `${min}..${max}`;
    result += `\n[${title}]- ${minMaxString}[${generateNomnomlTitle(c.title, c.$id, c.type)}]`;
  });
  return result;
}

const styles = () => ({
  header: {
    lineHeight: 1.2,
  },
  longtext: {
    fontStyle: 'italic',
  },
  propertyDisplay: {
    margin: 20,
    padding: 20,
  },
  umlCanvas: {
    margin: 20,
  },
});

class FormatEntityDisplay extends Component {
  componentDidMount() {
    const { canvas } = this;
    const { schema } = this.props.store;
    const entity = schema.schemaMap[schema.selectedEntityId];
    nomnoml.draw(canvas, generateNomnomlFromSchemaEntity(entity, schema.schemaMap));
  }

  componentDidUpdate() {
    const { canvas } = this;
    const { schema } = this.props.store;
    const entity = schema.schemaMap[schema.selectedEntityId];
    nomnoml.draw(canvas, generateNomnomlFromSchemaEntity(entity, schema.schemaMap));
  }

  handleSelectEntity = entityId => {
    window.scrollTo(0, 0);
    this.props.store.schema.setSelectedEntityId(entityId);
  }

  renderPropertyDisplay(prop) {
    const { classes, t } = this.props;
    return (
      <Paper key={prop.$id} className={classes.propertyDisplay} elevation={1}>
        <Typography variant="h5">{prop.title || prop.$id}</Typography>
        <Typography variant="body1">{`Property: ${prop.$id}`}</Typography>
        { prop.description && <Typography variant="body1">{`Short description: ${prop.description}`}</Typography> }
        { t(prop.$id) !== prop.$id && (
          <Typography variant="body2" className={classes.longtext}>
            {`Long description: ${t(prop.$id)}`}
          </Typography>
        )}
        <Button
          onClick={() => this.handleSelectEntity(prop.$id)}
          variant="outlined"
          color="secondary"
        >
          Go to specification
        </Button>
      </Paper>
    );
  }

  render() {
    const {
      classes,
      store,
      t,
    } = this.props;
    const { schemaMap, selectedEntityId } = store.schema;
    const entity = schemaMap[selectedEntityId];
    let properties;
    if (entity.properties) {
      properties = entity.properties; // eslint-disable-line
    } else if (entity.allOf && entity.allOf.find(a => a.properties)) {
      properties = entity.allOf.find(a => a.properties).properties; // eslint-disable-line
    }
    return (
      <div>
        <Typography className={classes.header} variant="h2" color="inherit" noWrap>{entity.title}</Typography>
        { entity.description && <Typography variant="h6">{entity.description}</Typography> }
        { t(entity.$id) !== entity.$id && <Typography variant="body2" className={classes.longtext}>{t(entity.$id)}</Typography> }
        <canvas
          className={classes.umlCanvas}
          ref={canvas => {
            this.canvas = canvas;
          }}
        />
        { properties && (
          <Typography variant="h5">{`Description of properties for ${entity.title}`}</Typography>
        )}
        { properties && Object.keys(properties).map(key => {
          const prop = properties[key];
          if (prop.$id) {
            return this.renderPropertyDisplay(prop);
          } else if (prop.items && prop.items.$ref && schemaMap[prop.items.$ref]) {
            return this.renderPropertyDisplay(schemaMap[prop.items.$ref]);
          } else if (prop.$ref && schemaMap[prop.$ref]) {
            return this.renderPropertyDisplay(schemaMap[prop.$ref]);
          }
          return null;
        })}
      </div>
    );
  }
}

FormatEntityDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(translate('doc')(observer(FormatEntityDisplay)));
