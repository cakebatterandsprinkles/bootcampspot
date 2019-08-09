import React from "react";
import "./UserSignInForm";
import Button from "../Button/Button";
import FormBlock from "../FormBlock/FormBlock";

class UserSignInForm extends React.Component {
    render () {
        return <div className="flex flex-wrap mx-3 mb-6 bg-white">
        <div className="w-full px-3">
          <FormBlock labelText="E-mail" placeholderText="johnsmith@gmail.com"/>
        </div>

        <div className="w-full px-3 mt-3">
          <FormBlock labelText="password" placeholderText="" type="password"/>
        </div>
        
        <div className="w-full px-3">
          <Button text="Sign In" />
        </div>
      </div>
    }
}

export default UserSignInForm;