import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { FieldGroup } from '../FieldGroup/FieldGroup';
import { FieldSelectGroup } from '../FieldSelectGroup/FieldSelectGroup';
import { FieldToggleGroup } from '../FieldToggleGroup/FieldToggleGroup';
import { dateConverter } from '../../helper/helper';


export class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
      return (
          <div className="employee-section">
              <FieldGroup
                id="formControlsId"
                type="text"
                label="Client Id"
                placeholder="Enter client id"
                value={this.props.state.clientEmpId}
                name="clientEmpId"
                onChange={this.props.handleChange}
                showError={(this.props.state.isSubmitted || this.props.state.fieldDirty.clientEmpId) && !this.props.state.fieldValidity.clientEmpId}
                errorMessage={this.props.state.formErrors.clientEmpId}
              />
              <FieldGroup
                id="formControlsId"
                type="text"
                label="Vendor Id"
                placeholder="Enter vendor id"
                value={this.props.state.vendorEmpId}
                name="vendorEmpId"
                onChange={this.props.handleChange}
                showError={(this.props.state.isSubmitted || this.props.state.fieldDirty.vendorEmpId) && !this.props.state.fieldValidity.vendorEmpId}
                errorMessage={this.props.state.formErrors.vendorEmpId}
              />
              <FieldGroup
                id="formControlsFirstName"
                type="text"
                label="First Name"
                placeholder="Enter first name"
                value={this.props.state.firstName}
                name="firstName"
                onChange={this.props.handleChange}
                showError={(this.props.state.isSubmitted || this.props.state.fieldDirty.firstName) && !this.props.state.fieldValidity.firstName}
                errorMessage={this.props.state.formErrors.firstName}
              />
              <FieldGroup
                id="formControlsLastName"
                type="text"
                label="Last Name"
                placeholder="Enter last name"
                value={this.props.state.lastName}
                name="lastName"
                onChange={this.props.handleChange}
                showError={(this.props.state.isSubmitted || this.props.state.fieldDirty.lastName) && !this.props.state.fieldValidity.lastName}
                errorMessage={this.props.state.formErrors.lastName}
              />
              <FieldToggleGroup
                id="formControlsEmpStatus"
                type="text"
                label="Employee Status"
                isActive={this.props.state.isEmployeeActive}
                onClick={this.props.handleToggle}
                showError={(this.props.state.isSubmitted || this.props.state.fieldDirty.isEmployeeActive) && !this.props.state.fieldValidity.isEmployeeActive}
                errorMessage={this.props.state.formErrors.isEmployeeActive}
                name="isEmployeeActive"
              />
          </div>
        );
  }
}