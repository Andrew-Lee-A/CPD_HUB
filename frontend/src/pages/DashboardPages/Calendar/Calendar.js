import React, {useState } from 'react'
import "./Style.css"

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

/* FUNCTIONS */
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
        allDay: true,
        start: new Date(2021, 10, 4),
        end: new Date(2021, 10, 4),
    },
    {
        title: "Holiday",
        start: new Date(2021, 10, 6),
        end: new Date(2021, 10, 8),
    },
    {
        title: "Webinar",
        start: new Date(2021, 10, 3),
        end: new Date(2021, 10, 5),
    },
]

function CalendarApp() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: ""});
    const [allEvents, setAllEvents] = useState(events);

    function addNewEvent() {
        
        /* for loop to identify all event */
        for (let index = 0; index < allEvents; index++) {
            const d1 = new Date (allEvents[index].start);
            const d2 = new Date (newEvent.start);
            const d3 = new Date (allEvents[index].end);
            const d4 = new Date (newEvent.end);
        
            /* if statement to avoid duplications of exact same date */
            if (( (d1 <= d2) && (d2 <= d3) ) || ( (d1 <= d4) && (d4 <= d3) )) {
                alert("We are sorry the date entered for webinar booking is already reserved.");
                break;
            }
        }

        setAllEvents([...allEvents, newEvent]);
    }
    
  return (
    <>
        <div className="App">
            {/* <h1>Welcome to our Calender page</h1>
            <h4>Please fill in the inputs below to book your webinar meeting</h4> */}

            <div>
                {/* An input for title */}
                <input 
                    /* attributes */
                    type="text"
                    placeholder="Add a title here..."
                    value={newEvent.title}
                    onChange={(event) => setNewEvent({...newEvent, title: event.target.value})}

                    /* the style */
                    style={{
                        width: '20vw',
                        height: '6vh',
                        marginLeft: "3vw",
                        // marginTop: "3vw",
                    }}
                />

                {/* An input for a start date */}
                {/* <label className="startDate">Start date:</label> */}
                <DatePicker 
                    /* attributes */
                    className='startDatePicker'
                    placeholderText="Enter a start date here"
                    selected={newEvent.start}
                    onChange={(start) => setNewEvent({...newEvent, start})} 

                    /* the style */
                    style={{
                        width: '30%',
                        // marginRight: '10px',
                    }}
                />

                {/* An input for an end date */}
                {/* <label className="endDate">End date:</label> */}
                <DatePicker 
                    /* attributes */
                    className='endtDatePicker'
                    placeholderText="Enter an end date here"
                    selected={newEvent.end}
                    onChange={(end) => setNewEvent({...newEvent, end})} 

                    /* the style */
                    style={{
                        width: "30%",
                        // marginRight: '10px',
                    }}
                />

                {/* button */}
                <button
                    className='addEventButton'
                    onClick={addNewEvent}
                >
                    Add New Event
                </button>
            </div>

            {/* Calendar view */}
            <Calendar 
                /* Attributes */
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"

                /* style */
                style={{
                    height: '420px',
                    margin: '50px'
                }}
            />
        </div>
    </>
    
  )
}

export default CalendarApp;