import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export function FieldGroup({ id, label, help, showError, errorMessage, keyValue, ...props }) {
  return (
    <FormGroup controlId={id} validationState={showError ? 'warning' : 'success'}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl data-key={keyValue} {...props} />
      {showError && <HelpBlock>{errorMessage}</HelpBlock>}
    </FormGroup>
  );
}