import React, { Component } from 'react';
import Navbar from '../MainPage/Navbar/Navbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../../src/main.scss';
import axios from "axios";
import Background from '../MainPage/images/pic-8.jpg';

export class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: []
        }
    }

    fetchSessionData = () => {
        axios
            .get('api/sessions', {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        })
            .then((response) => {
                this.setState({
                    sessions: response
                        .data
                        .map(session => {
                            return {
                                title: session.title,
                                description: session.description,
                                date: session.date,
                                url: '/session/' + session._id,
                                allDay: true,
                                color: session.type === "technical"
                                    ? "purple"
                                    : "pink"
                            };
                        })
                });
            })
            .catch((error) => {
                alert(error);
            });
    }

    componentDidMount() {
        this.fetchSessionData();
    }
    render() {
        return (
            <div>
                <Navbar/>
            <div className="ml-24 md:ml-40">
            <div className="p-20 h-full" style={{  
                backgroundImage: `url(${Background})`,
                opacity: 0.9,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}>
                  <div className="m-auto header">
                    <p className="text-5xl md:text-6xl text-white text-center justify-center p-5"> Schedule </p>
                  </div>
            </div>
                <div className="p-32 md:p-20">
                    <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} events={this.state.sessions} />
                </div>
            </div>
    </div>
        )
    }
}   

export default Schedule;