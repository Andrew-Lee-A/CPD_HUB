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
        prefferedName: "",
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
    console.log(e.target.value + ": "  + e.target.name)
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
        user["prefferedName"] = values.prefferedName;
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
        <input required="yes" type="text" className="inputs" name='prefferedName' value={values.preferredName} onChange={handleChange} />

        {/* Line of Business */}
        <label className="labels">Line of Business:</label>
        {/* <input required="yes" type="text" className="inputs" name='lineOfBusiness' value={values.lineOfBusiness} onChange={handleChange}/> */}
        <select className="selects" required="yes" value={values.lineOfBusiness} name="lineOfBusiness" onChange={handleChange}>
          <option selected="selected" value="" disabled="yes">None selected</option>
          <option className='options' name="discipline" value="Marketing">Marketing</option>
          <option className='options' name="discipline" value=""></option>
          <option className='options' name="discipline" value=""></option>
        </select>

        {/* Discipline */}
        <label className="disciplineLabel">Discipline type:</label>
        <select className="selects" required="yes" value={values.discipline} name="discipline" onChange={handleChange}>
          <option selected="selected" value="" disabled="yes">None selected</option>
          <option className='options' name="discipline" value="Mechnical Engineer">Mechanical Engineer</option>
          <option className='options' name="discipline" value="Naval Architect">Naval Architect</option>
        </select>

        {/* Seniority */}
        <label className="labels">Seniority:</label>
        <select className="selects" required="yes" value={values.seniority} name="seniority" onChange={handleChange}>
          <option selected="selected" value="" disabled="yes">None selected</option>
          <option className='options' name="discipline" value="Junior">Junior</option>
          <option className='options' name="discipline" value="Senior">Senior</option>
        </select>
        
        {/* CPD start date */}
        <label className="labels">CPD submit date:</label>
        <input required="yes" type="date" className="inputs" name='cycleStartDate' value={values.cycleStartDate} onChange={handleChange} />

        {/* push notification */}
        <label className="PNFLabels">Push notification frequency:</label>
        <select className="selects" required="yes" value={values.pushFrequency} name="pushFrequency" onChange={handleChange}>
          <option  selected="selected" value="" disabled="yes" >None selected</option>
          <option  className='options' name="pushFrequency" value="Fortnightly (every 2 weeks)">Fortnightly (every 2 weeks)</option>
          <option  className='options' name="pushFrequency" value="Monthly">Monthly</option>
          <option  className='options' name="pushFrequency" value="Quartly (every 3 months)">Quaterly (every 3 months)</option>
          <option  className='options' name="pushFrequency" value="Semi-annual (every 6 months)">Semi-annual (every 6 months)</option>
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