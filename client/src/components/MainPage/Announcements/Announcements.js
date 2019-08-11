import React, { Component } from 'react';
import Posts from '../Posts/Posts';
import './Announcements.css';

export class Announcements extends Component {
    render() {
        return (
            <div className="m-10 md:m-20 bg-white content-wrapper">
                <div className="text-3xl sm:text-4xl md:text-5xl pl-5 pt-3 md:pl-10 md:pt-5 text-gray-dark">
                    <h1> Announcements</h1>
                </div>
                <div className="h-full">
                    <Posts />
                </div>
            </div>
        )
    }
}

export default Announcements;
