import React, {ReactElement, useEffect, useState} from 'react';
import DatePicker from "./DatePicker";
import {RealSchedule} from "../model/RealSchedule";
import ViewSchedule, {ViewScheduleType} from "./ViewSchedule";

export type CalendarProps = {
    schedules: Array<RealSchedule<any>>
};

/*
* TODO
*  1. makeViewScheduleMatrix 동작하게 수정
*  2. initMatrix(이차원배열 초기화) 로직 분리해서 메소드로 작성
*  3. viewScheduleMatrix 만들 때 while문 수정 -> 스케쥴 분배가 제대로 안되고 있음
*  4. 드래그 이벤트 만들어서 viewSchedule에 달기 (근데 어디에?) => 드래그이벤트,, 따로 뺄 수 있다면 dragHandler.ts 이런식으로 빼도 좋을듯
*  5. viewSchedule 만들 때 2, 3줄 처럼 여러줄의 schedule 처리 방식 설계하기
*/

function Calendar({schedules}: CalendarProps) {
    const [scheduleData, setScheduleData] = useState<Array<RealSchedule<any>>>(schedules);

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const weekNames = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [day, setDay] = useState(now.getDate());
    const [totalWeeks, setTotalWeeks] = useState<number[]>([]);
    const [dayMatrix, setDayMatrix] = useState<number[][]>([]);
    const [scheduleMatrix, setScheduleMatrix] = useState<any[][]>([]);

    const makeViewScheduleMatrix = () => {
        let matrix: any[][] = [];

        let firstDay = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0).getDate();
        const startWeek = firstDay.getDay();
        const totalCells = startWeek + lastDate + 1 <= 35 ? 35 : 42;
        const weeks = totalCells / 7;

        for (let i = 0; i < weeks; i++) {
            matrix[i] = [];
            for (let j = 0; j < 7; j++) {
                matrix[i][j] = <></>;
            }
        }

        // const thisMonthSchedules = scheduleData.map(schedule => {
        //     return schedule;
        // });
        //
        // let index = 0;
        //
        // for (let i = 0; i < dayMatrix.length; i++) {
        //     for (let j = 0; j < dayMatrix[i].length; j++) {
        //         while (index < thisMonthSchedules.length && thisMonthSchedules[index].getStartDay() < dayMatrix[i][6]) {
        //             const schedule = thisMonthSchedules[index];
        //             if (schedule.getStartDay() <= dayMatrix[i][j]) {
        //                 matrix[i][j] = <ViewSchedule schedule={schedule}/>;
        //                 index++;
        //             }
        //         }
        //     }
        // }
        //
        // setScheduleMatrix(matrix);
    };

    const makeDayMatrix = () => {
        let matrix: number[][] = [];
        let viewMatrix: any[][] = [];

        let firstDay = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0).getDate();
        const startWeek = firstDay.getDay();
        const totalCells = startWeek + lastDate + 1 <= 35 ? 35 : 42;
        const weeks = totalCells / 7;

        setTotalWeeks(Array.apply(null, new Array(totalCells / 7)).map((item, index) => index));

        let day = firstDay.getDate();

        for (let i = 0; i < weeks; i++) {
            matrix[i] = [];
            viewMatrix[i] = [];
            for (let j = 0; j < 7; j++) {
                matrix[i][j] = 0;
                viewMatrix[i][j] = <></>;
            }
        }

        for (let i = 0; i < weeks; i++) {
            for (let j = 0; j < 7; j++) {
                if (i == 0 && j < startWeek || day > lastDate) {
                    matrix[i][j] = 0;
                } else {
                    matrix[i][j] = day++;
                }
            }
        }

        const thisMonthSchedules = scheduleData.map(schedule => {
            return schedule;
        });

        let index = 0;

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                while (index < thisMonthSchedules.length && thisMonthSchedules[index].getStartDay() <= matrix[i][6]) {
                    const schedule = thisMonthSchedules[index];
                    if (schedule.getStartDay() <= matrix[i][j]) {
                        viewMatrix[i][j] = <ViewSchedule schedule={schedule} startY={i} startX={j}/>;
                    }
                    index++;
                }
            }
        }

        setScheduleMatrix(viewMatrix);

        setDayMatrix(matrix);
    };

    const prevMonth = () => {
        if (month - 1 === -1) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    };

    const nextMonth = () => {
        if (month + 1 === 12) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    };

    useEffect(() => {
        makeDayMatrix();
        makeViewScheduleMatrix();
    }, [year, month]);

    return (
        <div>
            <DatePicker year={year} month={month} day={day} currentYear={currentYear} currentMonth={currentMonth}
                        weekNames={weekNames} totalWeeks={totalWeeks} dayMatrix={dayMatrix}
                        scheduleMatrix={scheduleMatrix} prevMonth={prevMonth} nextMonth={nextMonth}/>
        </div>
    )
}

export default Calendar;
