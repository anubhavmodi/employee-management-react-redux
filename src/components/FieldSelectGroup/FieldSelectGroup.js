import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export function FieldSelectGroup({ id, label, dataSet, showError, errorMessage, onChange, name, value, keyValue }) {
  return (
    <FormGroup controlId={id} name={name} validationState={showError ? 'warning' : 'success'}>
	    <ControlLabel>{label}</ControlLabel>
	    <FormControl componentClass="select" placeholder="select" onChange={onChange} name={name} value={value} data-key={keyValue}>
	      <option value="select">select</option>
	      {
	        !dataSet ? <tr><td><p>Loading...</p></td></tr> :
	        dataSet.map((data, index) => {
	          return (
	              <option key={index} value={data.projectCode}>{data.projectCode}</option>
	          )
	        })
	      }
	    </FormControl>
	    {showError && <HelpBlock>{errorMessage}</HelpBlock>}
	</FormGroup>
  );
}