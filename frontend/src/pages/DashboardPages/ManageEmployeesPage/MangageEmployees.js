import React from 'react'
import './manageemployees.scss'

import EmployeeTable from '../../../components/EmployeeTable/EmployeeTable.js'
import TeamProgressWheel from '../../../components/TeamProgressWheel/TeamProgressWheel.js'

const MangageEmployees = () => {
  return (
    <>
        <div className="pages">
            <div>
                <h3>Manage Employees</h3>
            <div className='EmployeeTable'>
            <EmployeeTable/>
            </div>
            </div>

          
          <div>
            <div>
              <h3>Team CPD Overview</h3>
            </div>
            <TeamProgressWheel />
          </div>
        </div>
    </>
  )
}

export default MangageEmployees