import React from "react";
import "./UserInfoForm.css";
import Button from "../Button/Button";
import ButtonSubtext from "../ButtonSubtext/ButtonSubtext";
import FormBlock from "../FormBlock/FormBlock";
import FormBlockTwo from "../FormBlockTwo/FormBlockTwo"

class UserInfoForm extends React.Component {
    render () {
        return <div className="flex flex-wrap mx-3 mb-6 bg-white">
        <div className="w-full px-3 mb-3">
          <FormBlock labelText="Full Name" placeholderText="John Smith"/>
        </div>

        <div className="w-full px-3">
          <FormBlock labelText="E-mail" placeholderText="johnsmith@gmail.com"/>
        </div>

        <div className="w-1/2 px-3 my-5">
            <FormBlockTwo labelText="Password" placeholderText="" type="password"/>
        </div>
        <div className="w-1/2 px-3 my-5">
            <FormBlockTwo labelText="Re-enter Password" placeholderText="" type="password"/>
        </div>
        
        <div className="w-full px-3">
          <Button text="Sign Up" />
          <ButtonSubtext text="You already have an account?" textLink="Sign In" linkUrl="/signin" />
        </div>
      </div>
    }
}

export default UserInfoForm;