import { useState } from "react"
// import "./cpdEventDetails.scss"

import { useCpdEventsContext } from "../hooks/useCpdEventsContext"
import { useAuthContext } from "../hooks/useAuthContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CpdEventDetails = ({ cpdEvent }) => {
    const {dispatch} = useCpdEventsContext()
    const {user} = useAuthContext()

    const[isFadingOut, setIsFadingOut] = useState(false)

    const fadeOut = ()=>{
        setIsFadingOut(true);
      }

    const handleClick = async (fadeOut) => {
        if(!user){
            return
        }
        const response = await fetch('/api/cpdEvents/' + cpdEvent._id, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()
        
        if(response.ok){
            //Sets timeout on dispatch so that remove fade out animation 
            // time to play
            setTimeout(()=>{
                dispatch({type: 'DELETE_CPDEVENT', payload: json})
            },100)
        }
    }

    
    return (
        <div className={isFadingOut ? "workout-details-fadeout" : "workout-details"}>
            <h4>{cpdEvent.title}</h4>
            <p><strong> CPD Points (hours): </strong>{cpdEvent.cpd_points}</p>
            <p><strong> Field : </strong>{cpdEvent.field}</p>
            <span className="material-symbols-outlined" onClick={()=>handleClick(fadeOut())}>delete</span>
            <p><strong> Submitted: </strong>{formatDistanceToNow(new Date(cpdEvent.createdAt), {addSuffix: true})}</p>
        </div>
    )
}

export default CpdEventDetails