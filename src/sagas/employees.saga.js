import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { getEmployeeList, addEmployeeData, updateEmployeeData } from '../services/employeeServices';
import {
  receiveEmployees, receiveAddEmployee, receiveSelectEmployee, receiveUpdateEmployee,receiveRemoveEmployee
} from '../reducers/employeeReducer';

// Saga functionality, can be one or multiple functions
export function* getEmployeesSaga(payload) {
  // We wrap this in a try catch here so that we could use some
  // common error logging software here to send the request/processing
  // errors to a 3rd party whilst keeping the action reducers pure.
  try {
    const { data } = yield call(getEmployeeList,payload);
    yield put(receiveEmployees(data));
  } catch (error) {
    console.log(error, "saga data catch");
    yield put(receiveEmployees(error));
  }
}

export function* addEmployeeSaga(payload) {
  // We wrap this in a try catch here so that we could use some
  // common error logging software here to send the request/processing
  // errors to a 3rd party whilst keeping the action reducers pure.
  try {
    const { data } = yield call(addEmployeeData,payload);
    yield put(receiveAddEmployee(data));
  } catch (error) {
    yield put(receiveAddEmployee(error));
  }
}

export function* updateEmployeeSaga(payload) {
  // We wrap this in a try catch here so that we could use some
  // common error logging software here to send the request/processing
  // errors to a 3rd party whilst keeping the action reducers pure.
  try {
    const { data } = yield call(updateEmployeeData,payload);
    yield put(receiveUpdateEmployee(data));
  } catch (error) {
    yield put(receiveUpdateEmployee(error));
  }
}

export function* selectEmployeeData(employee) {
    yield put(receiveSelectEmployee(employee));
}

export function* removeEmployeeData(employee) {
    yield put(receiveRemoveEmployee(employee));
}