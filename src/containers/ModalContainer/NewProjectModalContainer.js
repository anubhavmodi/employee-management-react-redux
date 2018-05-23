import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestAddProject, requestProjectData  } from '../../reducers/projectReducer';
import { FormGroup, ControlLabel, FormControl, Button, Modal } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { FieldGroup } from '../../components/FieldGroup/FieldGroup';
import { FieldToggleGroup } from '../../components/FieldToggleGroup/FieldToggleGroup';
import { validation } from '../../helper/validation';
import { dateConverter, isNOTNullAndEmpty } from '../../helper/helper';

export class NewProjectModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      projectCode : '',
      projectName : '',
      projectOwner : '',
      startDate : '',
      endDate : '',
      isProjectActive: Boolean,
      formErrors: {
        projectCode: 'Please enter valid project code', 
        projectName: 'Please enter valid project name', 
        projectOwner: 'Please enter valid project owner', 
        startDate: 'Please enter valid start name', 
        endDate: 'Please enter valid end date',
        isProjectActive: 'Please enter valid project status'
      },
      fieldValidity: { projectCode: false, projectName: false, projectOwner: false, startDate: false, endDate: false, isProjectActive:false },
      fieldDirty: { projectCode: false, projectName: false, projectOwner: false, startDate: false, endDate: false, isProjectActive: false },
      formValid: false,
      isSubmitted: false
    }
    this.saveProjectDetails = this.saveProjectDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
    this.handleTabout = this.handleTabout.bind(this);
   }

  saveProjectDetails() {
    this.validateForm();
    if(this.state.formValid) {
      var payload = {
        id: this.state.id,
        projectCode: this.state.projectCode,
        projectName: this.state.projectName,
        projectOwner: this.state.projectOwner,
        projectStartDate: this.state.startDate,
        projectEndDate: this.state.endDate,
        active: this.state.isProjectActive,
      };
      this.props.requestAddProject(payload);
      this.props.onClose();
    }
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {this.validateField(name, value)});
  }

  handleTabout(e) {
    this.props.requestProjectData({ projectCode: e.target.value });
  }

  handleToggleChange(e) {
    const isProjectActive = e.target.value === 'active' ? true : false;
    const name = e.target.name;
    const value = isProjectActive;
    this.setState({ isProjectActive: isProjectActive }, () => {this.validateField(name, value)});
  }

  componentWillReceiveProps(newProps) {
    if(newProps.projectData) {
      this.setState({
        id: newProps.projectData.id,
        projectCode: newProps.projectData.projectCode,
        projectName: newProps.projectData.projectName,
        projectOwner: newProps.projectData.projectOwner,
        startDate: dateConverter(newProps.projectData.projectStartDate),
        endDate: dateConverter(newProps.projectData.projectEndDate),
        isProjectActive: newProps.projectData.active,
        fieldValidity: {
          projectCode: isNOTNullAndEmpty(newProps.projectData.projectCode), 
          projectName: isNOTNullAndEmpty(newProps.projectData.projectName), 
          projectOwner: isNOTNullAndEmpty(newProps.projectData.projectOwner), 
          startDate: isNOTNullAndEmpty(newProps.projectData.projectStartDate), 
          endDate: isNOTNullAndEmpty(newProps.projectData.projectEndDate), 
          isProjectActive: isNOTNullAndEmpty(newProps.projectData.active)  
        },
        fieldDirty: { 
          projectCode: false, 
          projectName: false, 
          projectOwner: false, 
          startDate: false, 
          endDate: false, 
          isProjectActive:false 
        },
        formValid: (
          isNOTNullAndEmpty(newProps.projectData.projectCode) &&
          isNOTNullAndEmpty(newProps.projectData.projectName) &&
          isNOTNullAndEmpty(newProps.projectData.projectOwner) && 
          isNOTNullAndEmpty(newProps.projectData.projectStartDate) && 
          isNOTNullAndEmpty(newProps.projectData.projectEndDate) &&
          isNOTNullAndEmpty(newProps.projectData.active)  
        )
      })
    }
  }

  
  validateField(fieldName, value) {
    let validationResult = validation(fieldName, value);
    let fieldValidity = this.state.fieldValidity;
    let fieldDirty = this.state.fieldDirty;
    fieldValidity[fieldName] = validationResult.fieldValidity[fieldName];
    fieldDirty[fieldName] = true;
    this.setState({fieldValidity: fieldValidity, fieldDirty: fieldDirty});
  }

  validateForm() {
    this.setState({
      formValid: this.state.fieldValidity['projectCode'] && 
                 this.state.fieldValidity['projectName'] && 
                 this.state.fieldValidity['projectOwner'] &&
                 this.state.fieldValidity['startDate'] &&
                 this.state.fieldValidity['endDate'] &&
                 this.state.fieldValidity['isProjectActive'],
      isSubmitted : true
    });
  }

  render() {
    const rowStyle = {
        display: 'block',
        marginTop: '24px'
    }
    return (
      <div>
        <Modal show={this.props.onOpen} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add project details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FieldGroup
                id="formControlsProjectCode"
                type="text"
                label="Project Code"
                placeholder="Enter the project code"
                value={this.state.projectCode}
                onChange={this.handleChange}
                onBlur={this.handleTabout}
                name="projectCode"
                showError={(this.state.isSubmitted || this.state.fieldDirty.projectCode) && !this.state.fieldValidity.projectCode}
                errorMessage={this.state.formErrors.projectCode}
              />
              <FieldGroup
                id="formControlsProjectName"
                type="text"
                label="Project Name"
                placeholder="Enter the project name"
                value={this.state.projectName}
                onChange={this.handleChange}
                name="projectName"
                showError={(this.state.isSubmitted || this.state.fieldDirty.projectName) && !this.state.fieldValidity.projectName}
                errorMessage={this.state.formErrors.projectName}
              />
              <FieldGroup
                id="formControlsProjectOwner"
                type="text"
                label="Project Owner"
                placeholder="Enter the project owner"
                value={this.state.projectOwner}
                onChange={this.handleChange}
                name="projectOwner"
                showError={(this.state.isSubmitted || this.state.fieldDirty.projectOwner) && !this.state.fieldValidity.projectOwner}
                errorMessage={this.state.formErrors.projectOwner}
              />
              <FieldGroup
                id="formControlsNewProjStartDate"
                type="date"
                label="Start Date"
                placeholder="Enter the start date"
                value={this.state.startDate}
                onChange={this.handleChange}
                name="startDate"
                showError={(this.state.isSubmitted || this.state.fieldDirty.startDate) && !this.state.fieldValidity.startDate}
                errorMessage={this.state.formErrors.startDate}
              />
              <FieldGroup
                id="formControlsNewProjEndDate"
                type="date"
                label="End Date"
                placeholder="Enter the end date"
                value={this.state.endDate}
                onChange={this.handleChange}
                name="endDate"
                showError={(this.state.isSubmitted || this.state.fieldDirty.endDate) && !this.state.fieldValidity.endDate}
                errorMessage={this.state.formErrors.endDate}
              />
              <FieldToggleGroup
                id="formControlsProjectStatus"
                type="text"
                label="Project Status"
                name="isProjectActive"
                isActive={this.state.isProjectActive}
                onClick={this.handleToggleChange}
                showError={(this.state.isSubmitted || this.state.fieldDirty.isProjectActive) && !this.state.fieldValidity.isProjectActive}
                errorMessage={this.state.formErrors.isProjectActive}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
          <div style={rowStyle} className="col-xs-12">
            <Button onClick={this.saveProjectDetails}>Add Project</Button>
            <Button onClick={this.props.onClose}>Close</Button>
          </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state, "new project modal state");
  return {
    projectData: state.reducer.projectDataForCode.projectDataForCode
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestAddProject, requestProjectData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectModalContainer);