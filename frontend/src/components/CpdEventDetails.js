import { useCpdEventsContext } from "../hooks/useCpdEventsContext"
import { useAuthContext } from "../hooks/useAuthContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CpdEventDetails = ({ cpdEvent }) => {
    const {dispatch} = useCpdEventsContext()
    const {user} = useAuthContext()

    const handleClick = async () => {
        if(!user){
            return
        }
        const response = await fetch('/api/cpdEvents/' + cpdEvent._id, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()
        
        if(response.ok){
            dispatch({type: 'DELETE_CPDEVENT', payload: json})
        }
    }
    
    return (
        <div className="workout-details">
            <h4>{cpdEvent.title}</h4>
            <p><strong> CPD Points (hours): </strong>{cpdEvent.cpd_points}</p>
            <p><strong> Field : </strong>{cpdEvent.field}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            <p><strong> Submitted: </strong>{formatDistanceToNow(new Date(cpdEvent.createdAt), {addSuffix: true})}</p>
        </div>
    )
}

export default CpdEventDetails