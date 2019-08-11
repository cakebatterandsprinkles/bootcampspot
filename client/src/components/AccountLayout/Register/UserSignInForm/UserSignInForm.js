import React from "react";
//require axios for http request
import axios from "axios";
//require withrouter and encapsulate the exported fuction inside
import {withRouter} from "react-router-dom";
import "./UserSignInForm";
import Button from "../Button/Button";
import FormBlock from "../FormBlock/FormBlock";

class UserSignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        //this should refer to the UserInfoForm component
        this.handleInputChange = this
            .handleInputChange
            .bind(this);
        this.submitForm = this
            .submitForm
            .bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});

    }

    submitForm() {
        if (!this.state.email) {
            return alert("You need to enter your email");
        }
        if (!this.state.password) {
            return alert("You need to choose a password");
        }

        axios
            .post('/api/auth', {
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => {
                this
                    .props
                    .history
                    .push("/home");
            })
            .catch((error) => {
                alert(error);
            });
    }

    render() {
        return <div className="flex flex-wrap mx-3 mb-6 bg-white">
            <div className="w-full px-3">
                <FormBlock onChange={this.handleInputChange} value={this.state.email} name="email" labelText="E-mail" placeholderText="johnsmith@gmail.com"/>
            </div>

            <div className="w-full px-3 mt-3">
                <FormBlock onChange={this.handleInputChange} value={this.state.password} name="password" labelText="password" placeholderText="" type="password"/>
            </div>

            <div className="w-full px-3">
                <Button text="Sign In" buttonLink="/home" onClick={this.submitForm}/>
            </div>
        </div>
    }
}

export default withRouter(UserSignInForm);