import React, { Component } from 'react';
import { signUp } from '../api/apiCalls'
import '../bootstrap-override.scss'
import Input from '../components/Input';

class SignUpPage extends Component {

    state = {
        fullName: null,
        username: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    }

    handleOnChange = (e) => {
        const { name, value } = e.target;
        const errors = { ...this.state.errors };
        errors[name] = undefined;
        this.checkPasswords(name, value, errors);
        this.setState({
            [name]: value,
            errors
        })
    }

    checkPasswords = (inputName, inputValue, errors) => {
        if (inputName === 'password' || inputName === 'passwordRepeat') {
            if ((inputName === 'password' && inputValue !== this.state.passwordRepeat) ||
                (inputName === 'passwordRepeat' && inputValue !== this.state.password)) {
                errors.passwordRepeat = 'Password mismatch';
            } else {
                errors.passwordRepeat = undefined;
            }
        }
    }

    handleSignUp = async (e) => {
        e.preventDefault();
        const { fullName, username, password } = this.state;
        const body = {
            fullName,
            username,
            password
        }
        this.setState({ pendingApiCall: true });

        try {
            const response = await signUp(body);
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors });
            }
        }
        this.setState({ pendingApiCall: false });
    }

    render() {
        const { pendingApiCall, errors } = this.state;
        const { fullName, username, password, passwordRepeat } = errors;

        return (
            <div className="container my-5">
                <h1 className="text-center">Sign Up</h1>
                <form>
                    <Input name="fullName" label="Full Name" error={fullName} handleOnChange={this.handleOnChange} />
                    <Input name="username" label="Username" error={username} handleOnChange={this.handleOnChange} />
                    <Input name="password" label="Password" error={password} handleOnChange={this.handleOnChange} type="password" />
                    <Input name="passwordRepeat" label="Password Repeat" error={passwordRepeat} handleOnChange={this.handleOnChange} type="password" />
                    <div className="text-center">
                        <button className="btn btn-primary btn-lg" disabled={pendingApiCall || passwordRepeat !== undefined}
                            onClick={this.handleSignUp}>
                            {
                                pendingApiCall && <span className="spinner-border spinner-border-sm"></span>
                            }
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUpPage;