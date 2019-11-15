import style from './RightAside.module.css';


import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';




export class RightAside extends Component {
    calendarComponentRef = React.createRef();


    render() {
        return (
            <aside className={style.aside} >
                <FullCalendar
                    locale="ru"
                    defaultView="dayGridMonth"
                    plugins={[ interactionPlugin, dayGridPlugin ]}
                    header={{
                        // left: "prev,next",
                        // center: "title",
                    }}
                    ref={ this.calendarComponentRef }
                />
            </aside>
        );
    }
}