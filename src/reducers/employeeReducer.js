
import { createAction, handleActions } from 'redux-actions';

// Entity Level Actions
export const GET_EMPLOYEE_REQUEST = 'get/employee/REQUEST';
export const GET_EMPLOYEE_RECEIVE = 'get/employee/RECEIVE';
export const requestEmployees = createAction(GET_EMPLOYEE_REQUEST);
export const receiveEmployees = createAction(GET_EMPLOYEE_RECEIVE);

export const ADD_EMPLOYEE_REQUEST = 'post/employee/REQUEST';
export const ADD_EMPLOYEE_RECEIVE = 'post/employee/RECEIVE';
export const requestAddEmployee = createAction(ADD_EMPLOYEE_REQUEST);
export const receiveAddEmployee = createAction(ADD_EMPLOYEE_RECEIVE);

export const UPDATE_EMPLOYEE_REQUEST = 'update/employee/REQUEST';
export const UPDATE_EMPLOYEE_RECEIVE = 'update/employee/RECEIVE';
export const requestUpdateEmployee = createAction(UPDATE_EMPLOYEE_REQUEST);
export const receiveUpdateEmployee = createAction(UPDATE_EMPLOYEE_RECEIVE);

export const SELECT_EMPLOYEE_REQUEST = 'select/employee/REQUEST';
export const SELECT_EMPLOYEE_RECEIVE = 'select/employee/RECEIVE';
export const requestSelectEmployee = createAction(SELECT_EMPLOYEE_REQUEST);
export const receiveSelectEmployee = createAction(SELECT_EMPLOYEE_RECEIVE);

export const REMOVE_EMPLOYEE_REQUEST = 'remove/employee/REQUEST';
export const REMOVE_EMPLOYEE_RECEIVE = 'remove/employee/RECEIVE';
export const requestRemoveEmployee = createAction(REMOVE_EMPLOYEE_REQUEST);
export const receiveRemoveEmployee = createAction(REMOVE_EMPLOYEE_RECEIVE);

export const getEmployeesReducer = handleActions(
  {
    [GET_EMPLOYEE_REQUEST]: (state, payload) => ({
      isLoading: true,
    }),
    [GET_EMPLOYEE_RECEIVE]: (state, { payload, error }) => {
      if (error) {
        console.log("reequest error");
        return error;
      }
      console.log(payload.resultObject, "reequest success");
      return {
        ...state,
        isLoading: false,
        employeeData: payload.resultObject,
        action: "GETEMPLOYEE"
      };
    }
  },
  {
    isLoading : true
  }
);

export const addEmployeeReducer = handleActions(
  {
    [ADD_EMPLOYEE_REQUEST]: (state, payload) => ({
      isLoading: true,
    }),
    [ADD_EMPLOYEE_RECEIVE]: (state, { payload, error }) => {
      if (error) {
        console.log("reequest error");
        return error;
      }
      let updatedData = state.employeeData;
      return {
        ...state,
        isLoading: false,
        addedEmployee: payload.resultObject,
        action: "ADDEMPLOYEE"
      };
    }
  },
  {
    isLoading : true
  }
);

export const updateEmployeeReducer = handleActions(
  {
    [UPDATE_EMPLOYEE_REQUEST]: (state, payload) => ({
      isLoading: true,
    }),
    [UPDATE_EMPLOYEE_RECEIVE]: (state, { payload, error }) => {
      if (error) {
        console.log("reequest error");
        return error;
      }
      return {
        ...state,
        isLoading: false,
        updatedEmployee: payload.resultObject,
        action: "UPDATEEMPLOYEE"
      };
    }
  },
  {
    isLoading : true
  }
);

export const selectEmployeeReducer = handleActions(
  {
    [SELECT_EMPLOYEE_REQUEST]: (state, payload) => ({
      isLoading: true,
    }),
    [SELECT_EMPLOYEE_RECEIVE]: (state, employee) => {
      return {
        ...state,
        isLoading: false,
        selectEmployeeData: employee.payload.payload,
        action: "OPEN"
      }
    },
    [REMOVE_EMPLOYEE_REQUEST]: (state, payload) => ({
      isLoading: true,
    }),
    [REMOVE_EMPLOYEE_RECEIVE]: (state, employee) => {
      return {
        ...state,
        isLoading: false,
        selectEmployeeData: {},
        action: "CLOSE"
      }
    }
  },
  {
    isLoading : true
  }
);