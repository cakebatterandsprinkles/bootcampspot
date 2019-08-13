import React from 'react';
import "./ResourceCard.css";

class ResourceCard extends React.Component {
    render() {
        return <div className="shadow-xl img-wrapper">
                <div className="w-full h-full object-cover">
                    <a href={this.props.url} target="_blank" rel="noopener noreferrer"><img src={this.props.img_src} alt="logo"/></a>
                </div>
            </div>
    }
}

export default ResourceCard;