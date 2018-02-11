import React, { Component } from 'react';

class DeadlinePicker extends Component {
    render() {
        return(
        <button onClick={this.props.onClick} disabled={this.props.dis}>
            set deadline
        </button>
        );
    }
}


export default DeadlinePicker;
