import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";
import { BiNews } from 'react-icons/bi';
import { BiCommentDetail } from 'react-icons/bi';
import { BiCalendar } from 'react-icons/bi';
import { BiReceipt } from 'react-icons/bi';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { BiCog } from 'react-icons/bi';
import { BiFile } from 'react-icons/bi';
import { BiLinkAlt } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import {HiOutlineUserGroup} from 'react-icons/hi'


import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from '../../hooks/useAuthContext'

const Sidebar = () => {
  const {user} = useAuthContext() 
  //   const { dispatch } = useContext(DarkModeContext);

  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <div className="sidebar">
      <div className="top">
          <span className="logo">
            <h1>CPD HUB</h1><MenuIcon className="logo-icon"/>
          </span>
      </div>
      <hr />
      <div className="center">
        <ul>

          <p className="title">MAIN</p>
          <Link to="" style={{textDecoration: "none"}}>
            <li>
              <BiNews className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">LISTS</p>
          <Link to="calendar" style={{ textDecoration: "none" }}>
            <li>
              <BiCalendar className="icon" />
              <span>Calendar</span>
            </li>
          </Link>

          <Link to="yearlyplan" style={{ textDecoration: "none" }}>
            <li>
              <BiCommentDetail className="icon" />
              <span>Yearly Plan</span>
            </li>
          </Link>

          <Link to="CPDSUMMARY" style={{ textDecoration: "none" }}>
            <li>
              <BiReceipt className="icon" />
              <span>CPD Summary</span>
            </li>
          </Link>

          <Link to="addcpd" style={{ textDecoration: "none" }}>
            <li>
              <BiMessageSquareAdd className="icon" />
              <span>Add CPD</span>
            </li>
          </Link>

          <Link to="settings" style={{ textDecoration: "none" }}>
            <li>
              <BiCog className="icon" />
              <span>Settings</span>
            </li>
          </Link>

          <p className="title">REFERENCES</p>
          <Link to="CPDTypePage" style={{ textDecoration: "none" }}>
            <li>
              <BiFile className="icon" />
              <span>CPD Types</span>
            </li>
          </Link>

          <Link to="CPDRecordingUserGuide" style={{ textDecoration: "none" }}>
            <li>
              <BiLinkAlt className="icon" />
              <span>Recording Guide</span>
            </li>
          </Link>

          { user.permission === 'admin' && (
            <>
              <p className="title">MANAGE TEAM</p>
              <Link to="CPDTypePage" style={{ textDecoration: "none" }}>
                <li>
                  <HiOutlineUserGroup className="icon" />
                  <span>Team Overview</span>
                </li>
              </Link>
            </>
          )}  
        </ul>
        <div className="bottom">
          <ul>
            <p className="title">USER</p>
            <Link to ="profile" style={{ textDecoration: "none" }}>
              <li>
                <AccountCircleOutlinedIcon className="icon" />
                <span>Profile</span>
              </li>
            </Link>
            <li onClick={handleClick} >
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
