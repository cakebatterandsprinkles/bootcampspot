import React from "react";
//require axios for http request
import axios from "axios";
//require withrouter and encapsulate the exported fuction inside
import {withRouter} from "react-router-dom";
import "./UserInfoForm.css";
import Button from "../Button/Button";
import ButtonSubtext from "../ButtonSubtext/ButtonSubtext";
import FormBlock from "../FormBlock/FormBlock";
import FormBlockTwo from "../FormBlockTwo/FormBlockTwo"

class UserInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
//this should refer to the UserInfoForm component
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name] : value
    });

  }

  submitForm () {       
    if(!this.state.name) {
      return alert("You need to enter your name");
    }
    if(!this.state.email) {
      return alert("You need to enter your email");
    }
    if(!this.state.password) {
      return alert("You need to choose a password");
    }
    if(this.state.password !== this.state.password2) {
      return alert("The passwords did not match");
    }
    axios.post('/api/users', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
      this.props.history.push("/signin");
    }).catch((error) => {
      alert(error);
    });
  }

    render () {
        return <div className="flex flex-wrap mx-3 mb-6 bg-white">
        <div className="w-full px-3 mb-3">
          <FormBlock onChange={this.handleInputChange} value={this.state.name} name="name" labelText="Full Name" placeholderText="John Smith"/>
        </div>

        <div className="w-full px-3">
          <FormBlock onChange={this.handleInputChange} value={this.state.email} name="email" labelText="E-mail" placeholderText="johnsmith@gmail.com"/>
        </div>

        <div className="w-1/2 px-3 my-5">
            <FormBlockTwo onChange={this.handleInputChange} value={this.state.password} name="password" labelText="Password" placeholderText="" type="password"/>
        </div>
        <div className="w-1/2 px-3 my-5">
            <FormBlockTwo onChange={this.handleInputChange} value={this.state.password2} name="password2" labelText="Re-enter Password" placeholderText="" type="password"/>
        </div>
        
        <div className="w-full px-3">
          <Button text="Sign Up" buttonLink="/signup" onClick={this.submitForm}/>
          <ButtonSubtext text="You already have an account?" textLink="Sign In" linkUrl="/signin" />
        </div>
      </div>
    }
}

export default withRouter(UserInfoForm);