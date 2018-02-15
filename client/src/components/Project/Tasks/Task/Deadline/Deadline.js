import React from 'react';

const deadline = (props) => (
    <span>
        <em>{props.deadline.toString()}</em>
    </span>
);

export default deadline;