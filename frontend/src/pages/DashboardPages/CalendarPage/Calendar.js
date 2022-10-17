import React, {useState, useEffect } from 'react'
import { useCpdEventsContext } from "../../../hooks/useCpdEventsContext";
import "./calendar.scss"

/* date-fns dependencies */
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

/* react-big-calendar dependencies */
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

function calculateEndDate(date, points){
  const endDate = new Date(date);
  endDate.setUTCHours(endDate.getUTCHours() + points);
  return endDate
}

function CalendarApp() {
    const [allEvents, setAllEvents] = useState(events);
    const {cpdEvents} = useCpdEventsContext();

    useEffect(() => {

      const cpdEventsArray = cpdEvents.map(item => ({
        title: item.title,
        start: new Date(item.date),
        end: calculateEndDate(item.date, item.cpd_points),
      }));
      setAllEvents(allEvents.concat(cpdEventsArray))
      }, []);

  return (
    <>
        <div className="calendarApp">
            {/* <h1>Welcome to our Calender page</h1>
            <h4>Please fill in the inputs below to book your webinar meeting</h4> */}

            {/* Calendar view */}
            <Calendar 

                /* Attributes */
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                className='calendarview'

                /* style */
                style={{
                    height: '80vh',
                    width: '65vw',
                }}
            />
        </div>
    </>
  )
}

export default CalendarApp;