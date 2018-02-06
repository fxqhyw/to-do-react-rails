import React, { Component } from 'react';

class SignIn extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("email", this.inputNode1.value);
        formData.append("password", this.inputNode2.value);

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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='email'>email</label> <br />
                    <input type='email' id='email' name='email' ref={node => {this.inputNode1 = node}}/>
                    <br />
                    <label htmlFor='password'>Password</label> <br />
                    <input type='password' id='password' name='password' ref={node => {this.inputNode2 = node}}/>
                    <br />
                    <input type='submit' value='Sign in' />
                </form>
            </div>
        );
    }
}

export default SignIn;