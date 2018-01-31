import React from 'react';
import './ProjectForm.css';



const projectForm = (props) => (
    
    <form onSubmit={props.onSubmit}>
        <label>
            Name:
        <input type="text" value={props.value} onChange={props.onChange} />
        </label>
        <input className="New" type="submit" value="Submit" />
    </form>   
);

export default projectForm;