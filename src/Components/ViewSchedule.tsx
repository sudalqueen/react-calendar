import React, {useState} from 'react';
import {Schedule} from "../model/Schedule";

import "../style/ViewSchedule.css";

/*
* TODO
*  1. startY, startX로 스케쥴 위치 동적으로 잡아주기 -> 스크립트로 먼저 짜고, 이후에 styledComponent로 수정
*  2. dragEvent 만들어서 걸어주기
*/

export type ViewScheduleType = {
    schedule: Schedule<any>,
    startY: number,
    startX: number
};

function ViewSchedule(props: ViewScheduleType){
    return(
        <div className="view-schedule">{props.schedule.getTitle()}</div>
    )
}

export default ViewSchedule;
