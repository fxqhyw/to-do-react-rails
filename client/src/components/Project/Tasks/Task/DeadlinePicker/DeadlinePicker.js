import React, { Component } from 'react';

class DeadlinePicker extends Component {
    render() {
        return(
        <button onClick={this.props.onClick}>
            set deadline
        </button>
        );
    }
}


export default DeadlinePicker;
