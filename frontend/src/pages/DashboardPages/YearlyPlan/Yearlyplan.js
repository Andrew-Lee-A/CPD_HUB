import React, { useState } from 'react'
import './yearlyplan.scss'

export default function Yearlyplan() {

  const [values, setValues] = useState ({
    position: "",
    field: "",
  })

  const handleChange = (e) => {
    setValues({
        ...values,
        [e.target.name]: e.target.value,
    });
    console.log(e.target.value + ": "  + e.target.name)
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // write your backend code here Andrew ^_^ LMAO
  }
  
  return (
    <>
        <div className="YearlyplanOuterContainer">
          <form className='YearlyplanForm' onSubmit={onSubmit}>
              <h1>Yearly Plan Form</h1>
              <span>Kindly choose the position and field you'd be interested in below: </span>
            
              <label className='YPLabels'>Desired Position:</label>
              <select value={values.options} onChange={handleChange}>
                <option selected="selected" disabled="yes" >None selected:</option>
                <option class="options" value="Manager" >Manager</option>
                <option class="options" value="Project Manager" >Project Manager</option>
                <option class="options" value="Naval Architect" >Naval Architect</option>
                <option class="options" value="Mechanical Engineer" >Mechanical Engineer</option>
                <option class="options" value="Software Engineer" >Software Engineer</option>
              </select>
              
              <label className='YPLabels'>Desired Field:</label>
              <select value={values.options} onChange={handleChange}>
                <option selected="selected" disabled="yes">None selected:</option>
                <option class="options" value="" >option 1</option>
                <option class="options" value="" >option 2</option>
                <option class="options" value="" >option 3</option>
              </select>

              <button className='submitButton'>submit</button>
          </form>
        </div>
    </>
  )
}
