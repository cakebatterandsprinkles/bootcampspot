import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import Announcements from './Announcements/Announcements';
import './Dashboard.css';

export class Dashboard extends Component {
    render() {
        return (
        <div>
                <Navbar/>
                <div className="ml-24 md:ml-40">
                <Announcements />
                </div>
        </div>
        )
    }
}

export default Dashboard;
