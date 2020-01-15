import * as React from 'react';
import {useEffect, useState} from "react";

import Calendar from "./Components/Calendar";
import MySchedule from "./model/MySchedule";

function App() {
    const dataArr = [{
        id: 1,
        startDay: 6,
        endDay: 9,
        title: "신입 교육 참가",
        color: "navy"
    }, {
        id: 2,
        startDay: 12,
        endDay: 17,
        title: "여행",
        color: "lightcoral"
    },{
        id: 3,
        startDay: 11,
        endDay: 12,
        title: "휴가!"
    },{
        id: 4,
        startDay: 20,
        endDay: 22,
        title: "룰루",
        color: "crimson"
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

    const handleAddSchedule = (data: any) => {
        const newData = Object.assign(data, {id: dataArr.length+1});
        const newDataArr = dataArr.concat(newData);
        console.log(newDataArr)

        setSchedules(newDataArr.map(data=>{
            const mySchedule = new MySchedule(data);
            return mySchedule;
        }))
    };

    return (
        <div>
            <Calendar schedules={schedules} handleChangeDateChange={handleChangeDateChange} handleAddSchedule={handleAddSchedule}/>
        </div>
    )
}

export default App;
