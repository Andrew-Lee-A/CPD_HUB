import { useCpdEventsContext } from "../hooks/useCpdEventsContext"
import { useAuthContext } from "../hooks/useAuthContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CpdEventDetails = ({ cpdEvent }) => {
    const {dispatch} = useCpdEventsContext()
    const {user} = useAuthContext()
    const start_date = new Date(cpdEvent.start_date.toString()).toLocaleString('en-NZ', {timezone: 'NZST'});
    const end_date = new Date(cpdEvent.end_date.toString()).toLocaleString('en-NZ', {timezone: 'NZST'});


    const handleClick = async () => {
        if(!user){
            return
        }
        const response = await fetch('/api/bookedCPD/' + cpdEvent._id, {
            method: 'PATCH',
            headers: {'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()
        if(response.ok){
            console.log('Delete response ok')
            dispatch({type: 'DELETE_CPDEVENT', payload: json})

        }
    }
    
    return (
        <div className="workout-details">
            <h4>{cpdEvent.title}</h4>
            <p><strong> CPD Points: </strong>{cpdEvent.cpd_points}</p>
            <p><strong> Start Date : </strong>{start_date}</p>
            <p><strong> End Date : </strong>{end_date}</p>
            <p><strong> Price : </strong>{cpdEvent.price}</p>
            <p><strong> Booking Url : </strong>{cpdEvent.booking_Url}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default CpdEventDetails