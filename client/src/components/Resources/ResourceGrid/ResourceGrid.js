import React from 'react';
import ResourceCard from '../ResourceCard/ResourceCard';
import './ResourceGrid.css';
import HtmlLogo from '../images/htmllogo-01.png';
import CssLogo from '../images/csslogo-01.png';
import JsLogo from '../images/jslogo-01.png';
import NodejsLogo from '../images/nodejs.png';
import MysqlLogo from '../images/mysql.svg';
import ExpressLogo from '../images/express-01.png';
import MongodbLogo from '../images/mongodb.png';
import HerokuLogo from '../images/Heroku.png';

class ResourceGrid extends React.Component {
    render() {
        return ( <div className="img-container">
            <ResourceCard img_src={HtmlLogo} url="https://guide.freecodecamp.org/html"/>
            <ResourceCard img_src={CssLogo} url="https://guide.freecodecamp.org/css"/>
            <ResourceCard img_src={JsLogo} url="https://guide.freecodecamp.org/javascript"/>
            <ResourceCard img_src={NodejsLogo} url="https://github.com/vioan/nodejs-learning-resources"/>
            <ResourceCard img_src={ExpressLogo} url="https://www.codecademy.com/learn/learn-express"/>
            <ResourceCard img_src={MysqlLogo} url="https://www.codeconquest.com/blog/top-50-websites-to-learn-mysql/"/>
            <ResourceCard img_src={MongodbLogo} url="https://medium.com/quick-code/top-tutorials-to-learn-mongo-db-f1e52bee7445"/>
            <ResourceCard img_src={HerokuLogo} url="https://devcenter.heroku.com/"/>
      </div>
    );
    }

}

export default ResourceGrid;