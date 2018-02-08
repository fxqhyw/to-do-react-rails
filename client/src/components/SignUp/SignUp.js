import React, { Component } from 'react';
import axios from 'axios';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


import FormErrors from './FormErrors';
import './SignUp.css';

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        formErrors: {email: '', password: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false
    };

    handleUserInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value},
            () => {this.validateField(name, value)});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post(
        'http://localhost:3001/api/v1/users',
            {
                user
            }    
        )
        .then(response => {
            alert("You are successfuly register");
        })
        .catch(error => console.log(error));
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                      }, this.validateForm);
    }

    validateForm = () => {
        this.setState({formValid: this.state.emailValid &&
                                  this.state.passwordValid});
    }

    errorClass = (error) => {
        return(error.length === 0 ? '' : 'has-error');
    }

    render () {
        return (
            <div className="Signup">
                    <FormErrors formErrors={this.state.formErrors} />
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
                        onChange={this.handleUserInput} />
                    </FormGroup>
                    <Button type="submit"
                    block
                    bsSize="large"
                    disabled={!this.state.formValid}>
                        Sign up
                    </Button>
                </form>
            </div>
        );
    }
}
export default SignUp;