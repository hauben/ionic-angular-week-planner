import { ActivityItem } from './activity.model';

export interface TodoItem {
    id: number;
    name: string;
    color : string;
    isDone: boolean;
    calendarWeek: number;
    isDurationBased: number;
    activity: ActivityItem;
    timegoalHours: string;
    timegoalMinutes: string;
  }