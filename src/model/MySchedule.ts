import {BaseSchedule} from "./BaseSchedule";

export type ScheduleProps = {
    id?: string;
    startDay: number;
    endDay: number;
    title: string;
    draggable?: boolean;
}

class MySchedule extends BaseSchedule{
    private readonly _id: string;
    private readonly _startDay: number;
    private readonly _endDay: number;
    private readonly _duration: number;
    private readonly _title: string;
    private readonly _draggable: boolean;

    constructor(data: ScheduleProps) {
        super();
        this._id = '';
        this._startDay = data.startDay || 0;
        this._endDay = data.endDay || 0;
        this._duration = 0;
        this._title = data.title || '';
        this._draggable = data.draggable || true;
    }

    get getId(): string{
        return this._id;
    }

    getStartDay(): number {
        return this._startDay;
    }

    getEndDay(): number {
        return this._endDay;
    }

    get getDuration(): number{
        return this._duration;
    }

    getTitle(): string{
        return this._title;
    }

    get getDraggable(): boolean{
        return this._draggable;
    }

    isEqual(schedule: MySchedule): boolean {
        if (this._id !== schedule.getId) {
            return false;
        }
        if (this._startDay !== schedule.getStartDay()) {
            return false;
        }
        if (this._endDay !== schedule.getEndDay()) {
            return false;
        }
        if (this._duration !== schedule.getDuration) {
            return false;
        }
        if (this._title !== schedule.getTitle()){
            return false;
        }
        if (this._draggable !== schedule.getDraggable) {
            return false;
        }
        return true;
    };
}

export default MySchedule;