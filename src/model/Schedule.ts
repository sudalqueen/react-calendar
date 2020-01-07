import {ReactElement} from "react";
import {BaseSchedule} from "./BaseSchedule";

export type ScheduleProps<T extends BaseSchedule> = {
    schedule: T;
    viewSchedule: ReactElement;
}

class Schedule<T extends BaseSchedule>{
    private readonly schedule: T;
    private readonly viewSchedule: ReactElement;

    constructor(data: ScheduleProps<T>) {
        this.schedule = data.schedule;
        this.viewSchedule = data.viewSchedule;
    }

    get getSchedule(): T{
        return this.schedule;
    }

    get getViewScheduleElement(): ReactElement{
        return this.viewSchedule;
    }
}

export default Schedule;
