import React, { Component } from 'react';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';
import { login } from '../api/apiCalls';
import axios from 'axios';
import ButtonProgress from '../components/ButtonProgress';

class LoginPage extends Component {

    state = {
        username: null,
        password: null,
        error: null,
        pendingApicall: false
    }

    componentDidMount() {
        axios.interceptors.request.use((request) => {
            this.setState({ pendingApicall: true });
            return request;
        });

        axios.interceptors.response.use((response) => {
            this.setState({ pendingApicall: false });
            return response;
        }, (error) => {
            this.setState({ pendingApicall: false });
            throw error;
        });
    }

    handleOnChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            error: null
        });
    }

    handleOnClickLogin = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        const credentials = {
            username,
            password
        }
        this.setState({
            error: null
        });
        try {
            await login(credentials);
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            })
        }
    }

    render() {
        const { t } = this.props;
        const { username, password, error, pendingApicall } = this.state;
        const buttonEnabled = username && password;
        return (
            <div className="container my-5">
                <h1 className="text-center mb-5">{t('Login')}</h1>
                <form>
                    <Input name="username" label={t('Username')} handleOnChange={this.handleOnChange} />
                    <Input name="password" label={t('Password')} handleOnChange={this.handleOnChange} type="password" />
                    {
                        error &&
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    }
                    <div className="text-center">
                        <ButtonProgress onClick={this.handleOnClickLogin}
                            disabled={!buttonEnabled || pendingApicall}
                            pendingApiCall={pendingApicall}
                            text={t('Login')} />
                    </div>
                </form >
            </div >
        )
    }
}

export default withTranslation()(LoginPage);