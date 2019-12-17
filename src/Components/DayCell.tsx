import React from 'react';

import "../style/DayCell.css";

type DayCellProps = {
    day?: number;
    color?: string;
    className?: string;
}

const DayCell = ({day, color, className}: DayCellProps) => {
    return (
        <div className="calendar-day-cell">
            <div>
                <span className={`${color ? color : ''} ${className ? className : ''}`}>{day}</span>
            </div>
        </div>
    )
};

export default DayCell;