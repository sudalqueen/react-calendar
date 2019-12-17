import * as React from 'react';
import {useEffect, useState} from "react";

import Calendar from "./Components/Calendar";
import MySchedule from "./model/MySchedule";
import {RealSchedule} from "./model/RealSchedule";

function App() {
    const dataArr = [{
        startDay: 1,
        endDay: 1,
        title: "리액트 스터디"
    }, {
        startDay: 4,
        endDay: 4,
        title: "신입 교육 참가"
    }, {
        startDay: 15,
        endDay: 15,
        title: "휴가!"
    }];

    const [schedules, setSchedules] = useState<Array<RealSchedule<MySchedule>>>(dataArr.map(data=>{
        const mySchedule = new MySchedule(data);
        const realSchedule = new RealSchedule(mySchedule);
        return realSchedule;
    }));

    return (
        <div>
            <Calendar schedules={schedules}/>
        </div>
    )
}

export default App;