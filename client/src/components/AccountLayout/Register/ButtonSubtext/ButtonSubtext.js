import React from "react";
import { Link } from "react-router-dom";

class ButtonSubtext extends React.Component {
    render () {
        return  <div>
        <span className="text-gray-text text-xs mr-5">{this.props.text}</span>
        <Link to={this.props.linkUrl} className="text-sm text-gray-dark">{this.props.textLink}</Link>
      </div>
    }
}

export default ButtonSubtext;