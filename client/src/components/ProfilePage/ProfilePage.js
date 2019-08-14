import React, {Component} from 'react';
import Navbar from '../MainPage/Navbar/Navbar';
import Background from '../MainPage/images/trees.jpg';
import axios from "axios";
import FormBlock from '../AccountLayout/Register/FormBlock/FormBlock';
import Button from '../AccountLayout/Register/Button/Button';

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            website: '',
            hobbies: '',
            skills: '',
            bio: '',
            githubusername: '',
            youtube: '',
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: ''
        };

        this.handleInputChange = this
            .handleInputChange
            .bind(this);

            this.submitForm = this
                .submitForm
                .bind(this);
    }

    submitForm() {
        axios.post('/api/profile', this.state, {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        }).then(() => {
            alert("Profile updated.");
        });
    }

    fetchProfile() {
        axios
            .get('/api/profile/me', {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        })
            .then((response) => {
                const profile = response.data;
                profile.hobbies = profile.hobbies.join(', ');
                profile.skills = profile.skills.join(', ');
                this.setState(profile);
            })
            .catch((error) => {
                alert(error);
            });
    }

    componentDidMount() {
        this.fetchProfile()
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
                        className="w-full h-screen z-0 flex flex-col justify-center"
                        style={{
                        backgroundImage: `url(${Background})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        <div className="w-4/5 lg:w-2/3 mx-auto">
                            <div className="flex flex-wrap mx-3 mb-6 pt-10 px-20 bg-white">
                                <div
                                    className="text-3xl sm:text-4xl md:text-5xl px-3 pt-3 text-gray-dark mb-10 w-full">
                                    <h1>Edit Your Profile</h1>
                                </div>

                                <div className="w-1/2 p-3">
                                    <FormBlock
                                        onChange={this.handleInputChange}
                                        value={this.state.website}
                                        name="website"
                                        labelText="Website"
                                        placeholderText="www.google.com"/>
                                </div>

                                <div className="w-1/2 p-3">
                                    <FormBlock
                                        onChange={this.handleInputChange}
                                        value={this.state.bio}
                                        name="bio"
                                        labelText="Bio"
                                        placeholderText=""/>
                                </div>

                                <div className="w-1/2 p-3">
                                    <FormBlock
                                        onChange={this.handleInputChange}
                                        value={this.state.githubusername}
                                        name="githubusername"
                                        labelText="Github User Name"
                                        placeholderText=""/>
                                </div>

                                <div className="w-1/2 p-3">
                                    <FormBlock
                                        onChange={this.handleInputChange}
                                        value={this.state.hobbies}
                                        name="hobbies"
                                        labelText="Hobbies"
                                        placeholderText=""/>
                                </div>

                                <div className="w-1/2 p-3">
                                    <FormBlock
                                        onChange={this.handleInputChange}
                                        value={this.state.skills}
                                        name="skills"
                                        labelText="Skills"
                                        placeholderText=""/>    
                                </div>

                                <div className="w-1/2 p-3">
                                    <FormBlock
                                        onChange={this.handleInputChange}
                                        value={this.state.youtube}
                                        name="youtube"
                                        labelText="Youtube"
                                        placeholderText=""/>
                                </div>

                                <div className="w-1/2 p-3">
                                    <FormBlock
                                        onChange={this.handleInputChange}
                                        value={this.state.instagram}
                                        name="instagram"
                                        labelText="Instagram"
                                        placeholderText=""/>
                                </div>

                                <div className="w-1/2 p-3">
                                    <FormBlock
                                        onChange={this.handleInputChange}
                                        value={this.state.linkedin}
                                        name="linkedin"
                                        labelText="LinkedIn"
                                        placeholderText=""/>
                                </div>

                                <div className="w-1/2 p-3">
                                    <FormBlock
                                        onChange={this.handleInputChange}
                                        value={this.state.facebook}
                                        name="facebook"
                                        labelText="Facebook"
                                        placeholderText=""/>
                                </div>

                                <div className="w-full px-3">
                                    <Button buttonLink="/" text="Submit Changes" onClick={this.submitForm}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfilePage;
