import * as React from 'react';
import {useEffect, useState} from "react";

import Calendar from "./Components/Calendar";
import MySchedule from "./model/MySchedule";

function App() {
    const dataArr = [{
        startDay: 2,
        endDay: 2,
        title: "신입 교육 참가"
    }, {
        startDay: 24,
        endDay: 25,
        title: "해피 메리 크리스마스"
    },{
        startDay: 16,
        endDay: 16,
        title: "휴가!"
    }];

    const [schedules, setSchedules] = useState<Array<MySchedule>>(dataArr.map(data=>{
        const mySchedule = new MySchedule(data);
        return mySchedule;
    }));

    return (
        <div>
            <Calendar schedules={schedules}/>
        </div>
    )
}

export default App;