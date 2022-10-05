import React, { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext'
import './userdetailsform.scss';

function UserDetailsForm() {
    const {user} = useAuthContext()

    /* to set the default date to the current date instead of showing the yyyy-mm-dd */
    const today = new Date();
    const numberOfDaysToAdd = 1; /* add 1 to match NZ date */ 
    const dates = today.setDate(today.getDate() + numberOfDaysToAdd); 
    const todaysdate = new Date(dates).toISOString().split('T')[0] // convert the date to ISO string
    // ================================================================= //
    // console.log(todaysdate)

   const [values, setValues] = useState ({
        preferredName: "",
        lineOfBusiness: "",
        discipline: "",
        seniority: "",
        cycleStartDate: todaysdate,
        pushFrequency: "",
  })

  const handleChange = (e) => {
    setValues({
        ...values,
        [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      const userDetails = values
      
      const response = await fetch('/api/userDetails/details', {
        method: 'PUT',
        body: JSON.stringify(userDetails),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      
      if (response.ok) {
        //update Local Storage so that detailsCompletedStatus turns to True
        const user = JSON.parse(localStorage.getItem('user'))
        user["detailsCompletedStatus"] = true;
        localStorage.setItem('user', JSON.stringify(user));

        //navigate to dashboard route
        window.location.href = '/';
      }

    console.log("Congratulations you have successfully submitted your details!");
  }

  return (
    <div className="App">

      {/* FORM */}
      <form className="userDetailsForm" onSubmit={handleSubmit}>

        {/* form title */}
        <h2 className='title'>user details form</h2 >
        
        {/* Preferred name */}
        <label className="labels">Preferred Name:</label>
        <input required="yes" type="text" className="inputs" name='preferredName' value={values.preferredName} onChange={handleChange} />

        {/* Line of Business */}
        <label className="labels">Line of Business:</label>
        <input required="yes" type="text" className="inputs" name='lineOfBusiness' value={values.lineOfBusiness} onChange={handleChange}/>

        {/* Discipline */}
        <label className="labels">Discipline type:</label>
        <select className="selects" defaultValue={'DEFAULT'} id="disciplines">
          <option value="DEFAULT" disabled="yes" >None selected</option>
          <option name="disciplines" value={values.discipline}>Mechanical Engineer</option>
          <option name="disciplines" value={values.discipline}>Naval Architect</option>
          <option name="disciplines" value={values.discipline}>Other</option>
        </select>

        {/* seniority */}
        <label className="labels">Seniority:</label>
        <input required="yes" type="text" className="inputs" name='seniority' value={values.seniority} onChange={handleChange}/>

        {/* CPD start date */}
        <label className="labels">CPD submit date:</label>
        <input required="yes" type="date" className="inputs" name='cyclestartdate' value={values.cycleStartDate} onChange={handleChange} />

        {/* push notification */}
        <label className="labels">Push notification frequency:</label>
        <select className="selects" defaultValue={'DEFAULT'} id="pushnotifications" >
          <option value="default" disabled="yes" >None selected</option>
          <option name="notification" value={values.pushFrequency}>Fortnightly (every 2 weeks)</option>
          <option name="notification" value={values.pushFrequency}>Monthly</option>
          <option name="notification" value={values.pushFrequency}>Quaterly (every 3 months)</option>
          <option name="notification" value={values.pushFrequency}>Semi-annual (every 6 months)</option>
        </select>

        {/* Submit button */}
        <button className="submitButton" type='submit'>
          submit
          
        </button>
      </form>

    </div>
  );
}

export default UserDetailsForm;