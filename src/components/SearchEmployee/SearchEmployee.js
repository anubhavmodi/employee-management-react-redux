import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export function SearchEmployee({ name, value, onInputChange, onSearchResult, onResetResult}) {
  return (
  	<Form inline>
		  <FormGroup controlId="formInlineName">
		    <ControlLabel></ControlLabel>{' '}
		    <FormControl type="text" placeholder="Enter client id" name={name} value={value} onChange={onInputChange} />
		  </FormGroup>{' '}
		  <Button type="button" onClick={onSearchResult}>Search Employee</Button>
		  <Button type="button" onClick={onResetResult}>Reset</Button>
	</Form>
  );
}
