
import { Outlet } from "react-router-dom";

// components

import Sidebar from "../components/Sidebar/Sidebar.js";
import Navbar from "../components/Navbar";

const Home = () => {
  // const { user } = useAuthContext();
  // // const { cpdEvents, dispatch } = useCpdEventsContext();

  // // useEffect(() => {
  // //   const fetchWorkouts = async () => {
  // //     const response = await fetch("/api/cpdEvents", {
  // //       headers: {
  // //         Authorization: `Bearer ${user.token}`,
  // //       },
  // //     });
  // //     const json = await response.json();

  // //     if (response.ok) {
  // //       dispatch({ type: "SET_CPDEVENTS", payload: json });
  // //     }
  // //   };

  // //   if (user) {
  // //     fetchWorkouts();
  // //   }
  // // }, [dispatch, user]);

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
