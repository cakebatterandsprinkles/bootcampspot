import React, {Component} from 'react';
import Navbar from '../MainPage/Navbar/Navbar';
import Background from '../MainPage/images/trees.jpg';
import axios from "axios";
import {withRouter} from "react-router-dom";
import FormBlock from '../AccountLayout/Register/FormBlock/FormBlock';
import Button from '../AccountLayout/Register/Button/Button';

class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            text: ''
        };

        this.handleInputChange = this
            .handleInputChange
            .bind(this);

            this.submitForm = this
                .submitForm
                .bind(this);
    }

    submitForm() {
        axios.post('/api/support', this.state, {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        }).then(() => {
            alert("We have received your ticket. We have got your back.");
            this.props.history.push("/home");
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});

    }
    render() {
        return (
            <div>
                <Navbar/>
                <div className="ml-24 md:ml-40">
                    <div
                        className="w-full h-full z-0 flex flex-col justify-center"
                        style={{
                        backgroundImage: `url(${Background})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        <div className="w-4/5 lg:w-2/3 my-16 mx-auto">
                            <div className="flex flex-wrap mx-3 mb-6 pt-10 px-5 md:px-20 bg-white">
                                <div
                                    className="text-3xl sm:text-4xl md:text-5xl px-3 pt-3 text-gray-dark mb-10">
                                    <h1>Support</h1>
                                </div>

                                <div className="w-full p-3">
                                    <FormBlock
                                        onChange={this.handleInputChange}
                                        value={this.state.name}
                                        name="name"
                                        labelText="Name"
                                        placeholderText="John Smith"/>
                                </div>

                                <div className="w-full p-3">
                                    <FormBlock
                                        onChange={this.handleInputChange}
                                        value={this.state.email}
                                        name="email"
                                        labelText="Email"
                                        placeholderText="johnsmith@gmail.com"/>
                                </div>

                                <div className="w-full p-3">
                                    <p className=" py-10 text-xl text-gray-dark"> What can we help you with?
                                    </p>
                                    <form action="/api/support" name="text" method="post">
                                        <textarea onChange={this.handleInputChange}
                                            className="text w-full border"
                                            cols="100"
                                            rows="10"
                                            name="text"></textarea>
                                    </form>
                                </div>

                                <div className="w-full px-3">
                                    <Button buttonLink="/home" text="Send Ticket" onClick={this.submitForm}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Support);