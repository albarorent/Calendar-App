interface User {
    _id: number;
    name: string;
  }
  
  export interface EventCalendar {
    _id?: number;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor?: string;
    user?: User;
  }
  