import React from 'react';

import { FormGroup, FormControl } from "react-bootstrap";
// import './ProjectForm.css';



const projectForm = (props) => (
    
    <form onSubmit={props.onSubmit} onBlur={props.onSubmit} className="project-form">
        <FormGroup bsSize="large">
            <FormControl
            placeholder="Start typing here to create a list..."
            value={props.value}
            onChange={props.onChange}
            />
        </FormGroup> 
    </form> 
);

export default projectForm;