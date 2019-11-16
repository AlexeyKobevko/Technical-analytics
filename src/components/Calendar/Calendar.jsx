import style from './Calendar.module.css';

import React from 'react';
import moment from 'moment';

export class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.width = props.width || "100%";
        this.style = props.style || {};
        this.style.width = this.width;
    }

    moment = moment.locale('ru');
    state = {
        dateContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false,
        selectedDay: null
    };

    weekdaysShort = moment.weekdaysShort(true);
    months = moment.months();

    year = () => {
        return this.state.dateContext.format("Y");
    };
    month = () => {
        return this.state.dateContext.format("MMMM");
    };
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    };
    currentDate = () => {
        return this.state.dateContext.get("date");
    };
    currentDay = () => {
        return this.state.dateContext.format("D");
    };

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        return parseInt(moment(dateContext).startOf('month').format('d')) + 6;
    };

    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    };

    nextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onNextMonth && this.props.onNextMonth();
    };

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onPrevMonth && this.props.onPrevMonth();
    };

    onSelectChange = (e, data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();

    };

    MonthNav = () => {
        return (
            <span className={style.labelMonth}>
                {this.month()}
                {this.state.showMonthPopup &&
                <this.SelectList data={this.months} />
                }
            </span>
        );
    };

    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    };

    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({
            dateContext: dateContext
        })
    };
    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    };

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            })
        }
    };

    YearNav = () => {
        return (
            this.state.showYearNav ?
                <input
                    defaultValue = {this.year()}
                    className="editor-year"
                    ref={(yearInput) => { this.yearInput = yearInput}}
                    onKeyUp= {(e) => this.onKeyUpYear(e)}
                    onChange = {(e) => this.onYearChange(e)}
                    type="number"
                    placeholder="year"/>
                :
                <span
                    className="label-year"
                    onDoubleClick={(e)=> { this.showYearEditor()}}>
                {this.year()}
            </span>
        );
    };

    onDayClick = (e, day) => {
        this.setState({
            selectedDay: day
        }, () => {
            console.log("SELECTED DAY: ", this.state.selectedDay);
        });

        this.props.onDayClick && this.props.onDayClick(e, day);
    };

    render() {
        // Map the weekdays i.e Sun, Mon, Tue etc as <td>
        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className={style.weekDay}>{day}</td>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">
                    {""}
                </td>
            );
        }

        const daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            const className = (d == this.currentDay() ? `${style.day} ${style.currentDay}`: style.day);
            const selectedClass = (d == this.state.selectedDay ? ` ${style.selectedDay} ` : "");
            daysInMonth.push(
                <td key={d} className={className + selectedClass} >
                    <span style={{cursor: "pointer"}} onClick={(e)=>{this.onDayClick(e, d)}}>{d}</span>
                </td>
            );
        }

        const totalSlots = [...blanks, ...daysInMonth];
        const rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        const trElems = rows.map((d, i) => {
            return (
                <tr key={i*100}>
                    {d}
                </tr>
            );
        });

        return (
            <div className={style.calendarContainer} style={this.style}>
                <div className={style.calendarHeader}>
                    <div style={{cursor: "pointer"}}>
                        <i className="prev fa-lg fas fa-caret-left"
                           style={{width: "12px", height: "18px"}}
                           onClick={(e)=> {this.prevMonth()}}>
                        </i>
                    </div>
                    <div>
                        <this.MonthNav />
                        {" "}
                        <this.YearNav />
                    </div>
                    <div style={{cursor: "pointer"}}>
                        <i className="prev fas fa-lg fa-caret-right"
                           onClick={(e)=> {this.nextMonth()}}>
                        </i>
                    </div>
                </div>
                <table className={style.calendar}>
                    <tbody>
                    <tr>
                        {weekdays}
                    </tr>
                    {trElems}
                    </tbody>
                </table>

            </div>

        );
    }
}