import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { translate } from 'react-i18next';
import promiseJsonFileReader from 'promise-json-file-reader';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
// local
import { Validator } from '../npm/index';
import FileContentDisplay from './FileContentDisplay';

const styles = () => ({});

class FileValidation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedFileContent: null,
      fileError: '',
      formatError: '',
      selectedProjectId: '',
    };
  }

  handleImportFile = e => {
    const file = e.target.files[0];
    promiseJsonFileReader(file)
      .then(data => {
        const validator = Validator();
        const validationResult = validator.validate('root', data);
        if (validationResult) {
          this.setState({
            loadedFileContent: data,
            formatError: '',
            fileError: '',
            selectedProjectId: data.projects[0] ? data.projects[0].id : '',
          });
        } else {
          this.setState({
            formatError: validator.errorsText(),
            fileError: '',
          });
        }
      })
      .catch(err => {
        this.setState({
          fileError: err,
          formatError: '',
        });
      });
  }

  handleSelectProject = projectId => {
    this.setState({
      selectedProjectId: projectId,
    });
  }

  renderFileContentDisplay() {
    const { classes } = this.props;
    const selectedProject = this.state.loadedFileContent.projects.find(p =>
      p.id === this.state.selectedProjectId);
    console.log(selectedProject);
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="project-select">Select project</InputLabel>
          <Select
            value={this.state.selectedProjectId}
            onChange={this.handleSelectProject}
            inputProps={{
              name: 'age',
              id: 'project-select',
            }}
          >
            { this.state.loadedFileContent.projects.map(project => (
              <MenuItem key={project.id} value={project.id}>
                { project.name }
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        { selectedProject && (
          <FileContentDisplay
            data={this.state.loadedFileContent}
            selectedProjectId={this.state.selectedProjectId}
            store={this.props.store}
          />
        )}
      </div>
    );
  }

  render() {
    const { classes, store } = this.props;
    const fileButtonProps = {
      type: 'file',
      id: 'file-input',
      name: 'file-input',
      accept: '.json',
      style: { display: 'none' },
      onChange: this.handleImportFile,
    };
    return (
      <div>
        <input
          {...fileButtonProps}
        />
        <label htmlFor="file-input">
          <Button variant="contained" color="secondary" component="span">
            Select file
          </Button>
        </label>
        { this.state.fileError && (
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="error" gutterBottom>
                Import file error
              </Typography>
              <Typography component="p">
                { this.state.fileError.toString() }
              </Typography>
            </CardContent>
          </Card>
        )}
        { this.state.formatError && (
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="error" gutterBottom>
                File format error
              </Typography>
              <Typography component="p">
                { this.state.formatError.toString() }
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  window.location = 'http://dreeam-format.s3-website-eu-west-1.amazonaws.com';
                }}
              >
                View format
              </Button>
            </CardActions>
          </Card>
        )}
        { this.state.loadedFileContent && this.renderFileContentDisplay() }
      </div>
    );
  }
}

FileValidation.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default withStyles(styles)(translate()(observer(FileValidation)));
