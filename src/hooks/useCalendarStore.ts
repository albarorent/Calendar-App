import { useAppSelector } from "../store/hooks"

export const useCalendarStore = () => {
    
    const {events} = useAppSelector(state => state.calendar)

    return{
        events
    }
}
