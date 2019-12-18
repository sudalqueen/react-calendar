import {BaseSchedule} from "./BaseSchedule";

export class Schedule<T extends BaseSchedule> {
    private schedule: T;

    constructor(data: T) {
        this.schedule = data;
    }

    getStartDay(): number {
        return this.schedule.getStartDay();
    }

    getEndDay(): number {
        return this.schedule.getEndDay();
    }

    getTitle(): string {
        return this.schedule.getTitle();
    }

}
