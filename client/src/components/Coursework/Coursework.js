import React, {Component} from 'react';
import Navbar from '../MainPage/Navbar/Navbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../../src/main.scss';
import axios from "axios";
import Background from '../MainPage/images/pic-7.jpg';

class Coursework extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coursework: []
        }
    }

    fetchCourseworkData = () => {
        axios
            .get('api/coursework', {
            headers: {
                'x-auth-token': localStorage.currentUserToken
            }
        })
            .then((response) => {
                this.setState({
                    coursework: response
                        .data
                        .map(coursework => {
                            return {
                                title: coursework.title,
                                url: "/coursework/" + coursework._id,
                                date: coursework.deadline,
                                allDay: true,
                                color: coursework.type === "technical"
                                    ? "red"
                                    : "green"
                            };
                        })
                });
            })
            .catch((error) => {
                alert(error);
            });
    }

    componentDidMount() {
        this.fetchCourseworkData();
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="ml-24 md:ml-40">
                    <div
                        className="p-20 h-full header"
                        style={{
                        backgroundImage: `url(${Background})`,
                        opacity: 0.9,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        <div className="m-auto header">
                            <p className="text-5xl md:text-6xl text-white text-center justify-center p-5">
                                Coursework
                            </p>
                        </div>
                    </div>
                    <div className="p-32 md:p-20">
                        <FullCalendar
                            defaultView="dayGridMonth"
                            plugins={[dayGridPlugin]}
                            events={this.state.coursework}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Coursework;