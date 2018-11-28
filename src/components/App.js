import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
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
import FileIcon from '@material-ui/icons/InsertDriveFile';
// local
import FormatEntityDisplay from './FormatEntityDisplay';
import GitHubIcon from './GitHubIcon';
import rootSchema from '../../schemas/root';
import FileDialog from './FileDialog';

import packageJson from '../../package.json';

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

class App extends Component {
  handleSelectEntity = entity => {
    window.scrollTo(0, 0);
    this.props.store.schema.setSelectedEntityId(entity.$id);
  }

  handleOpenFileDialog = () => {
    this.props.store.ui.showUiComponent('showFileDialog', true);
  }

  renderExpandIcon = entityId => (
    this.props.store.schema.selectedEntityId === entityId ? <ExpandLess /> : <ExpandMore />
  )

  renderEntityList = (entities, listTitle) => {
    const { classes, store } = this.props;
    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div">{listTitle}</ListSubheader>}
      >
        { entities.map(s => {
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
                <Collapse in={store.schema.selectedEntityId === s.$id} timeout="auto" unmountOnExit>
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
    const { classes, store } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
              { `${rootSchema.title} v${packageJson.version}`}
            </Typography>
            <IconButton
              onClick={this.handleOpenFileDialog}
              color="inherit"
            >
              <FileIcon />
            </IconButton>
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
          { this.renderEntityList(store.schema.mainEntities, 'Main entity list') }
          <Divider key="divider-1" />
          { this.renderEntityList(store.schema.subEntities, 'Property list') }
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <FormatEntityDisplay
            store={store}
          />
        </main>
        { store.ui.showFileDialog && <FileDialog store={store} /> }
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default withStyles(styles)(translate()(observer(App)));
