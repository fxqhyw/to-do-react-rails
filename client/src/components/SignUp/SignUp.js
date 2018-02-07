import React, { Component } from 'react';
import axios from 'axios';

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
            console.log(response);
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
            <form className="demoForm" onSubmit={this.handleSubmit}>
            <h2>Sign up</h2>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control"
                    name="email" value={this.state.email} onChange={this.handleUserInput}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control"
                        name="password" value={this.state.password} onChange={this.handleUserInput}/>
                </div>
            <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>
                Sign up
            </button>
            </form>
        );
    }
    }
export default SignUp;