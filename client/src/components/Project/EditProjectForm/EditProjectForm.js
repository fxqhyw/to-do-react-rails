import React from 'react';

const editProjectForm = (props) => (
    <form onBlur={props.editProject} className="editProjectForm">
            <input type="text" defaultValue={props.value} autoFocus={true} className="editProjectForm"/>
    </form>
);

export default editProjectForm;