import React, { useState } from 'react'
import { useEffect } from "react";
import { useCpdEventsContext } from "../../hooks/useCpdEventsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// components
import WorkoutDetails from "../../components/CpdEventDetails";
import ProgressWheel from "../../components/ProgressWheel";
import WithLabelExample from "../../components/SingleProgressBar/progressBar"


const Dashboard = () => {

    const { cpdEvents, dispatch } = useCpdEventsContext();
    const { user } = useAuthContext();
    const [isLoaded, setIsLoaded] = useState(false)
    const [pushedCPDLoaded, setPushedCPDLoaded] = useState(false)
    const [pushedCPD, setPushedCPD] = useState({})

    const fetchPushedCPD = async () => {
      const response = await fetch("/api/pushedCPD", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
  
      if (response.ok) {
        setPushedCPD(json)
        setPushedCPDLoaded(true)
      }
    }

    useEffect(() => {
      const fetchCPDEvents = async () => {
        const response = await fetch("/api/bookedCPD", {
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
        fetchPushedCPD();
      }
    }, [dispatch, user]);

  return (
        <div className="pages">
          <div className="workouts">
            <div>
              <h3> Pushed CPD events</h3>
            </div>
            {pushedCPDLoaded ? (pushedCPD.length > 0 ? 
              (pushedCPD.map((cpdEvent) => (
                <WorkoutDetails cpdEvent={cpdEvent} key={cpdEvent._id} />
              ))):(<div style={{padding: "10px"}}>No Pushed CPD</div>) ) : (<div>Loading</div>)}

            <div>
              <h3>Upcoming Booked CPD events</h3>

            </div>
            {isLoaded ? (cpdEvents.length > 0 ? 
              (cpdEvents.map((cpdEvent) => (
                <WorkoutDetails cpdEvent={cpdEvent} key={cpdEvent._id} />
              ))):(<div style={{padding: "10px"}}>No Booked CPD</div>) ) : (<div>Loading</div>)}
          </div>
          
          <div>
            <div>
              <h3>CPD Progress - Points(hours)</h3>
            </div>
              <ProgressWheel />
              <WithLabelExample/>
          </div>
        </div>
  )
}

export default Dashboard