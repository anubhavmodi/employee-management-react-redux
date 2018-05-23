
import { createAction, handleActions } from 'redux-actions';

// Entity Level Actions
export const GET_PROJECT_REQUEST = 'get/project/REQUEST';
export const GET_PROJECT_RECEIVE = 'get/project/RECEIVE';
export const requestProjects = createAction(GET_PROJECT_REQUEST);
export const receiveProjects = createAction(GET_PROJECT_RECEIVE);

export const ADD_PROJECT_REQUEST = 'post/project/REQUEST';
export const ADD_PROJECT_RECEIVE = 'post/project/RECEIVE';
export const requestAddProject = createAction(ADD_PROJECT_REQUEST);
export const receiveAddProject = createAction(ADD_PROJECT_RECEIVE);

export const GET_PROJECT_DATA_REQUEST = 'get/projectData/REQUEST';
export const GET_PROJECT_DATA_RECEIVE = 'get/projectData/RECEIVE';
export const requestProjectData = createAction(GET_PROJECT_DATA_REQUEST);
export const receiveProjectData = createAction(GET_PROJECT_DATA_RECEIVE);

export const getProjectsReducer = handleActions(
  {
    [GET_PROJECT_REQUEST]: (state, payload) => ({
      isLoading: true,
    }),
    [GET_PROJECT_RECEIVE]: (state, { payload, error }) => {
      if (error) {
        return error;
      }
      return {
        ...state,
        isLoading: false,
        projectData: payload.resultObject
      };
    }
  },
  {
    isLoading : true
  }
);

export const addProjectReducer = handleActions(
  {
    [ADD_PROJECT_REQUEST]: (state, payload) => ({
      isLoading: true,
    }),
    [ADD_PROJECT_RECEIVE]: (state, { payload, error }) => {
      if (error) {
        return error;
      }
      return {
        ...state,
        isLoading: false,
        addedProject: payload.resultObject
      };
    }
  },
  {
    isLoading : true
  }
);


export const getProjectDataReducer = handleActions(
  {
    [GET_PROJECT_DATA_REQUEST]: (state, payload) => ({
      isLoading: true,
    }),
    [GET_PROJECT_DATA_RECEIVE]: (state, { payload, error }) => {
      if (error) {
        return error;
      }
      return {
        ...state,
        isLoading: false,
        projectDataForCode: payload.resultObject
      };
    }
  },
  {
    isLoading : true
  }
);
