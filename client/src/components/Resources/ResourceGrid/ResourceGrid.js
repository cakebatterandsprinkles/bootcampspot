import React from 'react';
import ResourceCard from '../ResourceCard/ResourceCard';
import './ResourceGrid.css';

class ResourceGrid extends React.Component {
    render() {
        return ( <div className="img-container">
            <ResourceCard name="HTML5"/>
            <ResourceCard name="CSS3"/>
            <ResourceCard name="JavaScript"/>
            <ResourceCard name="Node.js"/>
            <ResourceCard name="MySql"/>
            <ResourceCard name="MongoDB"/>
            <ResourceCard name="Express"/>
            <ResourceCard name="Heroku"/>
      </div>
    );
    }

}

export default ResourceGrid;