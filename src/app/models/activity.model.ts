import { Session } from './session'

export interface ActivityItem {
    id: number;
    name: string;
    sessions: Session[];
  }

export interface Activity {
  id: number;
  name: string;
}  