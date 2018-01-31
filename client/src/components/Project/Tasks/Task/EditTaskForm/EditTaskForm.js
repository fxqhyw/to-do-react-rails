import React from 'react';

const editTaskForm = (props) => (
    <form onBlur={props.edit} >
            <input type="text" />
    </form>
);

export default editTaskForm;