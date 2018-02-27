import React from 'react';

const editTaskForm = (props) => (
    <div className="editTaskForm">
        <form onBlur={props.edit} >
                <input type="text" defaultValue={props.name} autoFocus />
        </form>
    </div>
);

export default editTaskForm;