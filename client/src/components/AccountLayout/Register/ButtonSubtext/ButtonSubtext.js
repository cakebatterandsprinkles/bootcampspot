import React from "react";

class ButtonSubtext extends React.Component {
    render () {
        return  <div>
        <span className="text-gray-text text-xs mr-5">{this.props.text}</span>
        <a href={this.props.linkUrl} className="text-sm text-gray-dark">{this.props.textLink}</a>
      </div>
    }
}

export default ButtonSubtext;