import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import Image from './you-should-be-coding-01.png';

export class Navbar extends Component {
    render() {
        return (
            <div className="flex flex-col block justify-start md:justify-between h-full w-24 md:w-40 fixed top-0 bottom-0 z-1 text-center bg-white">
                <div className="font-bold text-gray-dark mx-2 my-5 text-md invisible md:visible">BootcampSpot</div>
                    
                <div className="flex flex-col mx-auto items-start">
                    <Link to="/home" className="text-gray-dark text-2xl my-2"><i className="fas fa-fw fa-home navbar-icons mx-1"></i><p className="hidden md:inline text-sm font-semibold"> Home</p></Link>
                    <Link to="/profile" className="text-gray-dark text-2xl my-2"><i className="fas fa-fw fa-user navbar-icons mx-1"></i><p className="hidden md:inline text-sm font-semibold"> Profile</p></Link>
                    <Link to="/schedule" className="text-gray-dark text-2xl my-2"><i className="fas fa-fw fa-calendar-alt navbar-icons mx-1"></i><p className="hidden md:inline text-sm font-semibold"> Schedule</p></Link>
                    <Link to="/coursework" className="text-gray-dark text-2xl my-2"><i className="fas fa-fw fa-file-code navbar-icons mx-1"></i><p className="hidden md:inline text-sm font-semibold"> Coursework</p></Link>
                    <Link to="/class" className="text-gray-dark text-2xl my-2"><i className="fas fa-fw fa-users navbar-icons mx-1"></i><p className="hidden md:inline text-sm font-semibold"> Class</p></Link>
                    <Link to="/resources" className="text-gray-dark text-2xl my-2"><i className="fas fa-fw fa-folder-open navbar-icons mx-1"></i><p className="hidden md:inline text-sm font-semibold"> Resources</p></Link>
                    <a href="https://career.ucf.edu/" className="text-gray-dark text-2xl my-2" target="_blank" rel="noopener noreferrer"><i className="fas fa-fw fa-fingerprint navbar-icons mx-1"></i><p className="hidden md:inline text-sm font-semibold"> Career</p></a>    
                </div>
                <div className="invisible md:visible m-5 border-gray-dark border-solid border">
                    <img src={Image} alt="you should be coding text"/>
                </div>
            </div>
        )
    }
}

export default Navbar;
