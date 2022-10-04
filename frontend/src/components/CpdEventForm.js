import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCpdEventsContext } from '../hooks/useCpdEventsContext'

const CpdEventForm = () => {
  const { dispatch } = useCpdEventsContext()

  const [title, setTitle] = useState('')
  const [cpd_points, setCpd_points] = useState('')
  const [field, setField] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user){
      setError('You must be logged in')
      return
    }
    const cpdEvent = {title, cpd_points, field}
    
    const response = await fetch('/api/cpdEvents', {
      method: 'POST',
      body: JSON.stringify(cpdEvent),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setCpd_points('')
      setField('')
      setEmptyFields([])
      dispatch({type: 'CREATE_CPDEVENT', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New CPD Event</h3>

      <label>CPD Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>CPD Points (in hours):</label>
      <input 
        type="number" 
        onChange={(e) => setCpd_points(e.target.value)} 
        value={cpd_points}
        className={emptyFields.includes('cpd_points') ? 'error' : ''}
      />

      <label>Field:</label>
      <input 
        type="String" 
        onChange={(e) => setField(e.target.value)} 
        value={field} 
        className={emptyFields.includes('Field') ? 'error' : ''}
      />

      <button>Add CPD Event</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CpdEventForm