import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Navbar from '../MainPage/Navbar/Navbar';
import Background from '../MainPage/images/trees.jpg';
import axios from "axios";

class ProfileDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileId: this.props.match.params.id,

            profile: {
                hobbies: [],
                skills: [],
                website: '',
                bio: '',
                githubusername: '',
                social: {
                    youtube: '',
                    twitter: '',
                    facebook: '',
                    linkedin: '',
                    instagram: ''
                },
                user: {
                    name: '',
                    avatar: '',
                    email: ''
                }
            }
        };
    }

    fetchProfile() {
        axios
            .get('/api/profile/user/' + this.state.profileId, {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        })
            .then((response) => {
                this.setState({profile: response.data});
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
                        className="w-full h-full z-0"
                        style={{
                        backgroundImage: `url(${Background})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        <div className="m-auto background-div">
                            <div
                                className="w-full h-full flex flex-col items-center align-center text-3xl sm:text-4xl md:text-5xl text-white pl-5 pt-3 md:pl-10 md:pt-5 header">
                                <img
                                    src={this.state.profile.user.avatar}
                                    alt='profile pic'
                                    className='rounded-full h-auto p-2 md:p-4 my-4 md:my-8 shadow-2xl border border-solid border-2'/>
                                <h1>{this.state.profile.user.name}</h1>
                                <p className="text-base">{this.state.profile.user.email}</p>
                                <p className="text-base"> My personal website: {this.state.profile.website}</p>
                                <p className="text-base">My GitHub username is: {this.state.profile.githubusername}</p>
                                <p className="text-xl mx-8 md:mx-16 lg:mx-32 xl:mx-64 my-5 p-10 border">{this.state.profile.bio}</p>

                                <div className="flex flex-col items-center p-3">
                                    <p className="text-3xl">Hobbies</p>
                                    <hr className="w-20"/>
                                    {this
                                        .state
                                        .profile
                                        .hobbies
                                        .map((hobby, index) => <p key={index} className="text-lg">{hobby}</p>)}
                                </div>
                                <div className="flex flex-col items-center p-3">
                                    <p className="text-3xl">Skills</p>
                                    <hr className="w-20"/>
                                    {this
                                        .state
                                        .profile
                                        .skills
                                        .map((skill, index) => <p key={index} className="text-lg">{skill}</p>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProfileDetails);
