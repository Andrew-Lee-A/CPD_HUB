import React from 'react'
import './manageemployees.scss'

import EmployeeTable from '../../../components/EmployeeTable/EmployeeTable.js'
import ProgressWheel from '../../../components/ProgressWheel'

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
            <ProgressWheel />
          </div>
        </div>
    </>
  )
}

export default MangageEmployees