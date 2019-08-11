import React, { Component } from 'react';

class Card extends Component {
    render() {
        return (
            <div className='flex flex-col justify-center w-full h-full'>
                <img 
                src= {this.state.avatar_url}
                alt= 'profile pic'
                className= 'rounded-full w-10 h-auto'
                />
                <h3 className='text-3xl sm:text-4xl'>{this.state.name}</h3>
                <div>
                    <Link to="/profile/:id">
                        View Profile
                    </Link>
                </div>
            </div>
        )
    }
}

export default Card;
