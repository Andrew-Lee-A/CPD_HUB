import { useEffect } from "react";
import { useCpdEventsContext } from "../hooks/useCpdEventsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Outlet } from "react-router-dom";

// components
import WorkoutDetails from "../components/CpdEventDetails";
import WorkoutForm from "../components/CpdEventForm";
import ProgressBar from "../components/ProgressBar";
import Sidebar from "../components/Sidebar/Sidebar.js";
import Navbar from "../components/Navbar.js";


const Home = () => {
  const { cpdEvents, dispatch } = useCpdEventsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/cpdEvents", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CPDEVENTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Outlet/>
      </div>
    </div>
  );
};

export default Home;
