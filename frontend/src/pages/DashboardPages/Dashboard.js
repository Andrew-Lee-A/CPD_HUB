import React, { useState } from 'react'
import { useEffect } from "react";
import { useCpdEventsContext } from "../../hooks/useCpdEventsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// components
import WorkoutDetails from "../../components/CpdEventDetails";
import ProgressBar from "../../components/ProgressBar";

const Dashboard = () => {

    const { cpdEvents, dispatch } = useCpdEventsContext();
    const { user } = useAuthContext();
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
      const fetchCPDEvents = async () => {
        const response = await fetch("/api/cpdEvents", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
  
        if (response.ok) {
          dispatch({ type: "SET_CPDEVENTS", payload: json });
          setIsLoaded(true);
        }
      };
  
      if (user) {
        fetchCPDEvents();
        
      }
    }, [dispatch, user]);

  return (
        <div className="pages">
          <div className="workouts">
            <div>
              <h3>Upcoming CPD events</h3>
            </div>
            {isLoaded ? (cpdEvents.length > 0 ? 
              (cpdEvents.map((cpdEvent) => (
                <WorkoutDetails cpdEvent={cpdEvent} key={cpdEvent._id} />
              ))):(<div>No Upcoming CPD</div>) ) : (<div>Loading</div>)}
          </div>
          <div>
            <div>
              <h3>CPD Progress - Points(hours)</h3>
            </div>
            <ProgressBar />
          </div>
        </div>
  )
}

export default Dashboard