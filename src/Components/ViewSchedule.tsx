import React, {DragEvent, useEffect, useState} from 'react';
import {BaseSchedule} from "../model/BaseSchedule";

import "../style/ViewSchedule.css";

/*
* TODO
*  1. startY, startX로 스케쥴 위치 동적으로 잡아주기 -> 스크립트로 먼저 짜고, 이후에 styledComponent로 수정
*  2. dragEvent 만들어서 걸어주기
*/

export type ViewScheduleType<T extends BaseSchedule> = {
    schedule: T,
    startX: number
};

function ViewSchedule<T extends BaseSchedule>({schedule, startX}: ViewScheduleType<T>) {
    const StandardSize = 100 / 7;
    const width = 1 + schedule.getEndDay() - schedule.getStartDay();


    function handleDrag(event: DragEvent<HTMLDivElement>) {

    }

    function handleDragEnd(event: DragEvent<HTMLDivElement>): void {

    }

    function handleDragEnter(event: DragEvent<HTMLDivElement>): void {

    }

    function handleDragExit(event: DragEvent<HTMLDivElement>): void {

    }

    function handleDragLeave(event: DragEvent<HTMLDivElement>): void {

    }

    function handleDragOver(event: DragEvent<HTMLDivElement>): void {
        event.preventDefault();
    }

    function handleDragStart(event: DragEvent<HTMLDivElement>): void {
        event.dataTransfer.setData("data", schedule.getId());
    }

    function handleDrop(event: DragEvent<HTMLDivElement>): void {
        event.preventDefault();
        console.log(event);
    }

    return (
        <div className="view-schedule-block"
             style={{width: `${StandardSize * width}%`, left: `${StandardSize * startX}%`}}
             draggable onDrag={handleDrag} onDragEnd={handleDragEnd}
             onDragEnter={handleDragEnter} onDragExit={handleDragExit} onDragLeave={handleDragLeave}
             onDragOver={handleDragOver} onDragStart={handleDragStart} onDrop={handleDrop}>
            <div className="view-schedule">
                {schedule.getTitle()}
            </div>
        </div>
    )
}

export default ViewSchedule;
