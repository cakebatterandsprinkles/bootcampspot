import React, {Component} from 'react';
import Navbar from './Navbar/Navbar';
//require withrouter and encapsulate the exported fuction inside
import {withRouter} from "react-router-dom";
import Announcements from './Announcements/Announcements';
import Welcome from './Welcome/Welcome';
import AddPostForm from './AddPostForm/AddPostForm';
import './Dashboard.css';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        //this should refer to the UserInfoForm component
        this.handleInputChange = this
            .handleInputChange
            .bind(this);
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
                    <Welcome/>
                    <Announcements/>
                    <AddPostForm/>
                </div>
            </div>
        )
    }
}

export default withRouter(Dashboard);
