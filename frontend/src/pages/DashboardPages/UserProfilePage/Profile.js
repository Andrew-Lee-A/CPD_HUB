import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import './profilepages.scss'

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const Profile = () => {
    const {user} = useAuthContext()
    const [userDetails, setUserDetails] = useState({
    preferredName: "",
    lineOfBusiness: "",
    discipline: "",
    seniority: "",
    cycleStartDate: "",
    pushFrequency: "",
  });

  const [isLoaded, setIsLoaded] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
        const response = await fetch("/api/userDetails/details", {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        const json = await response.json();

        if (response.ok){
            const {cycleStartDate} = json;
            console.log(cycleStartDate)
            setUserDetails({
                ...json,
                cycleStartDate : new Date(cycleStartDate.toString()).toLocaleDateString('en-NZ', {timezone: 'NZST'})
            })
            setIsLoaded(true)
        }
    }

    fetchUserDetails()
  }, [user]);

  return (
    <div className="pages">
        <div className="userDetails">
            {isLoaded ? ( 

            <div className="userDetailsCard">
                <form className="create" onSubmit={handleSubmit}>
                <h3>General Details</h3>

                <label>Name:</label>
                <input 
                    readOnly
                    type="text"
                    value={userDetails.prefferedName}
                    className={"title"}
                />
                <label>Line of Business:</label>
                <input 
                    readOnly
                    type="text"
                    value={userDetails.lineOfBusiness}
                    className={"title"}
                />
                <label>Discipline:</label>
                <input 
                    readOnly
                    type="text"
                    value={userDetails.discipline}
                    className={"title"}
                />   
                <label>Seniorty:</label>
                <input 
                    readOnly
                    type="text"
                    value={userDetails.seniority}
                    className={"title"}
                />     
                <label>CPD Date:</label>
                <input 
                    readOnly
                    type="text"
                    value={userDetails.cycleStartDate}
                    className={"title"}
                /> 
                <label>Push Frequency:</label>
                <input 
                    readOnly
                    type="text"
                    value={userDetails.pushFrequency}
                    className={"title"}
                />       
                {/* <button>Add CPD Event</button> */}
                </form>
            </div>
            
            ):(
                <div> Loading </div>
            )}
        </div>

        <div className="pictureCard">
            <div className="picture">
                <InsertEmoticonIcon/>
            </div>
        </div>

    </div>
  );
};

export default Profile