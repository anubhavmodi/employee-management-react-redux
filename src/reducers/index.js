import { combineReducers } from 'redux';
import { getProjectsReducer, addProjectReducer, getProjectDataReducer  } from './projectReducer';
import { getEmployeesReducer, addEmployeeReducer, updateEmployeeReducer, selectEmployeeReducer} from './employeeReducer';

const rootReducer = combineReducers({
  employeeData: getEmployeesReducer,
  addEmployeeData: addEmployeeReducer,
  updateEmployeeData: updateEmployeeReducer,
  projectData: getProjectsReducer,
  addProjectData: addProjectReducer,
  projectDataForCode: getProjectDataReducer,
  selectedEmployee: selectEmployeeReducer
});

export default rootReducer;