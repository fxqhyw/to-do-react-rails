import React, { Component } from 'react';

class DeadlinePicker extends Component {
    render() {
        return(
        <button onClick={this.props.onClick} disabled={this.props.dis}><i className="fas fa-calendar-alt" >
        </i></button>
        );
    }
}


export default DeadlinePicker;
