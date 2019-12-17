import React, {useEffect, useState} from 'react';
import DatePicker from "./DatePicker";
import {RealSchedule} from "../model/RealSchedule";

export type CalendarProps = {
    schedules: Array<RealSchedule<any>>
};

function Calendar({schedules}: CalendarProps) {
  const [scheduleData, setScheduleData] = useState<Array<RealSchedule<any>>>(schedules);

  useEffect(()=>{
      scheduleData.map(schedule => {
          console.log("시작일 : ", schedule.getStartDay());
      });
  },[]);

    return (
        <div>
            <DatePicker schedules={scheduleData}/>
        </div>
    )
}

export default Calendar;