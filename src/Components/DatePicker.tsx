import React, {useState, useEffect} from 'react';

import DayCell from "./DayCell";

import "../style/DatePicker.css";

type DatePickerProps = {
  schedules?: any[]
};

const DatePicker = ({schedules}: DatePickerProps) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const weekNames = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [day, setDay] = useState(new Date().getDate());
    const [totalWeeks, setTotalWeeks] = useState<number[]>([]);
    const [dayMatrix, setDayMatrix] = useState<number[][]>([]);

    useEffect(() => {
        makeDayMatrix();
    }, [year, month]);

    const makeDayMatrix = () => {
        let matrix: number[][] = [];

        let firstDay = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0).getDate();
        const startWeek = firstDay.getDay();
        const totalCells = startWeek + lastDate + 1 <= 35 ? 35 : 42;
        const weeks = totalCells / 7;

        setTotalWeeks(Array.apply(null, new Array(totalCells / 7)).map((item, index) => index));

        let day = firstDay.getDate();

        for (let i = 0; i < weeks; i++) {
            matrix[i] = [];
            for (let j = 0; j < 7; j++) {
                matrix[i][j] = 0;
            }
        }

        for (let i = 0; i < weeks; i++) {
            for (let j = 0; j < 7; j++) {
                if (i == 0 && j < startWeek || day > lastDate) {
                    matrix[i][j] = 0;
                } else {
                    matrix[i][j] = day++;
                }
            }
        }

        setDayMatrix(matrix);
    };

    const prevMonth = () => {
        if (month - 1 === -1) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    };

    const nextMonth = () => {
        if (month + 1 === 12) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    };

    return (
        <div>
            <header className="calendar-header">
                <span className="calendar-header-prev-btn" onClick={prevMonth}/>
                <span>{year}/{month + 1}</span>
                <span className="calendar-header-next-btn" onClick={nextMonth}/>
            </header>
            <div>
                <div className="calendar-head-week-names">
                    {
                        weekNames.map(week => <div key={week} className="calendar-head-week-name">{week}</div>)
                    }
                </div>
                <div>
                    {
                        totalWeeks.map(index =>
                            <div className="calendar-weekend-grid">
                                {dayMatrix[index].map(dayItem => {
                                    if (dayItem !== 0) {
                                        if (year === currentYear && month === currentMonth && dayItem === day) {
                                            return <DayCell day={dayItem} className="current"/>
                                        } else {
                                            return <DayCell day={dayItem}/>
                                        }
                                    } else {
                                        return <DayCell/>
                                    }
                                })}
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
};

export default DatePicker;