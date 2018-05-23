//Actions
import { req } from './apiConfig';


export function getProjectList(){
  const request = req.get('getProjectDetails');
  //const request = req.get('../data/project.json');
    return request.then(response => {
          // Should handle errors
          return response;
      })
      .catch(error => {
          return error;
      });
}

export function addProjectData(data){
  const request = req.post('saveProjectDetails', data);
    return request.then(response => {
          // Should handle errors
          return response;
      })
      .catch(error => {
          return error;
      });
}

export function getProjectData(data){
  const request = req.post('getProjectDetailsForProjectCode', data);
    return request.then(response => {
          // Should handle errors
          return response;
      })
      .catch(error => {
          return error;
      });
}
