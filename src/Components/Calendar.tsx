import React, {ReactElement, useEffect, useState} from 'react';
import DatePicker from "./DatePicker";
import ViewSchedule, {ViewScheduleType} from "./ViewSchedule";
import {BaseSchedule} from "../model/BaseSchedule";
import Schedule from "../model/Schedule";

export type CalendarProps<T extends BaseSchedule> = {
    schedules: Array<T>,
    handleChangeDateChange(id: any, pickDay: number): void
};

/*
* TODO
*  1. makeViewScheduleMatrix로 스케쥴 만드는 메소드 따로 분리하기
*  2. initMatrix(이차원배열 초기화) 로직 분리해서 메소드로 작성
*  3. viewScheduleMatrix 이차원 배열에서 Map을 가지는 배열로 수정
*  4. 드래그 이벤트 만들어서 viewSchedule에 달기 (근데 어디에?) => 드래그이벤트,, 따로 뺄 수 있다면 dragHandler.ts 이런식으로 빼도 좋을듯
*  5. viewSchedule 만들 때 2, 3줄 처럼 여러줄의 schedule 처리 방식 설계하기
*/

function Calendar<T extends BaseSchedule>({schedules, handleChangeDateChange}: CalendarProps<T>) {
    // const [scheduleData, setScheduleData] = useState<Array<T>>(schedules);

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const weekNames = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [day, setDay] = useState(now.getDate());
    const [totalWeeks, setTotalWeeks] = useState<number[]>([]);
    const [dayMatrix, setDayMatrix] = useState<number[][]>([]);
    const [scheduleMatrix, setScheduleMatrix] = useState<Array<Array<Array<Schedule<T>>>>>([]);

    const makeDayMatrix = () => {
        let matrix: number[][] = [];
        let viewMatrix: Array<Array<Array<Schedule<T>>>> = [];

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
                viewMatrix[i][j] = new Array<Schedule<T>>();
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

        /*스케쥴에서 이번달것만 따로 빼기*/
        const thisMonthSchedules = schedules.map(schedule => {
            return schedule;
        });

        thisMonthSchedules.sort((a, b) => {
            const durationA = a.getEndDay() - a.getStartDay();
            const durationB = b.getEndDay() - b.getStartDay();

            if (durationA > durationB) {
                return -1;
            } else if (durationA < durationB) {
                return 1;
            } else {
                return 0;
            }
        });

        thisMonthSchedules.sort((a, b) => {
            if (a.getStartDay() > b.getStartDay()) {
                return 1;
            } else if (a.getStartDay() < b.getStartDay()) {
                return -1;
            } else {
                return 0;
            }
        });

        console.log(thisMonthSchedules)

        let firstDateIndex = 0;
        for (let i = 0; i < matrix[0].length; i++) {
            if (matrix[0][i] === 1) {
                firstDateIndex = i;
            }
        }

        for (let i = 0; i < thisMonthSchedules.length; i++) {
            const schedule = thisMonthSchedules[i];
            let duration = schedule.getEndDay() - schedule.getStartDay() + 1;

            for (let j = 0; j < schedule.getEndDay() - schedule.getStartDay() + 1; j++) {
                const scheduleStartIndex = firstDateIndex + schedule.getStartDay() - 1 + j;
                const scheduleWeekIndex = getWeekIndex(scheduleStartIndex);
                const scheduleDateIndex = getDateIndex(scheduleStartIndex, scheduleWeekIndex);
                const viewScheduleNumber = viewMatrix[scheduleWeekIndex][scheduleDateIndex].length + 1;

                let viewSchedule: ReactElement;

                if (j == 0 || scheduleStartIndex%7 == 0) {
                    let viewScheduleWidth;

                    if(7 - scheduleDateIndex < duration){
                        viewScheduleWidth = 7 - scheduleDateIndex;
                        duration -= viewScheduleWidth;
                    }else{
                        viewScheduleWidth = duration;
                    }

                    viewSchedule = <ViewSchedule schedule={schedule} startX={scheduleDateIndex}
                                                 startY={viewScheduleNumber} width={viewScheduleWidth}/>;
                } else {
                    viewSchedule = <></>;
                }

                viewMatrix[scheduleWeekIndex][scheduleDateIndex].push(new Schedule<T>({
                    schedule: schedule,
                    viewSchedule: viewSchedule
                }));
            }
        }

        setScheduleMatrix(viewMatrix);
        setDayMatrix(matrix);
    };

    function getWeekIndex(startIndex: number): number {
        return Math.floor(startIndex / 7);
    }

    function getDateIndex(startIndex: number, weekIndex: number) {
        return startIndex - (weekIndex * 7);
    }

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
    }, [year, month, schedules]);

    return (
        <div>
            <DatePicker year={year} month={month} day={day} currentYear={currentYear} currentMonth={currentMonth}
                        weekNames={weekNames} totalWeeks={totalWeeks} dayMatrix={dayMatrix}
                        scheduleMatrix={scheduleMatrix} prevMonth={prevMonth} nextMonth={nextMonth}
                        handleChangeDateChange={handleChangeDateChange}/>
        </div>
    )
}

export default Calendar;
