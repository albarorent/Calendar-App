interface User {
    _id: number;
    uid:string
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
  

  //GetCalendarCreateEvent

  export interface GetCalendarCreateEvent {
  ok:    boolean;
  event: Event;
}

export interface Event {
  title: string;
  notes: string;
  start: string;
  end:   string;
  _id:   string;
  user:  User;
  __v:   number;
}


//GetCalendarEvents

export interface GetCalendarEvents {
  ok:      boolean;
  eventos: Event[];
}


