import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Navbar from '../MainPage/Navbar/Navbar';
import Background from '../MainPage/images/trees.jpg';
import Button from '../AccountLayout/Register/Button/Button'
import FormBlock from '../AccountLayout/Register/FormBlock/FormBlock'
import axios from "axios";

class CourseworkDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseworkId: this.props.match.params.id,
            coursework: {
                title: '',
                description: '',
                deadline : new Date()
            },
            submissionLinks : ['']
        };

        this.handleInputChange = this
            .handleInputChange
            .bind(this);

        this.submitForm = this
            .submitForm
            .bind(this);

        this.addLink = this
            .addLink
            .bind(this);
    }

        submitForm() {
        axios.post('/api/coursework/submission/' + this.state.courseworkId, {links: this.state.submissionLinks}, {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        }).then(() => {
            alert('Links submitted!');
        });
    }

    addLink() {
        const submissionLinks = this.state.submissionLinks;
        submissionLinks.push("");
        this.setState({submissionLinks});
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if(name.indexOf("submissionLinks" !== -1)) {
            const index = parseInt(name.split('[')[1]);
            const submissionLinks = this.state.submissionLinks;
            submissionLinks[index] = value;
            this.setState({submissionLinks: submissionLinks});
        } else {
        this.setState({[name]: value});
        }
    }


    fetchCoursework() {
        axios
            .get('/api/coursework/' + this.state.courseworkId, {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        })
            .then((response) => {
                const coursework = response.data;
                coursework.deadline = new Date(coursework.deadline);
                this.setState({ coursework });
            })
            .catch((error) => {
                alert(error);
            });
    }

    fetchSubmission() {
        axios
            .get('/api/coursework/submission/' + this.state.courseworkId, {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        })
            .then((response) => {
                const submissionLinks = response.data;
                this.setState({submissionLinks: submissionLinks.map(submissionLink => submissionLink.link)});
            })
            .catch((error) => {
                alert(error);
            });
    }

    componentDidMount() {
        this.fetchCoursework()
        this.fetchSubmission()
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
                                <h1 className="mb-4">{this.state.coursework.title}</h1>
                                <p className="text-lg mb-4">Must be submitted by {this.state.coursework.deadline.toDateString()}</p>
                                <a href={this.state.coursework.description} className="text-base">{this.state.coursework.description}</a>
                            </div>
                            <div className="m-10 md:m-20 bg-white content-wrapper">


{this.state.submissionLinks.map((link, index) => <div key={index} className="px-10 py-5">
                                    <FormBlock
                                        onChange={this.handleInputChange}
                                        value={link}
                                        name={`submissionLinks[${index}]`}
                                        labelText={`Link ${index+1}`}
                                        placeholderText="www.github.com"/>
                                </div>)}
                                
                                <div className="w-1/5 px-10">
                                  <button onClick={this.addLink} className="bg-blue-tridark hover:bg-red-trilight focus:bg-blue-tridark text-white font-bold uppercase py-3 px-4 text-xs w-full rounded-full">+ Add Link</button>
                                       </div>
                                        <div className="px-10">
                                            <Button text="Submit Coursework" buttonLink="/home" onClick={this.submitForm}/>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CourseworkDetails);
