import React from 'react';

import DayCell from "./DayCell";

import "../style/DatePicker.css";

type DatePickerProps = {
    year: number,
    month: number,
    day: number,
    currentYear: number,
    currentMonth: number,
    weekNames: string[],
    totalWeeks: number[],
    dayMatrix: number[][],
    scheduleMatrix: any[][],
    prevMonth(): void,
    nextMonth(): void
};

const DatePicker = (props: DatePickerProps) => {
    return (
        <div>
            <header className="calendar-header">
                <span className="calendar-header-prev-btn" onClick={props.prevMonth}/>
                <span>{props.year}/{props.month + 1}</span>
                <span className="calendar-header-next-btn" onClick={props.nextMonth}/>
            </header>
            <div>
                <div className="calendar-head-week-names">
                    {
                        props.weekNames.map(week => <div key={week} className="calendar-head-week-name">{week}</div>)
                    }
                </div>
                <div className="calendar-weekends">
                    {
                        props.totalWeeks.map(index => {
                            return <div className="calendar-weekend-wrapper">
                                <div className="calendar-weekend-grid">
                                    {props.dayMatrix[index].map(day => {
                                        if (day !== 0) {
                                            if (props.year === props.currentYear && props.month === props.currentMonth && day === props.day) {
                                                return <DayCell day={day} className="current"/>
                                            } else {
                                                return <DayCell day={day}/>
                                            }
                                        } else {
                                            return <DayCell/>
                                        }
                                    })}
                                    <div className="calendar-schedule-grid">
                                        <div className="calendar-schedule-space"/>
                                        {
                                            props.scheduleMatrix[index].map(viewSchedule => {
                                                if(viewSchedule !== <></>){
                                                    return <div className="calendar-schedule-block">{viewSchedule}</div>
                                                }
                                                return;
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        })

                    }
                </div>
            </div>
        </div>
    )
};

export default DatePicker;
