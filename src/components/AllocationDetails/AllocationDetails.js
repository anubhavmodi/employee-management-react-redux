import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { FieldGroup } from '../FieldGroup/FieldGroup';
import { FieldSelectGroup } from '../FieldSelectGroup/FieldSelectGroup';
import { ProjectDetails } from '../ProjectDetails/ProjectDetails';


export class AllocationDetails extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
      return (
          <div className="allocation-section">
              <button type="button" data-row={this.props.index} className="close" aria-label="Close" onClick={this.props.removeAllocation}>
                <span data-row={this.props.index} aria-hidden="true">×</span>
              </button>
              <ProjectDetails
                  project={this.props.allocation}
                  handleAllocationChange={this.props.handleAllocationChange}
                  projectData={this.props.projectData}
                  projectType="existing"
                  keyValue={this.props.index}
              />
          </div>
        );
  }
}