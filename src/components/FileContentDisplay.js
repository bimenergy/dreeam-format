import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { translate } from 'react-i18next';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({});

class FileContentDisplay extends Component {
  render() {
    const { classes, data, selectedProjectId } = this.props;
    const project = data.projects.find(p => p.id === selectedProjectId);
    if (!project) {
      return (
        <Typography className={classes.title} color="error" gutterBottom>
          Project was not found
        </Typography>
      );
    }
    return (
      <div>
        <Typography className={classes.title} color="error" gutterBottom>
          { project.name }
        </Typography>
      </div>
    );
  }
}

FileContentDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired, // dreeam format root data
  selectedProjectId: PropTypes.number.isRequired,
  store: PropTypes.object.isRequired,
};

export default withStyles(styles)(translate()(observer(FileContentDisplay)));
