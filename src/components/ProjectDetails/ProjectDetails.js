import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { FieldGroup } from '../FieldGroup/FieldGroup';
import { FieldSelectGroup } from '../FieldSelectGroup/FieldSelectGroup';
import { FieldToggleGroup } from '../FieldToggleGroup/FieldToggleGroup';
import { dateConverter } from '../../helper/helper';


export class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
      return (
          <div className="project-section">
              <FieldGroup
                id="formControlsProjectManager"
                type="text"
                label="Project Manager"
                placeholder="Enter the project manager"
                value={this.props.project.projectManager}
                name="projectManager"
                onChange={this.props.handleAllocationChange}
                keyValue={this.props.keyValue}
              />
              <FieldSelectGroup
                id="formControlsProjectCode"
                label="Project Code"
                dataSet={this.props.projectData}
                value={this.props.project.projectCode}
                onChange={this.props.handleAllocationChange}
                name="projectCode"
                keyValue={this.props.keyValue}
              />
              <FieldGroup
                id="formControlsStartDate"
                type="date"
                label="Start Date"
                placeholder="Enter the start date"
                value={dateConverter(this.props.project.empStartDate)}
                name="empStartDate"
                onChange={this.props.handleAllocationChange}
                keyValue={this.props.keyValue}
              />
              <FieldGroup
                id="formControlsEndDate"
                type="date"
                label="End Date"
                placeholder="Enter the end date"
                value={dateConverter(this.props.project.empEndDate)}
                name="empEndDate"
                onChange={this.props.handleAllocationChange}
                keyValue={this.props.keyValue}
              />
          </div>
        );
  }
}