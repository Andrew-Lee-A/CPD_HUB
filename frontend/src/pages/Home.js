import { useEffect } from "react"
import { useCpdEventsContext } from "../hooks/useCpdEventsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from "../components/CpdEventDetails"
import WorkoutForm from "../components/CpdEventForm"

const Home = () => {
  const { cpdEvents, dispatch } = useCpdEventsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/cpdEvents', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_CPDEVENTS', payload: json})
      }
    }

    if (user){
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {cpdEvents && cpdEvents.map(cpdEvent => (
          <WorkoutDetails cpdEvent={cpdEvent} key={cpdEvent._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home