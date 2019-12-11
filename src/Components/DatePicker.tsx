import React, {useState, useEffect, ElementType} from 'react';
import DayCell from "./DayCell";

import "../style/DatePicker.css";

const DatePicker = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [day, setDay] = useState(new Date().getDate());
    const [days, setDays] = useState<React.ReactElement<typeof DayCell>[]>([]);
    const [totalWeeks, setTotalWeeks] = useState<number[]>([]);
    const weekNames = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

    useEffect(() => {
        makeCalendar();
    }, []);

    const makeCalendar = () => {
        let cells:React.ReactElement<typeof DayCell>[] = [];
        let firstDay = new Date(year, month-2, 1);
        const lastDate = new Date(year, month -1, 0).getDate();
        const startWeek = firstDay.getDay() + 1;
        const totalCells = startWeek + lastDate <= 35 ? 35 : 42;
        setTotalWeeks(Array.apply(null, new Array(totalCells / 7)).map((item, index) => index + 1));

        let firstDate = firstDay.getDate();

        for (let i = 0; i < totalCells; i++) {
            if (i >= startWeek && firstDate < lastDate + 1) {
                cells.push(<DayCell day={firstDate++}/>)
            } else {
                cells.push(<DayCell/>);
            }
        }
        setDays(cells);
    };

    return (
        <div>
            <header>
                <span>PREV</span>
                <span>{year}/{month - 1}</span>
                <span>NEXT</span>
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
                            {days.map((day, i) => {
                                if (i <= index * 7 && i > (index - 1) * 7) return day
                            })}
                        </div>)
                }
                </div>
            </div>
        </div>
    )
};

export default DatePicker;