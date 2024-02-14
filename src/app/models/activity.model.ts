import { Session } from './session'

export interface ActivityItem {
    id: number;
    name: string;
    sessions: Session[];
  }