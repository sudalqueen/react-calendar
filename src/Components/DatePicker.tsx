import React, {ReactElement, useEffect} from 'react';

import DayCell from "./DayCell";

import "../style/DatePicker.css";
import Schedule from "../model/Schedule";
import {BaseSchedule} from "../model/BaseSchedule";

type DatePickerProps<T extends BaseSchedule> = {
    year: number,
    month: number,
    day: number,
    currentYear: number,
    currentMonth: number,
    weekNames: string[],
    totalWeeks: number[],
    dayMatrix: number[][],
    scheduleMatrix: Array<Array<Array<Schedule<T>>>>,
    prevMonth(): void,
    nextMonth(): void,
    handleChangeDateChange(id: any, pickDay: number): void
};

function DatePicker<T extends BaseSchedule>(props: DatePickerProps<T>) {
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
                                                return <DayCell day={day} className="current"
                                                                handleChangeDateChange={props.handleChangeDateChange}/>
                                            } else {
                                                return <DayCell day={day}
                                                                handleChangeDateChange={props.handleChangeDateChange}/>
                                            }
                                        } else {
                                            return <DayCell day={day}
                                                            handleChangeDateChange={props.handleChangeDateChange}/>
                                        }
                                    })}
                                    <div className="calendar-schedule-grid">
                                        <div className="calendar-schedule-space"/>
                                        {
                                            props.scheduleMatrix[index].map(viewSchedules => {
                                                return viewSchedules.map((viewSchedule, index) =>
                                                    <div className="calendar-schedule-block">{viewSchedule.getViewScheduleElement}</div>)
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
