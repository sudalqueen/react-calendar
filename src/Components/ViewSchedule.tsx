import React, {useState} from 'react';
import {RealSchedule} from "../model/RealSchedule";

import "../style/ViewSchedule.css";

export type ViewScheduleType = {
    schedule: RealSchedule<any>,
    startY: number,
    startX: number
};

function ViewSchedule(props: ViewScheduleType){
    return(
        <div className="view-schedule">{props.schedule.getTitle()}</div>
    )
}

export default ViewSchedule;
