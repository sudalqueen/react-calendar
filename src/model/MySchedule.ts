import {BaseSchedule} from "./BaseSchedule";

export type ScheduleProps = {
    id: number;
    startDay: number;
    endDay: number;
    title: string;
    draggable?: boolean;
    color?: string;
}

class MySchedule extends BaseSchedule{
    private readonly _id: number;
    private _startDay: number;
    private _endDay: number;
    private _title: string;
    private _draggable: boolean;
    private _color: string;

    constructor(data: ScheduleProps) {
        super();
        this._id = data.id || -1;
        this._startDay = data.startDay || 0;
        this._endDay = data.endDay || 0;
        this._title = data.title || '';
        this._draggable = data.draggable || true;
        this._color = data.color || 'mediumpurple';
    }

    getId(): number{
        return this._id;
    }

    getStartDay(): number {
        return this._startDay;
    }

    getEndDay(): number {
        return this._endDay;
    }

    getTitle(): string{
        return this._title;
    }

    getDraggable(): boolean{
        return this._draggable;
    }

    getBackgroundColor(): string {
        return this._color;
    }

    set setStartDay(startDay: number){
        this._startDay = startDay;
    }

    set setEndDay(endDay: number){
        this._endDay = endDay;
    }

    set setTitle(title: string){
        this._title = title;
    }

    set setDraggable(draggable: boolean){
        this._draggable = draggable;
    }

    set setColor(color: string){
        this._color = color;
    }

    setScheduleDate(startDay: number, endDay: number): void {

    }

    isEqual(schedule: MySchedule): boolean {
        if (this._id !== schedule.getId()) {
            return false;
        }
        if (this._startDay !== schedule.getStartDay()) {
            return false;
        }
        if (this._endDay !== schedule.getEndDay()) {
            return false;
        }
        if (this._title !== schedule.getTitle()){
            return false;
        }
        if (this._draggable !== schedule.getDraggable()) {
            return false;
        }
        return true;
    };
}

export default MySchedule;
