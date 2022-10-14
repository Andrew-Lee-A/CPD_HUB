import { useCpdEventsContext } from "../hooks/useCpdEventsContext"
import { useAuthContext } from "../hooks/useAuthContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CpdEventDetails = ({ cpdEvent }) => {
    const {dispatch} = useCpdEventsContext()
    const {user} = useAuthContext()
    //const date = new Date(cpdEvent.date.toString()).toLocaleString('en-NZ', {timezone: 'NZST'});

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
            <p><strong> CPD Points (hours): </strong>{cpdEvent.cpd_points}</p>
            <p><strong> Field : </strong>{cpdEvent.field}</p>
            <p><strong> Date : </strong>{cpdEvent.date}</p>
            <p><strong> Price : </strong>{cpdEvent.price}</p>
            <p><strong> Booking Url : </strong>{cpdEvent.booking_Url}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default CpdEventDetails