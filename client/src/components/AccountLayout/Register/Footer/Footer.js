import React from "react";
import "./Footer.css";

class Footer extends React.Component {
    render() {
        return <div className="text-white text-md py-4 mx-10 flex justify-center items-center d-inline-block absolute h-24 invisible lg:visible lg:bottom-0">
                <span> Learn more about MERN Stack: </span>
                <a className="m-6 stack links" href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer"> <i className="fas fa-database"></i></a>
                <a className="m-3 stack links" href="https://expressjs.com/" target="_blank" rel="noopener noreferrer"> <i className="fas fa-server"></i></a>
                <a className="m-3 stack links" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer"> <i className="fab fa-react"></i> </a>
                <a className="m-3 mr-24 stack links" href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer"> <i className="fab fa-node-js"></i></a>
            </div>
    }
}

export default Footer;