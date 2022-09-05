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

import { useLogout } from "../../hooks/useLogout";

const Sidebar = () => {
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
          <Link to="/" style={{textDecoration: "none"}}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/calendar" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Calendar</span>
            </li>
          </Link>
          <Link to="/yearlyplan" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Yearly Plan</span>
            </li>
          </Link>
          <Link to="/CPDSUMMARY" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>CPD Summary</span>
            </li>
          </Link>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
        </ul>
        <div className="bottom">
          <ul>
            <p className="title">USER</p>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Change User</span>
            </li>
            <li>
              <ExitToAppIcon className="icon" />
              <span onClick={handleClick}>Logout</span>
            </li>
          </ul>
          {/* <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
