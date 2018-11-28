import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { translate } from 'react-i18next';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// local
import FileValidation from './FileValidation';

const styles = () => ({
  appBar: {
    position: 'relative',
    boxShadow: 0,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FileDialog extends Component {
  constructor(props) {
    super(props);
  }

  handleCloseDialog = () => {
    this.props.store.ui.showUiComponent('showFileDialog', false);
  }

  render() {
    const { classes, store } = this.props;
    const { ui } = store;
    return (
      <Dialog
        fullScreen
        open={ui.showFileDialog}
        onClose={this.handleCloseDialog}
        TransitionComponent={Transition}
      >
        <AppBar elevation={0} className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              File validation and example files
            </Typography>
            <IconButton color="inherit" onClick={this.handleCloseDialog} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Divider />
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>File validation</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FileValidation store={this.props.store} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Example files</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              List example files
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Dialog>
    );
  }
}

FileDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default withStyles(styles)(translate()(observer(FileDialog)));
