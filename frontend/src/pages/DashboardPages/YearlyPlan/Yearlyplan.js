import React from 'react'
import './yearlyplan.scss'

export default function Yearlyplan() {
  return (
    <>
        <div className="YearlyplanOuterContainer">
          <form className='YearlyplanForm'>
              <h1>Yearly Plan Form</h1>
              <span>Kindly choose the position and field you'd be interested in below: </span>
            
              <label className='YPLabels'>Desired Position:</label>
              <select>
                <option selected="selected" disabled="yes" >None selected:</option>
                <option>Manager</option>
                <option>Project Manager</option>
                <option>Naval Architect</option>
                <option>Mechanical Engineer</option>
                <option>Software Engineer</option>
              </select>
              
              <label className='YPLabels'>Desired Field:</label>
              <select>
                <option selected="selected" disabled="yes">None selected:</option>
                <option>option 1</option>
                <option>option 2</option>
                <option>option 3</option>
              </select>

              <button className='submitButton'>submit</button>
          </form>
        </div>
    </>
  )
}
