import React from 'react';
import {Redirect} from 'react-router-dom';

class SignOut extends React.Component {

    componentDidMount() {
        localStorage.removeItem('currentUserToken');
    }

    render() {
        return <Redirect to={{
            pathname: '/signin'
        }}/>
    }
}

export default SignOut;