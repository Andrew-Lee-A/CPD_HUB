import './Home.scss';
import { Link } from 'react-router-dom';

import React from 'react'

export default function Home() {
  return (
    <>
      <div className="landingPageHomeContainer">

        {/* Navigation bar component */}
        <div className="navbarContainer">
          <div className="navbar">

            <div className="babcockContainer">
              CPD Hub
            </div>

            <div className="navbarOptionsContainer">

              <div className="About">
                About
              </div>

              <div className="contactUs">
                Contact us
              </div>
              
            </div>

            <div className="loginAndSignUpButtonsContainer">

                  <Link to="/login">
                    <div className="login">Log in</div>
                  </Link>

                  <Link to="/signup">
                    <div className="getConnected">Get Connected</div>
                  </Link>
            </div>
          </div>
        </div>

        {/* bottomContainer */}
        <div className="bottomContainer">
          <div className="titleAndSubTitleContainer">
            <h1>Webinar Tracker</h1>
            <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit numquam ab officiis corporis ipsam voluptatem doloremque nobis culpa, est debitis eius nulla quis, sequi laboriosam sit veniam rem veritatis. Autem.</h3>
          </div>

          <div className="pictureContainer">
          </div>
        </div>

      </div>
    </>
  )
}

