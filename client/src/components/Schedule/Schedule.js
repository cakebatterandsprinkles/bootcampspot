import React, { Component } from 'react';
import Navbar from '../MainPage/Navbar/Navbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import 'moment/min/moment.min.js';
import '../../../src/main.scss';
import Background from '../MainPage/images/pic-8.jpg';

export class Schedule extends Component {
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
                    <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
                </div>
            </div>
    </div>
        )
    }
}   

export default Schedule;