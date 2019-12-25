import React, {DragEvent} from 'react';

import "../style/DayCell.css";

type DayCellProps = {
    day: number;
    color?: string;
    className?: string;
    handleChangeDateChange(id:any, pickDay: number): void;
}

const DayCell = ({day, color, className, handleChangeDateChange}: DayCellProps) => {

    function handleDragOver(event: DragEvent<HTMLDivElement>): void {
        event.preventDefault();
    }

    function handleDrop(event: DragEvent<HTMLDivElement>): void {
        event.preventDefault();
        console.log("나 데이셀!!", day, event.dataTransfer.getData("data"));
        const scheduleId: number = Number(event.dataTransfer.getData("data"));
        handleChangeDateChange(scheduleId, day);
    }

    return (
        <div className="calendar-day-cell"
             onDragOver={handleDragOver} onDrop={handleDrop}>
            <div>
                <span className={`${color ? color : ''} ${className ? className : ''}`}>{day > 0 ? day : ''}</span>
            </div>
        </div>
    )
};

export default DayCell;
