import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import './Posts.css';

export class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    likePost(postId) {
        axios
            .put('api/posts/like/' + postId, {} , {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        })
            .then(() => {
                this.fetchPosts();
            });
    }

    unlikePost(postId) {
        axios
            .put('api/posts/unlike/' + postId, {} , {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        })
            .then(() => {
                this.fetchPosts();
            });
    }

    fetchPosts() {
        axios
            .get('api/posts', {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        })
            .then((response) => {

                this.setState({posts: response.data});

            })
            .catch((error) => {
                alert(error);
            });
    }

    componentDidMount() {
        this.fetchPosts()
    }

    render() {
        return <div>{this
                .state
                .posts
                .map(post => <div className="px-10 py-5 m-5 text-gray-dark post">
                    <h1 className="text-2xl md:text-3xl">{post.name}</h1>
                    <p>{post.text}</p>
                    <div className="flex flex-col">
                        <p>{post.likes.length} likes</p>
                        <div className="flex flex-row mt-5">
                            <button onClick={() => this.likePost(post._id)}>
                                <i className="far fa-fw fa-thumbs-up mx-2 text-2xl post-icons"></i>
                            </button>
                            <button onClick={() => this.unlikePost(post._id)}>
                                <i className="far fa-fw fa-thumbs-down mx-2 text-2xl post-icons"></i>
                            </button>
                            <Link to="/like">
                                <i className="far fa-fw fa-comment mx-2 text-2xl post-icons"></i>
                            </Link>
                        </div>
                    </div>
                </div>)
}
        </div>
    }
}

export default Posts;