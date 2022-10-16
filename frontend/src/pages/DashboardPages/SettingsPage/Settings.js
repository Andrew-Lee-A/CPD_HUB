import React, { useState, createContext } from 'react'
import './settings.scss'
import useLocalStorage from 'use-local-storage';
import 'font-awesome/css/font-awesome.min.css';

/* 1) use-local-storage */
/* npm i use-local-storage */
/* localStorage is a web storage object that enables developers to store key-value pairs in a web browser and ensures that this data survives all page refreshes, 
even when a user closes or restarts a browser - and it has no expiration date. */

/* 2) font awesome icon */
/* npm install --save font-awesome  */
/* npm i --save @fortawesome/react-fontawesome@latest */

export default function Settings() {

  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'grey');

  const switchTheme = () => {
    const newTheme = theme === 'grey' ? 'dark' : 'grey';
    setTheme(newTheme);
  };
  
  return (
    <>
      <div className="settingsContainer" data-theme={theme}>

        <div className="theme-toggle">

          {/* light and dark mode toggler */}
          <h3>Grey mode</h3>
          <i class='fa fa-toggle-on icon-2x' onClick={switchTheme}></i>
          {/* <i className="fa fa-spinner fa-spin">no spinner but why</i> */}
        </div>
      </div>
    </>
  )
}
