import React, { Component } from 'react';
import { signUp } from '../api/apiCalls'
import '../bootstrap-override.scss'
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';
import i18n from '../i18n';
import axios from 'axios';
import ButtonProgress from '../components/ButtonProgress';

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
        const { t } = this.props;
        if (inputName === 'password' || inputName === 'passwordRepeat') {
            if ((inputName === 'password' && inputValue !== this.state.passwordRepeat) ||
                (inputName === 'passwordRepeat' && inputValue !== this.state.password)) {
                errors.passwordRepeat = t('Password mismatch');
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
        const { t } = this.props;
        return (
            <div className="container my-5">
                <h1 className="text-center">{t('Sign Up')}</h1>
                <form>
                    <Input name="fullName" label={t("Full Name")} error={fullName} handleOnChange={this.handleOnChange} />
                    <Input name="username" label={t("Username")} error={username} handleOnChange={this.handleOnChange} />
                    <Input name="password" label={t("Password")} error={password} handleOnChange={this.handleOnChange} type="password" />
                    <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeat} handleOnChange={this.handleOnChange} type="password" />
                    <div className="text-center">
                        <ButtonProgress
                            onClick={this.handleSignUp}
                            disabled={pendingApiCall || passwordRepeat !== undefined}
                            pendingApiCall={pendingApiCall}
                            text={t('Sign Up')} />
                    </div>
                </form>
            </div>
        );
    }
}

export default withTranslation()(SignUpPage);