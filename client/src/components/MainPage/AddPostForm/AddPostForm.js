import React, {Component} from 'react';
import Button from '../../AccountLayout/Register/Button/Button';
import axios from "axios";

export class AddPostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }

        this.handleInputChange = this
            .handleInputChange
            .bind(this);

        this.submitForm = this
            .submitForm
            .bind(this);
    }

    submitForm() {
        axios.post('api/posts', {text: this.state.text}, {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    render() {
        return <div className="m-10 md:m-20 bg-white content-wrapper">
            <div className="px-10">
                <p className=" py-10 text-xl text-gray-dark">Add a new post:
                </p>
                <form action="/api/post" name="addNewPostForm" method="post">
                    <textarea onChange={this.handleInputChange}
                        className="text w-full border"
                        cols="100"
                        rows="10"
                        name="text"></textarea>
                </form>
            </div>
            <div className="px-10">
                <Button text="Add New Post" buttonLink="/home" onClick={this.submitForm}/>
            </div>
        </div>
    }
}

export default AddPostForm;
