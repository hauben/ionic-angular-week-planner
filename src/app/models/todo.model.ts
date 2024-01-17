export interface TodoItem {
    id: number;
    name: string;
    color : string;
    isDone: boolean;
    calendarWeek: number;
    isDurationBased: number;
    activity: string;
    timegoal: {hours: number, minutes: number}
  }