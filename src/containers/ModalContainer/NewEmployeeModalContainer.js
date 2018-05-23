import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestAddEmployee } from '../../reducers/employeeReducer';
import { FormGroup, ControlLabel, FormControl, Button, Modal } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { FieldGroup } from '../../components/FieldGroup/FieldGroup';
import { FieldSelectGroup } from '../../components/FieldSelectGroup/FieldSelectGroup';
import { FieldToggleGroup } from '../../components/FieldToggleGroup/FieldToggleGroup';
import { validation } from '../../helper/validation';

export class NewEmployeeModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientEmpId : '',
      vendorEmpId : '',
      firstName : '',
      lastName: '',
      isEmployeeActive: null,
      formErrors: {
        clientEmpId: 'Please enter valid client id',
        vendorEmpId: 'Please enter valid vendor id',  
        firstName: 'Please enter valid first name',
        lastName: 'Please enter valid last name', 
        isEmployeeActive: 'Please select the employee status'
      },
      fieldValidity: { clientEmpId: false, vendorEmpId:false, firstName: false, lastName:false, isEmployeeActive: false },
      fieldDirty: { clientEmpId: false, vendorEmpId:false, firstName: false, lastName:false, isEmployeeActive: false },
      formValid: false
    }
    this.saveEmployeeDetails = this.saveEmployeeDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
   }

  saveEmployeeDetails() {
    this.validateForm();
    if(this.state.formValid) {
      var payload = {
        clientEmpId: this.state.clientEmpId,
        vendorEmpId: this.state.vendorEmpId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        active: this.state.isEmployeeActive
      };
      this.props.requestAddEmployee(payload);
      this.props.onClose();
    }
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {this.validateField(name, value)});
  }

  handleToggleChange(e) {
    const isEmployeeActive = e.target.value === 'active' ? true : false;
    const name = e.target.name;
    const value = isEmployeeActive;
    this.setState({ isEmployeeActive: isEmployeeActive }, () => {this.validateField(name, value)});
  }

  componentWillReceiveProps(newProps) {
    
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
      formValid: this.state.fieldValidity['clientEmpId'] && 
                 this.state.fieldValidity['vendorEmpId'] && 
                 this.state.fieldValidity['firstName'] && 
                 this.state.fieldValidity['lastName'] &&
                 this.state.fieldValidity['isEmployeeActive'],
      isSubmitted: true
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
            <Modal.Title>Add employee details</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form>
              <FieldGroup
                id="formControlsId"
                type="text"
                label="Client Id"
                placeholder="Enter client id"
                value={this.state.clientEmpId}
                onChange={this.handleChange}
                name="clientEmpId"
                showError={(this.state.isSubmitted || this.state.fieldDirty.clientEmpId) && !this.state.fieldValidity.clientEmpId}
                errorMessage={this.state.formErrors.clientId}
              />
              <FieldGroup
                id="formControlsId"
                type="text"
                label="Vendor Id"
                placeholder="Enter vendor id"
                value={this.state.vendorEmpId}
                onChange={this.handleChange}
                name="vendorEmpId"
                showError={(this.state.isSubmitted || this.state.fieldDirty.vendorEmpId) && !this.state.fieldValidity.vendorEmpId}
                errorMessage={this.state.formErrors.vendorEmpId}
              />
              <FieldGroup
                id="formControlsFirstName"
                type="text"
                label="First Name"
                placeholder="Enter first name"
                value={this.state.firstName}
                onChange={this.handleChange}
                name="firstName"
                showError={(this.state.isSubmitted || this.state.fieldDirty.firstName) && !this.state.fieldValidity.firstName}
                errorMessage={this.state.formErrors.firstName}
              />
              <FieldGroup
                id="formControlsLastName"
                type="text"
                label="Last Name"
                placeholder="Enter last name"
                value={this.state.lastName}
                onChange={this.handleChange}
                name="lastName"
                showError={(this.state.isSubmitted || this.state.fieldDirty.lastName) && !this.state.fieldValidity.lastName}
                errorMessage={this.state.formErrors.lastName}
              />
              <FieldToggleGroup
                id="formControlsEmpStatus"
                type="text"
                label="Employee Status"
                name="isEmployeeActive"
                isActive={this.state.isEmployeeActive}
                onClick={this.handleToggleChange}
                showError={(this.state.isSubmitted || this.state.fieldDirty.isEmployeeActive) && !this.state.fieldValidity.isEmployeeActive}
                errorMessage={this.state.formErrors.isEmployeeActive}
              />
            </form>
            
          </Modal.Body>
          <Modal.Footer>
          <div style={rowStyle} className="col-xs-12">
            <Button onClick={this.saveEmployeeDetails}>Save</Button>
            <Button onClick={this.props.onClose}>Close</Button>
          </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// Mainview.propTypes = {
// }

function mapStateToProps(state) {
console.log(state , 'new employee modal state')
  return {
    projectData: state.reducer.projectData.projectData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestAddEmployee }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEmployeeModalContainer);