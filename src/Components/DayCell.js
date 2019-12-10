import React from 'react';

import "../style/DayCell.css";

const DayCell = ({day, color}) => {
    return(
        <div className="calendar-day-cell">
            <div>
                <span className={color}>{day}</span>
            </div>
        </div>
    )
};

export default DayCell;