import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { getProjectList, addProjectData, getProjectData } from '../services/projectServices';
import {
  receiveProjects, receiveAddProject, receiveProjectData
} from '../reducers/projectReducer';

// Saga functionality, can be one or multiple functions
export function* getProjectsSaga(payload) {
  // We wrap this in a try catch here so that we could use some
  // common error logging software here to send the request/processing
  // errors to a 3rd party whilst keeping the action reducers pure.
  try {
    const { data } = yield call(getProjectList,payload);
    yield put(receiveProjects(data));
  } catch (error) {
    yield put(receiveProjects(error));
  }
}

export function* addProjectSaga(payload) {
  // We wrap this in a try catch here so that we could use some
  // common error logging software here to send the request/processing
  // errors to a 3rd party whilst keeping the action reducers pure.
  try {
    const { data } = yield call(addProjectData,payload);
    yield put(receiveAddProject(data));
  } catch (error) {
    yield put(receiveAddProject(error));
  }
}

export function* getProjectDataSaga(payload) {
  // We wrap this in a try catch here so that we could use some
  // common error logging software here to send the request/processing
  // errors to a 3rd party whilst keeping the action reducers pure.
  try {
    const { data } = yield call(getProjectData,payload);
    yield put(receiveProjectData(data));
  } catch (error) {
    yield put(receiveProjectData(error));
  }
}