import React from 'react';

const editProjectForm = (props) => (
    <form onBlur={props.editProject} className="editForm" >
            <input type="text" defaultValue={props.value} autoFocus={true}/>
    </form>
);

export default editProjectForm;