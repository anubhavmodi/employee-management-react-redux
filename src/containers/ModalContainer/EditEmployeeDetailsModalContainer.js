import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestUpdateEmployee } from '../../reducers/employeeReducer';
import { Button, Modal, ButtonGroup } from 'react-bootstrap';
import { FieldGroup } from '../../components/FieldGroup/FieldGroup';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { dateConverter, isNOTNullAndEmpty } from '../../helper/helper';
import { validation } from '../../helper/validation';
import { FieldToggleGroup } from '../../components/FieldToggleGroup/FieldToggleGroup';
import { FieldSelectGroup } from '../../components/FieldSelectGroup/FieldSelectGroup';
import { AllocationDetails } from '../../components/AllocationDetails/AllocationDetails';
import { EmployeeDetails } from '../../components/EmployeeDetails/EmployeeDetails';

export class EditEmployeeDetailsModalContainer extends Component {
  constructor(props) {
    super(props);
    console.log(this.props, "Edit employee props");
    this.state = {
      id: Number,
      clientEmpId: '',
      vendorEmpId: '',
      firstName: '',
      lastName: '',
      empAllocationList: [],
      isEmployeeActive: Boolean,
      formErrors: {
        clientEmpId: 'Please enter valid client id',
        vendorEmpId: 'Please enter valid vendor id',  
        firstName: 'Please enter valid first name', 
        lastName: 'Please enter valid last name', 
        isEmployeeActive: "Please select employee status"
      },
      fieldValidity: { clientEmpId: false,vendorEmpId: false,firstName: false, lastName:false, projectManager: false, projectCode:false, empStartDate: false,empEndDate: false, isEmployeeActive: false },
      fieldDirty: { clientEmpId: false,vendorEmpId: false,firstName: false, lastName:false, projectManager: false, projectCode:false, empStartDate: false,empEndDate: false, isEmployeeActive: false },
      formValid: false,
      isSubmitted: false,
      popupAction: ''
    }
    this.saveEmployeeDetails = this.saveEmployeeDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAllocationChange = this.handleAllocationChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.addAllocation = this.addAllocation.bind(this);
    this.removeAllocation = this.removeAllocation.bind(this);
   }

  saveEmployeeDetails() {
    this.validateForm();
    if(this.state.formValid) {
      var payload = {
      	id: this.state.id,
        clientEmpId: this.state.clientEmpId,
        vendorEmpId: this.state.vendorEmpId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        employeeAllocationList: this.state.empAllocationList,
        active: this.state.isEmployeeActive
      }
      this.props.requestUpdateEmployee(payload);
      this.props.onClose();
    }
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {this.validateField(name, value)});
  }

  handleAllocationChange(e) {
  	let updateAllocationList = this.state.empAllocationList;
  	const name = e.target.name;
    const value = e.target.value;
  	updateAllocationList.map((allocation, index) => {
  		if(index == e.target.dataset.key) {
  			updateAllocationList[index][name] = value; 
  		}
  	});
  	this.setState({ empAllocationList : updateAllocationList });
  	console.log(this.props, "handle allocation change");
  }

  handleToggle(e) {
    const isEmployeeActive = e.target.value === 'active' ? true : false;
    const name = e.target.name;
    this.setState({ isEmployeeActive: isEmployeeActive }, () => {this.validateField(name, isEmployeeActive)});
  }

  addAllocation(e) {
  	let allocationObj = {
  		projectCode: '',
  		projectManager: '',
  		empStartDate: '',
  		empEndDate: ''
  	}
  	let updatedAllocationList = this.state.empAllocationList;
  	updatedAllocationList.push(allocationObj);
  	this.setState({ popupAction: 'ADD', empAllocationList: updatedAllocationList });
  	console.log(this.props, "add allocation");
  }

  removeAllocation(e) {
  	let updatedAllocationList = this.state.empAllocationList;
  	let objectToRemove = e.target.dataset.row;
  	updatedAllocationList.splice(objectToRemove,1);
  	this.setState({ popupAction: 'DELETE', empAllocationList: updatedAllocationList });
  	console.log(this.props, "remove allocation");
  }

  componentWillReceiveProps(newProps) {
  	console.log(newProps, "new props edit employee");
  	if(newProps.onOpen && this.state.popupAction !== 'ADD' && this.state.popupAction !== 'DELETE'){
	  	let newValues = newProps.employee;
	    if(Object.keys(newValues).length !== 0) {
	      this.setState({ 
		      id: newValues.id,
		      clientEmpId: isNOTNullAndEmpty(newValues.clientEmpId) ? newValues.clientEmpId : '',
		      vendorEmpId: isNOTNullAndEmpty(newValues.vendorEmpId) ? newValues.vendorEmpId : '', 
		      firstName: isNOTNullAndEmpty(newValues.firstName) ? newValues.firstName : '',
		      lastName: isNOTNullAndEmpty(newValues.lastName) ? newValues.lastName : '',
		      empAllocationList: JSON.parse(JSON.stringify( newValues.employeeAllocationList )),
		      isEmployeeActive: newValues.active,
		      fieldValidity: {
		        clientEmpId: isNOTNullAndEmpty(newValues.clientEmpId),
		        vendorEmpId: isNOTNullAndEmpty(newValues.vendorEmpId),
		        firstName: isNOTNullAndEmpty(newValues.firstName) && newValues.firstName.length > 0,
		        lastName: isNOTNullAndEmpty(newValues.lastName) && newValues.lastName.length > 0,
		        isEmployeeActive: (newValues.active !== null)
		      },
		      formValid: (isNOTNullAndEmpty(newValues.clientEmpId) && 
		                  isNOTNullAndEmpty(newValues.vendorEmpId) &&
		                  isNOTNullAndEmpty(newValues.firstName) && newValues.firstName.length > 0 && isNOTNullAndEmpty(newValues.lastName) && newValues.lastName.length > 0 &&
		                  isNOTNullAndEmpty(newValues.active))
		      });
	    }
	}
  }

  shouldComponentUpdate(nextProps) {
    console.log(this.props, nextProps, "Should component update edit employee");
    return true;
  }

  componentDidMount() {
    console.log(this.props, this.state, "component did mount edit employee");
    return true;
  }

  componentWillMount() {
    console.log(this.props, this.state, "component will mount edit employee");
    return true;
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

    const noAllocation = {
    	marginBottom: '24px'
    }

    const noAllocationHeader = {
   		borderBottom: '1px solid lightgrey',
    	paddingBottom: '18px'
    }

    return (
      <div>
        <Modal show={this.props.onOpen} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit employee details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <form>
           	  <EmployeeDetails
           	  	state={this.state}
           	  	handleChange={this.handleChange}
           	  	handleToggle={this.handleToggle}
       		  />
              <div>
              	<h4 style={noAllocationHeader}> Allocation details </h4>
              	{
              		this.state.empAllocationList.length === 0 ? <div style={noAllocation}>No allocation found</div> :
              		this.state.empAllocationList.map((allocation, index) => {
              			return (
              				<div key={index}>
	              				<AllocationDetails 
	              					allocation={allocation}
	              					index={index}
	              					handleAllocationChange={this.handleAllocationChange}
	              					projectData={this.props.projectData}
	              					removeAllocation={this.removeAllocation}
	              					addAllocation={this.addAllocation}
	              					type="allocation"
	              					name="allocation-details"
	              				/>
	              			</div>
              			)
              		})
              	}
              </div>
              <div className="col-xs-12">
              	<button type="button" className="btn btn-default col-xs-offset-3 col-xs-6" onClick={this.addAllocation}>Add Allocation</button>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
          <div style={rowStyle} className="col-xs-12">
            <Button onClick={this.saveEmployeeDetails}>Update Employee</Button>
            <Button onClick={this.props.onClose}>Close</Button>
          </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

//Connect

function mapStateToProps(state) {
console.log(state , 'new employee modal state')
  return {
    projectData: state.reducer.projectData.projectData,
    employees: state.reducer.employeeData.employeeData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestUpdateEmployee }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployeeDetailsModalContainer);