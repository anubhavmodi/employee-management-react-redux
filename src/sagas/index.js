import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import { GET_EMPLOYEE_REQUEST, ADD_EMPLOYEE_REQUEST, SEARCH_EMPLOYEE_DATA, UPDATE_EMPLOYEE_REQUEST, SELECT_EMPLOYEE_REQUEST, REMOVE_EMPLOYEE_REQUEST } from '../reducers/employeeReducer';
import { GET_PROJECT_REQUEST, ADD_PROJECT_REQUEST, GET_PROJECT_DATA_REQUEST } from '../reducers/projectReducer';

import { getEmployeesSaga, addEmployeeSaga, searchEmployeeData, updateEmployeeSaga, selectEmployeeData, removeEmployeeData  } from './employees.saga';
import { getProjectsSaga, addProjectSaga, getProjectDataSaga  } from './projects.saga';

export default function* rootSaga() {
  yield all([
    yield takeLatest(GET_EMPLOYEE_REQUEST, getEmployeesSaga),
    yield takeLatest(GET_PROJECT_REQUEST, getProjectsSaga),
    yield takeLatest(ADD_EMPLOYEE_REQUEST, addEmployeeSaga),
    yield takeLatest(ADD_PROJECT_REQUEST, addProjectSaga),
    yield takeLatest(UPDATE_EMPLOYEE_REQUEST, updateEmployeeSaga),
    yield takeLatest(GET_PROJECT_DATA_REQUEST, getProjectDataSaga),
    yield takeLatest(SELECT_EMPLOYEE_REQUEST, selectEmployeeData),
    yield takeLatest(REMOVE_EMPLOYEE_REQUEST, removeEmployeeData),
  ]);
}