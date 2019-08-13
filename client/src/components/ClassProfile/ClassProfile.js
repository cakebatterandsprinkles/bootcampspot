import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Navbar from '../MainPage/Navbar/Navbar';
import Card from './Card/Card';
//require axios for http request
import axios from "axios";
import Background from "../MainPage/images/cold.jpg";

class ClassProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    fetchUserData = () => {
        axios
            .get('api/profile', {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({
                    users: response
                        .data
                        .map(profile => profile.user)
                });
            })
            .catch((error) => {
                alert(error);
            });
    }

    componentDidMount() {
        this.fetchUserData()
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="ml-24 md:ml-40">
                <div className="p-20 h-full" style={{  
                backgroundImage: `url(${Background})`,
                opacity: 1,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}>
                  <div className="m-auto header">
                    <p className="text-5xl md:text-6xl text-white text-center justify-center p-5"> Class Profiles</p>
                    <p className="text-lg md:text-xl text-white text-center justify-center"> University of Central Florida </p>
                    <p className="text-lg md:text-xl text-white text-center justify-center"> Full Stack Web Development </p>
                    <p className="text-lg md:text-xl text-white text-center justify-center"> Full Time </p>
                  </div>
            </div>
                        <div className='flex flex-row flex-wrap m-10 md:m-20 bg-white content-wrapper'>
                            {this
                                .state
                                .users
                                .map(user => <Card id={user._id} name={user.name} email={user.email} avatar_url={user.avatar}/>)
}
                        </div>
                    </div>
                </div>
        )
    }
}

export default withRouter(ClassProfile);