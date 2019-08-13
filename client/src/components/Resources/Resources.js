import React, { Component } from 'react';
import Navbar from '../MainPage/Navbar/Navbar';
import Background from '../MainPage/images/bricks.jpg';
import ResourceGrid from './ResourceGrid/ResourceGrid';
import {withRouter} from "react-router-dom";

class Resources extends Component {
    render() {
        return (
            <div>
                <Navbar/>
            <div className="ml-24 md:ml-40">
                <div className="pb-40 pt-32 h-full" style={{  
                    backgroundImage: `url(${Background})`,
                    opacity: 0.9,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <div className="m-auto">
                        <p className="text-4xl md:text-5xl text-white text-center justify-center p-5 header"> Recommended Resources </p>
                    </div>
                </div>
                <ResourceGrid />
            </div>
    </div>
        )
    }
}

export default withRouter(Resources);