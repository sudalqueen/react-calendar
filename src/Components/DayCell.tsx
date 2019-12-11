import React from 'react';

import "../style/DayCell.css";

type DayCellProps = {
    day?: number;
    color?: string;
}

const DayCell = ({day, color}: DayCellProps) => {
    return(
        <div className="calendar-day-cell">
            <div>
                <span className={color}>{day}</span>
            </div>
        </div>
    )
};

export default DayCell;