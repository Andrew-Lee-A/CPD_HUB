import React from 'react'
import { useEffect } from "react";
import { useCpdEventsContext } from "../../hooks/useCpdEventsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// components
import WorkoutDetails from "../../components/CpdEventDetails";
import CpdEventForm from "../../components/CpdEventForm";
import ProgressBar from "../../components/ProgressBar";

const Dashboard = () => {

    const { cpdEvents, dispatch } = useCpdEventsContext();
    const { user } = useAuthContext();
  
    useEffect(() => {
      const fetchWorkouts = async () => {
        const response = await fetch("/api/cpdEvents", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
  
        if (response.ok) {
          dispatch({ type: "SET_CPDEVENTS", payload: json });
        }
      };
  
      if (user) {
        fetchWorkouts();
      }
    }, [dispatch, user]);

  return (
        <div className="pages">
          <div className="workouts">
            <div>
              <h3>Upcoming CPD events</h3>
            </div>
            {cpdEvents &&
              cpdEvents.map((cpdEvent) => (
                <WorkoutDetails cpdEvent={cpdEvent} key={cpdEvent._id} />
              ))}
          </div>
          <div>
            <div>
              <h3>CPD Progress</h3>
            </div>
            <ProgressBar />
          </div>
        </div>
  )
}

export default Dashboard