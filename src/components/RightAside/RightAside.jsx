import style from './RightAside.module.css';


import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from "components/Calendar/Calendar";


export class RightAside extends Component {
    calendarComponentRef = React.createRef();


    render() {
        return (
            <aside className={style.aside} >
                <Calendar/>
            </aside>
        );
    }
}