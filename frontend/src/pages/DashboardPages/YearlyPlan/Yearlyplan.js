import React, { useState } from 'react'
import './yearlyplan.scss'
import { FcExpand } from "react-icons/fc";

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
            
              {/* Desired position */}
              <label className='YPLabels'>Desired Position:</label>
              <select className='selects' name="position" value={values.position} onChange={handleChange}>
                <option selected="selected" disabled="yes" >None selected:</option>
                <option name="position" value="Manager" >Manager</option>
                <option name="position" value="Architect" >Architect</option>
                <option name="position" value="Engineer" >Engineer</option>
              </select>
              
              {/* Desired field */}
              <label className='YPLabels'>Desired Field:</label>
              <select className='selects' name="field" value={values.field} onChange={handleChange}>
                <option selected="selected" disabled="yes">None selected:</option>
                <option name="field"value="Naval" >Naval</option>
                <option name="field"value="Mechanical" >Mechanical</option>
                <option name="field"value="Software" >Software</option>
                <option name="field"value="Marketing" >Marketing</option>
                <option name="field"value="Construction">Construction</option>
              </select>

              <button className='submitButton'>submit</button>
          </form>

          <div className="yearlyplanview">
            <div className="downArrow">
              <FcExpand/>
            </div>
          </div>
        </div>
    </>
  )
}
