//Actions
import * as type from '../constants/ActionTypes';
import { req } from './apiConfig';

export function getEmployeeList(){
  const request = req.get('getEmployeeDetails');
  //const request = req.get('../data/employee.json');
  return request.then(response => {
          // Should handle errors
          return response;
      })
      .catch(error => {
          return error;
      });
}

export function addEmployeeData(data){
  const request = req.post('saveEmployeeDetails', data);
    return request.then(response => {
          // Should handle errors
          return response;
      })
      .catch(error => {
          return error;
      });
}

export function updateEmployeeData(data){
  const request = req.post('saveEmployeeDetails', data);
    return request.then(response => {
          // Should handle errors
          return response;
      })
      .catch(error => {
          return error;
      });
}