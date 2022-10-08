import React, {useState, useEffect } from 'react'
import { useCpdEventsContext } from "../../../hooks/useCpdEventsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./calendar.scss"

/* date-fns dependencies */
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

/* react-big-calendar dependencies */
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

/* datepicker dependencies */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/* Global variables */
const locales = {
    "en-NZ": require("date-fns/locale/en-NZ")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Big Meeting",
        start: Date(),
        end: "",
    }
]

function CalendarApp() {
    const [allEvents, setAllEvents] = useState(events);
    const { cpdEvents, dispatch } = useCpdEventsContext();
    const { user } = useAuthContext();


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
          }
        };
    
        if (user){
            fetchCPDEvents();
            const cpdEventsArray = cpdEvents.map(item => ({
                title: item.title, start: new Date(item.date), end: new Date(item.date),
              }));
            setAllEvents(allEvents.concat(cpdEventsArray))
            console.log(allEvents)

        }
          
      }, [user, dispatch]);
    
  return (
    <>
        <div className="App">
            {/* <h1>Welcome to our Calender page</h1>
            <h4>Please fill in the inputs below to book your webinar meeting</h4> */}

            {/* Calendar view */}
            <Calendar 
                /* Attributes */
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"

                /* style */
                style={{
                    height: '80vh',
                    margin: '50px'
                }}
            />
        </div>
    </>
    
  )
}

export default CalendarApp;