import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './Login.css'

class Login extends Component {

    state = {
        email: '',
        password: ''
    };
    componentWillMount = () => {
        if (window.localStorage.getItem('jwt')) {
            this.props.history.push('/welcome');
        }
    }

    handleUserInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);

        fetch("http://localhost:3001/api/v1/tokens",
            {method: 'POST', body: formData})
        .then(res => res.json())
        .then(res => {console.log(res.jwt); 
            window.localStorage.setItem('jwt', res.jwt);
        })
        .then(() => this.props.history.push('/welcome'))
        .catch((error) => console.log('There is an error: ', error.massage));
    }

    render() {
        return(
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                        autoFocus
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleUserInput} />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleUserInput}
                        />
                    </FormGroup>
                    <Button type="submit"
                    block
                    bsSize="large">
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}
export default Login;
