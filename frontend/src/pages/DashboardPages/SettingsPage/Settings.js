import React, { useState } from 'react'
import './settings.scss'
// import useLocalStorage from 'use-local-storage';
// import 'font-awesome/css/font-awesome.min.css';

/* 1) use-local-storage */
/* npm i use-local-storage */
/* localStorage is a web storage object that enables developers to store key-value pairs in a web browser and ensures that this data survives all page refreshes, 
even when a user closes or restarts a browser - and it has no expiration date. */

/* 2) font awesome icon */
/* npm install --save font-awesome  */
/* npm i --save @fortawesome/react-fontawesome@latest */

export default function Settings() {

 const [darkMode, setDarkMode] = useState(false);
  
  return (
    <>
      {/* <div className={darkMode ? "dark-mode" : "body"}>
        <div className="container">
          <span style={{ color: darkMode ? "grey" : "yellow"}} >*</span>
            <div className='switch-checkbox'>
                <label className='switch'>
                  <input 
                    type="checkbox"
                    checked={darkMode} 
                    onChange={() => setDarkMode(!darkMode)} />
                  <span className='slider round'></span>
                </label>  
            </div>
            <span style={{ color: darkMode ? "#c96dfd" : "grey"}}></span>
        </div>
      </div> */}
     
    </>
  )
}
