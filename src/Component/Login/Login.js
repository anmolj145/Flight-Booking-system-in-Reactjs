import React, { Component } from 'react';
import './Login.css'
import { login } from '../../Service/service';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            emailf: '',
            passwordf: ''
        }
    }

    myEmailHandler = (event) => {
        this.setState({ emailf: event.target.value });
    }

    myPasswordHandler = (event) => {
        this.setState({ passwordf: event.target.value });
    }

    submitHandler = async (event) => {
        event.preventDefault();

        let email = this.state.emailf;
        let password = this.state.passwordf;

        await login({
            email: email,
            password: password
        });

        if (localStorage.getItem("token") !== null) {
            this.props.history.push("/booking")
        }
        else {
            this.props.history.push("/login")
        }
    }

    render() {
        return (
            <div className="form-l">
                <form>
                    <div className="form-group">
                        <label className="la" htmlFor="emailf">Email</label>
                        <input type="email" className="form-control" id="emailf" onChange={this.myEmailHandler} aria-describedby="emailHelp" placeholder="Enter Email" />
                    </div>

                    <div className="form-group">
                        <label className="la" htmlFor="passwordf">Password</label>
                        <input type="password" className="form-control" autoComplete="off" onChange={this.myPasswordHandler} id="passwordf" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={this.submitHandler} className="btn">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;