import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
// schemas
import buildingSchema from './schemas/building';
import rootSchema from './schemas/root';
// local
import FormatEntityDisplay from './FormatEntityDisplay';
import GitHubIcon from './GitHubIcon';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

// todo: move all this schema stuff to a store
const schemas = [rootSchema, buildingSchema];
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
const mainSchemas = [
  rootSchema,
  buildingSchema,
  rootSchema.definitions.alternative,
  rootSchema.definitions.scenario,
  rootSchema.definitions.project,
  rootSchema.definitions.resourceList,
];
const subSchemas = schemas.reduce((memo, s) => {
  extractEntities(memo, s, true, true, true);
  return memo;
}, []);
const divider1 = { type: 'divider', key: 'divider-1' };
const mainEntities = [...mainSchemas, divider1];
const subEntities = subSchemas.sort((a, b) => {
  if (a.$id < b.$id) return -1;
  if (a.$id > b.$id) return 1;
  return 0;
});
const schemaMap = [...schemas, ...subSchemas].reduce((memo, schema) => {
  if (schema.$id) {
    memo[schema.$id] = schema; // eslint-disable-line
  }
  return memo;
}, {});

class App extends Component {
  state = {
    selectedEntity: rootSchema,
  };

  componentDidMount() {
    console.log('start');
    console.log(buildingSchema);
  }

  handleSelectEntity = entity => {
    window.scrollTo(0, 0);
    this.setState({
      selectedEntity: this.state.selectedEntity === entity ? rootSchema : entity,
    });
  }

  renderExpandIcon = entity => (
    this.state.selectedEntity === entity ? <ExpandLess /> : <ExpandMore />
  )

  renderEntityList = (entities, listTitle) => {
    const { classes } = this.props;
    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div">{listTitle}</ListSubheader>}
      >
        { entities.map(s => {
          if (s.type === 'divider') {
            return <Divider key={s.key} />;
          }
          let properties = {};
          if (s.properties) {
            properties = s.properties; // eslint-disable-line
          } else if (s.allOf && s.allOf.find(a => a.properties)) {
            properties = s.allOf.find(a => a.properties).properties; // eslint-disable-line
          }
          const keys = Object.keys(properties).filter(key => properties[key].$id);
          return (
            <div key={s.$id}>
              <ListItem
                button
                onClick={() => this.handleSelectEntity(s)}
              >
                <ListItemText primary={s.title || s.$id} secondary={s.$id} />
                { keys.length > 0 && this.renderExpandIcon() }
              </ListItem>
              { keys.length > 0 && (
                <Collapse in={this.state.selectedEntity === s} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    { keys.map(key => (
                      <ListItem
                        key={key}
                        button
                        className={classes.nested}
                        onClick={() => this.handleSelectEntity(properties[key])}
                      >
                        <ListItemText
                          inset
                          primary={properties[key].title || properties[key].$id}
                          secondary={properties[key].$id}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
              { rootSchema.title }
            </Typography>
            <IconButton
              onClick={() => {
                window.location = 'https://github.com/bimenergy/dreeam-format';
              }}
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          { this.renderEntityList(mainEntities, 'Main entity list') }
          { this.renderEntityList(subEntities, 'Property list') }
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <FormatEntityDisplay
            entity={this.state.selectedEntity}
            onSelectEntity={this.handleSelectEntity}
            schemaMap={schemaMap}
          />
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(translate()(App));
