import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { sortByClientIdAction, sortByVendorIdAction, sortByDateAction, sortByNameAction, sortByProjectManagerAction, sortByActiveAction } from '../../actions/sortActions';

export class EmployeeTableColumn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
          <div className="custom-container-header">
            <div className="custom-container-header-name"><p>Client ID</p></div>
            <div className="custom-container-header-name"><p>Vendor ID</p></div>
            <div className="custom-container-header-name"><p>First Name</p></div>
            <div className="custom-container-header-name"><p>Last Name</p></div>
            <div className="custom-container-header-name"><p>Active</p></div>
          </div>
        );
  }
}

export default EmployeeTableColumn;
