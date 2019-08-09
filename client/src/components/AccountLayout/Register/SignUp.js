import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import UserInfoForm from "./UserInfoForm/UserInfoForm";
import AccountLeftPanel from "../AccountLeftPanel/AccountLeftPanel";
import TrilogyLogo from "../Register/images/trilogy-logo2.png";
import UcfLogo from "../Register/images/ucf-logo.png";

class SignUp extends React.Component {
    render () {
        return <div className="flex flex-col xl:flex-row relative">
        <div className="w-full xl:w-3/5 h-screen">
            <AccountLeftPanel />
        </div>
        
        <div className="w-full xl:w-2/5 h-screen">
            <div className="w-full p-5 flex flex-row">
                <div className="font-bold text-gray-dark ml-3 mt-3 text-2xl">BootcampSpot</div>
                <div className="trilogy-logo ml-auto"><a href="https://www.trilogyed.com"  target="_blank" rel="noopener noreferrer"><img src={TrilogyLogo} alt="trilogy logo"/></a></div>
                <div className="ucf-logo ml-3"><a href="https://www.ucf.edu" target="_blank" rel="noopener noreferrer"><img src={UcfLogo} alt="ucf logo"/></a></div>
            </div>
          <div className="px-20">
            <p className="text-2xl mb-10 mt-5 text-gray-dark">Sign Up</p>
            <div>
              <UserInfoForm />
              <div className="text-gray-dark absolute h-16 bottom-0">
                <a href="https://codingbootcamp.secure.force.com/onesupport" className="links" target="_blank" rel="noopener noreferrer"> Can't Login? Contact Support </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
}

export default SignUp;