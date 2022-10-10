import "./sidebar.scss";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from "react";

/* Icons */
import { BiCog } from 'react-icons/bi';
import { BiCommentDetail } from 'react-icons/bi';
import { BiNews } from 'react-icons/bi';
import { BiReceipt } from 'react-icons/bi';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { BiFile } from 'react-icons/bi';
import { BiLinkAlt } from 'react-icons/bi';
import { BiCalendar } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

// import { useLogout } from "../../hooks/useLogout";
// import { display } from "@mui/system";

const Sidebar = ({ open, setOpen, ...props}) => {
  //   const { dispatch } = useContext(DarkModeContext);

  // const { logout } = useLogout();

  // const handleClick = () => {
  //   logout();
  // };

  /* variables that are used for hamburger menu */
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  /* lists of sidebar menu */
  const listComponents = [
    {
      path: "/",
      name: "Dashboard",
      icon: <BiNews/>
    },
   
  ]

  const listComponentsTwo = [
    {
      path: "/calendar",
      name: "Calendar",
      icon: <BiCalendar/>
    },
    {
      path: "/yearlyplan",
      name: "Yearly Plan",
      icon: <BiCommentDetail/>
    },
    {
      path: "/CPDSUMMARY",
      name: "CPD Summary",
      icon: <BiReceipt/>
    },
    {
      path: "/addcpd",
      name: "Add CPD",
      icon: <BiMessageSquareAdd/>
    },
    {
      path: "/settings",
      name: "Settings",
      icon: <BiCog/>
    },
  ]

  const listComponentsThree = [
    {
      path: "/CPDTypePage",
      name: "CPD Type",
      icon: <BiFile/>
    },
    {
      path: "/CPDRecordingUserGuide",
      name: "Recording Guide",
      icon: <BiLinkAlt/>
    },
  ]
  
  const listComponentsFour = [
    {
      path: "/profile",
      name: "Profile",
      icon: <AccountCircleOutlinedIcon/>
    },
    {
      // path: onclick={handleClick},
      path: "/login",
      name: "Logout",
      icon: <ExitToAppIcon/>
    },
  ] 

  return (
    <div  style={{width: isOpen ? "260px" : "60px"}} className="sidebar" >

      {/* this contains hamburger menu and CPD HUB name */}
      <div className="top">

          <div style={{marginLeft: isOpen ? "17px" : "17px"}} className="HamburgerContainer" >
              <FaBars className="hamburgerIcon" onClick={toggle}/>
          </div>

          <div className="logo" style={{display: isOpen ? "block" : "none"}} >
            <h1>CPD HUB</h1> {/* <MenuIcon className="logo-icon"/> */}
          </div>

      </div>

      {/* Horizontal line */}
      <hr />

      {/* MAIN */}
      <p className="mainTitle" style={{display: isOpen ? "block" : "none"}}>MAIN</p>
      {
        listComponents.map((component, index) => (
          <Link
            to={component.path}
            key={index}
            className="Link"
            activeclassName="active">

              <div className="icon">{component.icon}</div>
              <div className="link_text" style={{display: isOpen ? "block" : "none"}}>{component.name}</div>

          </Link>
        ))
      }

      {/* LISTS */}
      <p className="title" style={{display: isOpen ? "block" : "none"}}>LISTS</p>
      {
        listComponentsTwo.map((component, index) => (
          <Link
            to={component.path}
            key={index}
            className="Link"
            activeclassName="active">

              <div className="icon">{component.icon}</div>
              <div className="link_text" style={{display: isOpen ? "block" : "none"}}>{component.name}</div>

          </Link>
        ))
      }

      {/* REFERENCES */}
      <p className="title" style={{display: isOpen ? "block" : "none"}}>REFERENCES</p>
      {
        listComponentsThree.map((component, index) => (
          <Link
            to={component.path}
            key={index}
            className="Link"
            activeclassName="active">

              <div className="icon">{component.icon}</div>
              <div className="link_text" style={{display: isOpen ? "block" : "none"}}>{component.name}</div>

          </Link>
        ))
      }

      {/* USER */}
      <p className="title" style={{display: isOpen ? "block" : "none"}}>USER</p>
      {
        listComponentsFour.map((component, index) => (
          <Link
            to={component.path}
            key={index}
            className="Link"
            activeclassName="active">

              <div className="icon">{component.icon}</div>
              <div className="link_text" style={{display: isOpen ? "block" : "none"}}>{component.name}</div>

          </Link>
        ))
      }


      {/* <div className="center">
        <ul>
          <p className="title">MAIN</p>

          <Link to="/" style={{textDecoration: "none"}}>
          <li>
            <BiNews className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>

          <p className="title">LISTS</p>

          <Link to="/calendar" style={{ textDecoration: "none" }}>
            <li>
              <BiCalendar className="icon"/>
              <span>Calendar</span>
            </li>
          </Link>

          <Link to="/yearlyplan" style={{ textDecoration: "none" }}>
            <li>
              <BiCommentDetail className="icon" />
              <span>Yearly Plan</span>
            </li>
          </Link>

          <Link to="/CPDSUMMARY" style={{ textDecoration: "none" }}>
            <li>
              <BiReceipt className="icon" />
              <span>CPD Summary</span>
            </li>
          </Link>

          <Link to="/addcpd" style={{ textDecoration: "none" }}>
            <li>
              <BiMessageSquareAdd className="icon" />
              <span>Add CPD</span>
            </li>
          </Link>

          <Link to="/settings" style={{ textDecoration: "none" }}>
            <li>
              <BiCog className="icon" />
              <span>Settings</span>
            </li>
          </Link>

          <p className="title">REFERENCES</p>
          <Link to="/CPDTypePage" style={{ textDecoration: "none" }}>
            <li>
              <BiFile className="icon" />
              <span>CPD Types</span>
            </li>
          </Link>

          <Link to="/CPDRecordingUserGuide" style={{ textDecoration: "none" }}>
            <li>
              <BiLinkAlt className="icon" />
              <span>Recording Guide</span>
            </li>
          </Link>
        </ul>

        <div className="bottom">
          <ul>
            <p className="title">USER</p>

            <Link to ="/profile" style={{ textDecoration: "none" }}>
              <li>
                <AccountCircleOutlinedIcon className="icon" />
                <span>Profile</span>
              </li>
            </Link>

            <li>
              <ExitToAppIcon className="icon" />
              <span onClick={handleClick}>Logout</span>
            </li>
          </ul>
         
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
