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
        axios.put('api/posts/like/' + postId, {}, {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        }).then(() => {
            this.fetchPosts();
        });
    }

    unlikePost(postId) {
        axios.put('api/posts/unlike/' + postId, {}, {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        }).then(() => {
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
                .map(post => <div className="px-10 py-10 text-gray-dark post flex flex-col lg:flex-row justify-around ">
                    <div className="flex flex-col items-center justify-center inline-block">
                        <img src={post.avatar} alt="profile pic" className="rounded-full"/>
                        <h1 className="text-xl md:text-2xl">{post.name}</h1>
                    </div>

                    <div className="flex flex-col p-10 inline-block md:2/3 lg:w-3/5">
                        <p>{post.text}</p>
                        <p className="text-xl"><span>{post.likes.length}</span> likes</p>
                        <div className="flex flex-row mt-5">
                            <button onClick={() => this.likePost(post._id)}>
                                <i className="far fa-fw fa-thumbs-up mx-2 text-2xl hover:text-blue-tridark"></i>
                            </button>
                            <button onClick={() => this.unlikePost(post._id)}>
                                <i className="far fa-fw fa-thumbs-down mx-2 text-2xl hover:text-blue-tridark"></i>
                            </button>
                            <Link to="/like">
                                <i className="far fa-fw fa-comment mx-2 text-2xl hover:text-pink-monakai"></i>
                            </Link>
                        </div>
                    </div>
                </div>)
}
        </div>
    }
}

export default Posts;