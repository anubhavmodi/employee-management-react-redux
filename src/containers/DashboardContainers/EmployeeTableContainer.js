import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';
import { SearchEmployee } from '../../components/SearchEmployee/SearchEmployee';
import NewEmployeeModalContainer from '../ModalContainer/NewEmployeeModalContainer';
import NewProjectModalContainer from '../ModalContainer/NewProjectModalContainer';
import { requestEmployees, searchEmployee } from '../../reducers/employeeReducer';
import { requestProjects } from '../../reducers/projectReducer';
import { isNOTNullAndEmpty } from '../../helper/helper';

export class EmployeeTableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employeesList: this.props.employees,
      showProjectModal: false,
      showEmployeeModal: false,
      searchId: ''
    }
    console.log(this.props, "Employee table container");
    this.handleChange = this.handleChange.bind(this);
    this.addNewProject = this.addNewProject.bind(this);
    this.addNewEmployee = this.addNewEmployee.bind(this);
    this.onNewProjectClose = this.onNewProjectClose.bind(this);
    this.onNewEmployeeClose = this.onNewEmployeeClose.bind(this);
    this.searchEmployee = this.searchEmployee.bind(this);
    this.resetTable = this.resetTable.bind(this);
    this.updateEmployeeData = this.updateEmployeeData.bind(this);
    this.addEmployeeData = this.addEmployeeData.bind(this);
   }

  componentWillMount() {
      this.props.requestEmployees();
      this.props.requestProjects();
  }

  handleChange(e){
    this.setState({ searchId: e.target.value });
  }

  addNewProject() {
    this.setState({ showProjectModal: true });
  }

  addNewEmployee() {
    this.setState({ showEmployeeModal: true });
  }

  onNewProjectClose(){
    this.setState({ showProjectModal: false });
  }

  onNewEmployeeClose(){
    this.setState({ showEmployeeModal: false });
  }

  searchEmployee(e){
    if(isNOTNullAndEmpty(this.state.searchId)) {
      let employeeList = this.state.employeesList;
      let filteredData;
      filteredData = employeeList.filter((emp) => {
                        return (this.state.searchId == emp.clientEmpId)
                     });
      this.setState({ employeesList: filteredData });
    }
  }

  resetTable(e) {
    this.setState({ searchId: '' });
    this.props.requestEmployees();
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps.updateEmployeeData, "Updated employee record");
    this.setState({ employeesList: newProps.employees });
    this.updateEmployeeData(newProps.updateEmployeeData);
    this.addEmployeeData(newProps.addedEmployee);
  }

  updateEmployeeData(data) {
    if(data && Object.keys(data).length > 0) {
      let updatedData = this.state.employeesList;
      updatedData.map((emp, index) => {
          if(data.id == emp.id){
            updatedData[index] = data;
          }
      });
      this.setState({ employeesList: updatedData });
    }
  }

  addEmployeeData(data) {
    if(data && Object.keys(data).length > 0) {
      let updatedData = this.state.employeesList;
      updatedData.push(data);
      this.setState({ employeesList: updatedData });
    }
  }

  shouldComponentUpdate(nextProps) {
    console.log(this.props, nextProps, "Should component update employee table contaniner");
    return true;
  }

  componentDidMount() {
    console.log(this.props, this.state, "component did mount employee table contaniner");
    return true;
  }

  render() {
    const buttonStyle = {
      marginLeft: '6%'
    };

    return (
      <div>
        <div className="header"><a className="westpacLogo" title="Westpac Home"></a></div>
        <h2 className="heading">Employee Management System</h2>
        <div className='table-container container'>
          <div className='table-nav col-xs-12'>
            <div className='col-xs-12'>
              <div onClick={this.addNewProject} className='btn col-xs-5' style={buttonStyle}>Add new project</div>
              <div onClick={this.addNewEmployee} className='btn col-xs-5'>Add new employee</div>
            </div>
          </div>
          <SearchEmployee
            type="text"
            name="employeeId"
            value={this.state.searchId}
            onInputChange={this.handleChange} 
            onSearchResult={this.searchEmployee}
            onResetResult={this.resetTable}
          />
          <NewEmployeeModalContainer onOpen={this.state.showEmployeeModal} onClose={this.onNewEmployeeClose}/>
          <NewProjectModalContainer onOpen={this.state.showProjectModal} onClose={this.onNewProjectClose}/>
          <EmployeeTable
            employees={this.state.employeesList}
           />
        </div>
      </div>
    );
  }
}

// Mainview.propTypes = {
// }

function mapStateToProps(state) {
  console.log(state, "employee table state");
  return {
    employees: state.reducer.employeeData.employeeData,
    updateEmployeeData: state.reducer.updateEmployeeData.updatedEmployee,
    addedEmployee: state.reducer.addEmployeeData.addedEmployee
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestEmployees, requestProjects, searchEmployee }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps )(EmployeeTableContainer);