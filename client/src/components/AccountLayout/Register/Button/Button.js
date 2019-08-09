import React from "react";
import { Link } from "react-router-dom";

class Button extends React.Component {
    render () {
        return   <button className="bg-blue-tridark hover:bg-blue-trilight focus:bg-blue-tridark text-white font-bold uppercase py-3 px-4 mt-16 mb-12 text-xs w-full rounded-full">
            <Link to={this.props.buttonLink}>{this.props.text}</Link>
          </button>
    }
}

export default Button;