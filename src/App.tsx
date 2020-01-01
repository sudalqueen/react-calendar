import * as React from 'react';
import {useEffect, useState} from "react";

import Calendar from "./Components/Calendar";
import MySchedule from "./model/MySchedule";

function App() {
    const dataArr = [{
        id: 1,
        startDay: 2,
        endDay: 2,
        title: "신입 교육 참가"
    }, {
        id: 2,
        startDay: 24,
        endDay: 25,
        title: "해피 메리 크리스마스"
    },{
        id: 3,
        startDay: 16,
        endDay: 16,
        title: "휴가!"
    },{
        id: 4,
        startDay: 16,
        endDay: 16,
        title: "룰루"
    }];

    const [schedules, setSchedules] = useState<Array<MySchedule>>(dataArr.map(data=>{
        const mySchedule = new MySchedule(data);
        return mySchedule;
    }));

    const handleChangeDateChange = (id:number, pickDay: number) => {
        const newSchedule: Array<MySchedule> = schedules.map(schedule => {
            if(schedule.getId() === id){
                const duration: number = schedule.getEndDay() - schedule.getStartDay();
                schedule.setStartDay = pickDay;
                schedule.setEndDay = pickDay + duration;
            }
            return schedule;
        });
        setSchedules(newSchedule);
    };

    return (
        <div>
            <Calendar schedules={schedules} handleChangeDateChange={handleChangeDateChange}/>
        </div>
    )
}

export default App;
