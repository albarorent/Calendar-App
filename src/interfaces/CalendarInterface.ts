export interface eventCalendar {
    title:string;
    notes:string;
    start:Date;
    end:Date;
    bgColor:string;
    user:{
        _id:number;
        name:string
    }
}