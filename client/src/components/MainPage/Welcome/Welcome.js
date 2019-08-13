import React, { Component } from 'react';
import Background from '../images/pic-5.jpg';
import axios from 'axios'

export class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    fetchUserData = () => {
        axios
            .get('api/profile/me', {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        })
            .then((response) => {

                this.setState({userName: response.data.user.name});

            })
            .catch((error) => {
                alert(error);
            });
    }

    componentDidMount() {
        this.fetchUserData()
    }

    render() {
        const quotesArray= ["Any code of your own that you haven't looked at for six or more months might as well have been written by someone else. - Eagleson's law",
        "It's not a bug - it's an undocumented feature. - Author Unknown", "Weeks of coding can save you hours of planning. - Unknown",
        "Programming: when the ideas turn into the real things. - Maciej Kaczmarek", "A computer is like a mischievous genie. It will give you exactly what you ask for, but not always what you want. - Joe Sondow",
        "Functions should do one thing. They should do it well. They should do it only. - Robert C. Martin", "Codes are a puzzle. A game, just like any other game. - Alan Turing",
        "It works on my machine. - Anonymous"]
        const randomNumber = () => Math.floor(Math.random() * quotesArray.length)
        return (
            <div className="p-20 h-full" style={{  
                backgroundImage: `url(${Background})`,
                opacity: 0.9,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}>
                  <div className="m-auto header">
                    <p className="text-4xl md:text-6xl text-white text-center justify-center p-5"> Welcome { this.state.userName }</p>
                    <p className="text:base md:text-xl text-white text-center justify-center px-10 py-5"> { quotesArray[randomNumber()] } </p>
                  </div>
            </div>
        )
    }
}

export default Welcome;

