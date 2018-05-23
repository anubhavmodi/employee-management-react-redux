import React, { Component, PropTypes } from 'react';
import { Table, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { dateUSFormat } from '../../helper/helper';
import EmployeeTableColumn from '../../containers/DashboardContainers/EmployeeTableColumn';
import EditEmployeeDetailsModalContainer from '../../containers/ModalContainer/EditEmployeeDetailsModalContainer';

class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showModal: false,
      employee: {},
      expanded: {}
    }

    this.onClose = this.onClose.bind(this);
    this.toggleRow = this.toggleRow.bind(this);
   }

  handleClick(employee){
    console.log(employee, "selected employee");
    this.setState({ showModal: true, employee: employee });
  }

  onClose(){
    this.setState({ showModal: false });
  }

  toggleRow(e){
    let keyValue = e.target.dataset.key;

    this.setState({
      expanded: {
        [keyValue]: (this.state.expanded[keyValue] !== undefined) ? !this.state.expanded[keyValue] : true
      }
    })
  }

  shouldComponentUpdate(nextProps) {
    console.log(this.props, nextProps, "Should component update table");
    return true;
  }

  render() {
      return (
          <div className="custom-container">
            <div className="custom-container-header">
              <div className="custom-container-header-index"><p>#</p></div>
              <div className="custom-container-header-name"><p>Client ID</p></div>
              <div className="custom-container-header-name"><p>Vendor ID</p></div>
              <div className="custom-container-header-name"><p>First Name</p></div>
              <div className="custom-container-header-name"><p>Last Name</p></div>
              <div className="custom-container-header-name"><p>Active</p></div>
              <div className="custom-container-header-index"><p>Edit</p></div>
            </div>
              {
                !this.props.employees?<tr><td><h1>Loading...</h1></td></tr>:
                this.props.employees.map((employee, index)=>{
                  let progressPercent = Math.abs(employee.current_step/employee.total_steps)*100
                  return (
                    <div className="custom-container-section" key={employee.id}>
                                          
                        <div className="custom-container-row">
                        <div className="custom-container-row-index">
                          {
                            this.state.expanded[index] ? <Glyphicon glyph='menu-up' data-key={index} onClick={(e) => this.toggleRow(e)}/> : 
                            <Glyphicon glyph='menu-down' data-key={index} onClick={(e) => this.toggleRow(e)}/>
                          }
                        </div>
                        <div className="custom-container-row-data"><p>{employee.clientEmpId}</p></div>
                        <div className="custom-container-row-data"><p>{employee.vendorEmpId}</p></div>
                        <div className="custom-container-row-data"><p>{employee.firstName}</p></div>
                        <div className="custom-container-row-data"><p>{employee.lastName}</p></div>
                        <div className="custom-container-row-data"><p className={employee.active?'circleGreen':'circleGray'}></p></div>
                        <div className="custom-container-row-index"><Glyphicon glyph='edit' onClick={() => this.handleClick(employee)}/></div>
                        <div className={this.state.expanded[index] ? 'collapse in' : 'collapse'}>
                          <div className="custom-container-subheader">
                            <div className="custom-container-subheader-name"><p>Project Code</p></div>
                            <div className="custom-container-subheader-name"><p>Project Manager</p></div>
                            <div className="custom-container-subheader-name"><p>Start date</p></div>
                            <div className="custom-container-subheader-name"><p>End date</p></div>
                            {
                              (employee.employeeAllocationList.length == 0) ? <div className="custom-container-sub-row-data">No Allocation data</div> :
                              employee.employeeAllocationList.map((allocation) => {
                                return (
                                  <div key={allocation.id} className="custom-container-sub-row">
                                    <div className="custom-container-sub-row-data">{allocation.projectCode}</div>
                                    <div className="custom-container-sub-row-data">{allocation.projectManager}</div>
                                    <div className="custom-container-sub-row-data">{dateUSFormat(allocation.empStartDate)}</div>
                                    <div className="custom-container-sub-row-data">{dateUSFormat(allocation.empEndDate)}</div>
                                  </div>
                                )
                              })
                            }
                          </div>
                          </div>
                         </div>
                      
                    </div>
                  )
               })
              }
            <EditEmployeeDetailsModalContainer onOpen={this.state.showModal} onClose={this.onClose} employee={this.state.employee} />
          </div>
        );
  }
}

// MainviewRows.propTypes = {
// }

export default EmployeeTable;