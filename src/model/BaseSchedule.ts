export abstract class BaseSchedule {
    abstract getStartDay(): number;
    abstract getEndDay(): number;
    abstract getTitle(): string;
    abstract getId(): any;
    abstract getBackgroundColor(): string;
}
