import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import nomnoml from 'nomnoml';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

// refactor!
function generateNomnomlFromSchemaEntity(entity, schemaMap) {
  let result = `[${entity.title}: ${entity.type}]`;
  if (entity.enum) {
    const enumString = entity.enum.join(';');
    result += `\n[${entity.title}: ${entity.type}]-[${entity.title} Enumeration|${enumString}]`;
  }
  if (!entity.properties) {
    return result;
  }
  const properties = Object.keys(entity.properties).reduce((memo, key) => {
    const item = entity.properties[key];
    if (item.type === 'array' && item.items && item.items.$ref) {
      const definition = schemaMap[item.items.$ref];
      if (definition) {
        memo.composites.push(definition);
      } else {
        console.warn(`definition could not be found: ${item.items.$ref}`);
      }
    } else if (item.$ref) {
      const definition = schemaMap[item.$ref];
      if (definition) {
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
  result = `[${entity.title}|${properties.attributes.join(';')}]`;
  properties.composites.forEach(c => {
    const min = c.minItems || 0;
    const max = c.maxItems || '*';
    result += `\n[${entity.title}]- ${min}..${max}[${c.title}]`;
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
    console.log(this.props.schemaMap);
    const { canvas } = this;
    nomnoml.draw(canvas, generateNomnomlFromSchemaEntity(this.props.entity, this.props.schemaMap));
  }

  componentDidUpdate() {
    const { canvas } = this;
    nomnoml.draw(canvas, generateNomnomlFromSchemaEntity(this.props.entity, this.props.schemaMap));
  }

  renderPropertyDisplay(prop) {
    const { onSelectEntity, classes, t } = this.props;
    return (
      <Paper key={prop.title} className={classes.propertyDisplay} elevation={1}>
        <Typography variant="h5">{prop.title || prop.$id}</Typography>
        <Typography variant="body1">{`Property: ${prop.$id}`}</Typography>
        { prop.description && <Typography variant="body1">{`Short description: ${prop.description}`}</Typography> }
        { t(prop.$id) !== prop.$id && (
          <Typography variant="body2" className={classes.longtext}>
            {`Long description: ${t(prop.$id)}`}
          </Typography>
        )}
        <Button
          onClick={() => onSelectEntity(prop)}
          variant="outlined"
          color="secondary"
        >
          Go to specification
        </Button>
      </Paper>
    );
  }

  render() {
    const { classes, entity, t, schemaMap } = this.props;
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
        { entity.properties && (
          <Typography variant="h5">{`Description of properties for ${entity.title}`}</Typography>
        )}
        { entity.properties && Object.keys(entity.properties).map(key => {
          const prop = entity.properties[key];
          if (prop.$id && prop.type && prop.type === 'object') {
            return this.renderPropertyDisplay(prop);
          } else if (prop.items && prop.items.$ref && schemaMap[prop.items.$ref]) {
            return this.renderPropertyDisplay(schemaMap[prop.items.$ref]);
          } else if (prop.$ref) {
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
  onSelectEntity: PropTypes.func.isRequired,
  schemaMap: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(translate('doc')(FormatEntityDisplay));
