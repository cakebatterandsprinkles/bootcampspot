import React from 'react';
import "./ResourceCard.css";

class ResourceCard extends React.Component {
    colorArr = ["#ff5252", "#ff4081", "#e040fb", "#7c4dff", "#536dfe", "#448aff", "#40c4ff", "#18ffff", "#64ffda", "#69f0ae", "#b2ff59", "#eeff41", "#ffff00", "#ffd740", "#ffab40", "#ff6e40"];
    randomColor = () => Math.floor(Math.random() * this.colorArr.length);
    render() {
        return <div className="shadow-xl img-wrapper">
                <div className="w-full h-full object-cover" style={{ backgroundColor: this.colorArr[this.randomColor()] }} >
                    <p className="text-center text-2xl text-white header">{this.props.name}</p>
                </div>
            </div>
    }
}

export default ResourceCard;