const isFutureDate = function(value) {
	return value !== null && value !== '';
}

export function validation(fieldName, value) {
	let fieldValidity = {};

    switch(fieldName) {
      case 'clientEmpId':
        fieldValidity['clientEmpId'] = (value !== null && value !== '');
        break;
      case 'vendorEmpId':
        fieldValidity['vendorEmpId'] = (value !== null && value !== '');
        break;
      case 'firstName':
        fieldValidity['firstName'] = (value !== null && value !== '');
        break;
       case 'lastName':
        fieldValidity['lastName'] = (value !== null && value !== '');
        break;
      case 'projectManager':
        fieldValidity['projectManager'] = (value !== null && value !== '');
        break;
      case 'projectCode':
        fieldValidity['projectCode'] = (value !== null && value !== '');
        break;
      case 'projectName':
        fieldValidity['projectName'] = (value !== null && value !== '');
        break;
      case 'projectOwner':
        fieldValidity['projectOwner'] = (value !== null && value !== '');
        break;
      case 'startDate':
        fieldValidity['startDate'] = isFutureDate(value);//(value !== null && value !== '');
        break;
      case 'endDate':
        fieldValidity['endDate'] = isFutureDate(value)//(value !== null && value !== '');
        break;
      case 'isEmployeeActive':
        fieldValidity['isEmployeeActive'] = (value !== null && value !== '');
        break;
      case 'isProjectActive':
        fieldValidity['isProjectActive'] = (value !== null && value !== '');
        break;
      default:
        break;
    }
    return {
    	fieldValidity : fieldValidity
    }
}