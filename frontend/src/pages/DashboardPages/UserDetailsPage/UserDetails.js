import React, { useState } from 'react';
import './UserDetailsStyle.css';

function UserDetailsForm() {

   const [values, setValues] = useState ({
        preferredname: "",
        email: "",
        lineofbusiness: "",
        disciplines: "",
        seniority: "",
        cyclestartdate: "",
        notification: "",
  })

  const handleChange = (e) => {
    setValues({
        ...values,
        [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Congratulations you have successfully submitted your details!");
  }

  /* to set the default date to the current date instead of showing the yyyy-mm-dd */
  const today = new Date();
  const numberOfDaysToAdd = 1; /* add 1 to match NZ date */ 
  const dates = today.setDate(today.getDate() + numberOfDaysToAdd); 
  const todaysdate = new Date(dates).toISOString().split('T')[0] // convert the date to ISO string
  // ================================================================= //
  // console.log(todaysdate)

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <div className="UserDetailsFormContainer">

      {/* FORM */}
      <form className="userDetailsForm" onSubmit={handleSubmit}>

        {/* form title */}
        <h2 className='title'>user details form</h2 >
        
        {/* Preferred name */}
        <label className="labels">Preferred Name:</label>
        <input required="yes" type="text" className="inputs" name='preferredname' value={values.preferredname} onChange={handleChange} />

        {/* Line of Business */}
        <label className="labels">Line of Business:</label>
        <input required="yes" type="text" className="inputs" name='lineofbusiness' value={values.lineofbusiness} onChange={handleChange}/>

        {/* Discipline */}
        <label className="labels">Discipline type:</label>
        <select className="selects" id="disciplines">
          <option selected value="" disabled="yes" >None selected</option>
          <option name="disciplines" value={values.disciplines}>Mechanical Engineer</option>
          <option name="disciplines" value={values.disciplines}>Naval Architect</option>
          <option name="disciplines" value={values.disciplines}>Other</option>
        </select>

        {/* seniority */}
        <label className="labels">Seniority:</label>
        <input required="yes" type="text" className="inputs" name='seniority' value={values.seniority} onChange={handleChange}/>

        {/* CPD start date */}
        <label className="labels">CPD submit date:</label>
        <input required="yes" type="date" className="inputs" name='cyclestartdate' value={values.cyclestartdate} onChange={handleChange} defaultValue={date}/>

        {/* push notification */}
        <label className="labels">Push notification frequency:</label>
        <select className="selects" id="pushnotifications" >
          <option selected value="" disabled="yes" >None selected</option>
          <option name="notification" value={values.notification}>Fortnightly (every 2 weeks)</option>
          <option name="notification" value={values.notification}>Monthly</option>
          <option name="notification" value={values.notification}>Quaterly (every 3 months)</option>
          <option name="notification" value={values.notification}>Semi-annual (every 6 months)</option>
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
