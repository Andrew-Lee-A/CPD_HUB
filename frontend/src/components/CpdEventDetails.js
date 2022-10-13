import { useCpdEventsContext } from "../hooks/useCpdEventsContext"
import { useAuthContext } from "../hooks/useAuthContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CpdEventDetails = ({ cpdEvent }) => {
    const {dispatch} = useCpdEventsContext()
    const {user} = useAuthContext()
    const date = new Date(cpdEvent.date.toString()).toLocaleString('en-NZ', {timezone: 'NZST'});

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
            <p><strong> Date : </strong>{date}</p>
            <p><strong> Location : </strong>{cpdEvent.location}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            <p><strong> Submitted: </strong>{formatDistanceToNow(new Date(cpdEvent.createdAt), {addSuffix: true})}</p>
        </div>
    )
}

export default CpdEventDetails