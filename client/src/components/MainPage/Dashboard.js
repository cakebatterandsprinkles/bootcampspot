import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import './Dashboard.css';

export class Dashboard extends Component {
    render() {
        return (
        <div>
            <div className="flex flex-col lg:w-1/6 xl:w-1/12">
                <Navbar/>
            </div>
            <div>

            </div>
        </div>
        )
    }
}

export default Dashboard;
