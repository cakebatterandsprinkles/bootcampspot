import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';

export class Posts extends Component {
    render() {
        return (
            <div className="px-10 py-5 m-5 text-gray-dark post">
                <h1 className="text-2xl md:text-3xl">Hello World</h1>
                <p>Hello clouds and beautiful blue sky</p>
                <div className="flex flex-col">
                    <p>Like: 0 Dislike: 0</p>
                    <div className="flex flex-row mt-5">
                        <Link to="/like"><i className="far fa-fw fa-thumbs-up mx-2 text-2xl post-icons"></i></Link>
                        <Link to="/like"><i className="far fa-fw fa-thumbs-down mx-2 text-2xl post-icons"></i></Link>
                        <Link to="/like"><i className="far fa-fw fa-comment mx-2 text-2xl post-icons"></i></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Posts;