import React from 'react';

const editTaskForm = (props) => (
    <form onBlur={props.edit} className="editTaskForm">
            <input type="text" defaultValue={props.name} autoFocus/>
    </form>
);

export default editTaskForm;