import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import ProgressBar from "../components/ProgressBar"
import Sidebar from "../components/Sidebar/Sidebar.js"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user){
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <Sidebar/>
      <div className="workouts">
        <div><h3>Upcoming CPD events</h3></div>
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <div>
      <div><h3>CPD Progress</h3></div>
      <ProgressBar/>
      {/* <WorkoutForm /> */}
      </div>
    </div>
  )
}

export default Home