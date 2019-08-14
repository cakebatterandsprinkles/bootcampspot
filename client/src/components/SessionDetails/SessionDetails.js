import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Navbar from '../MainPage/Navbar/Navbar';
import Background from '../MainPage/images/trees.jpg';
import axios from "axios";

class SessionDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: this.props.match.params.id,
            session: {
                title: '',
                description: ''
            }
        };
    }

    fetchProfile() {
        axios
            .get('/api/sessions/' + this.state.sessionId, {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        })
            .then((response) => {
                this.setState({session: response.data});
            })
            .catch((error) => {
                alert(error);
            });
    }

    componentDidMount() {
        this.fetchProfile()
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="ml-24 md:ml-40">
                    <div
                        className="w-full h-screen z-0"
                        style={{
                        backgroundImage: `url(${Background})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        <div className="m-auto p-20 background-div container">
                            <div
                                className="w-full h-full flex flex-col items-center align-center text-3xl sm:text-4xl md:text-5xl text-white pl-5 pt-3 md:pl-10 md:pt-5 header">
                                <h1 className="mb-10">{this.state.session.title}</h1>
                                <p className="text-base">{this.state.session.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SessionDetails);
