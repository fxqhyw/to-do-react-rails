import React, { Component } from 'react';

class DeadlinePicker extends Component {
    render() {
        return(
        <span onClick={this.props.onClick} ><i className="fas fa-calendar-alt" >
        </i></span>
        );
    }
}


export default DeadlinePicker;
