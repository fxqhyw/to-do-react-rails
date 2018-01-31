import React from 'react';

const editProjectForm = (props) => (
    <form onBlur={props.editProject} >
            <input type="text" />
    </form>
);

export default editProjectForm;