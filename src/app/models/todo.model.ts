export interface TodoItem {
    id: number;
    name: string;
    color : string;
    isDone: boolean;
    calendarWeek: number;
    isDurationBased: number;
    activity: object;
    timegoalHours: string;
    timegoalMinutes: string;
  }