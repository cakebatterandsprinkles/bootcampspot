import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Card extends Component {

    render() {
        return (
            <div className='flex flex-col items-center bg-white content-wrapper lg:w-1/2 xl:w-1/3 w-full py-5'>
                <img
                    src={this.props.avatar_url}
                    alt='profile pic'
                    className='rounded-full h-auto p-2 md:p-4'/>
                    <div>
                <div className='p-2 md:p-4 text-gray-dark'>
                <h3 className='text-3xl sm:text-4xl'>{this.props.name}</h3>
                <p className='text-lg pb-5'>{this.props.email}</p>
                    <Link to={`/profile/${this.props.id}`}>
                        <p className='text-lg hover:text-blue-tridark'><i class="fas fa-street-view"></i> View Profile</p>
                    </Link>
                </div></div>
            </div>
        )
    }
}

export default Card;
