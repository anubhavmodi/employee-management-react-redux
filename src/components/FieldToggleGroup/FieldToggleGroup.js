import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, ButtonGroup, Button } from 'react-bootstrap';

export function FieldToggleGroup({ id, label, isActive, showError, errorMessage, onClick, name}) {
  const groupStyle = {
  	  width: "100%",
  	  marginBottom: "6px"
  }
  return (
    <FormGroup controlId={id} validationState={showError ? 'warning' : 'success'}>
	    <ControlLabel>{label}</ControlLabel>
	    <ButtonGroup style={groupStyle} name={name}>
	        <Button 
	          className={isActive == true ? 'btn btn-default active' : 'btn btn-default'}
	          value="active"
	          onClick={onClick}
	          name={name}>
	          Active
	        </Button>
	        <Button 
	          className={isActive == false ? 'btn btn-default active' : 'btn btn-default'}
	          value="inactive"
	          onClick={onClick}
	          name={name}>
	          Inactive
	        </Button>
	    </ButtonGroup>
	    {showError && <HelpBlock>{errorMessage}</HelpBlock>}
	</FormGroup>
  );
}
