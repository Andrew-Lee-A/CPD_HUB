import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages and components
import Home from './pages/Home'
import UserDetailsFormPage from './pages/UserDetailsFormPage/UserDetailsFormPage'
import Calendar from './pages/DashboardPages/CalendarPage/Calendar'
import AddCPD from './pages/DashboardPages/AddCPD'
import Dashboard from './pages/DashboardPages/Dashboard'
import Profile from './pages/DashboardPages/UserProfilePage/Profile'
import CPDsummary from './pages/DashboardPages/CPDsummary/Tabs'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CPDTypePage from './pages/DashboardPages/CPDTypePage/CPDTypePage'
import CPDRecordingUserGuide from './pages/DashboardPages/CPDRecordingUserGuide/CPDRecordingUserGuidePage'

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={user ? ((!user.detailsCompletedStatus)? <Navigate to="/userDetails"/>: <Home/>) : <Navigate to="/login"/>}>
              <Route index element={<Dashboard/>}></Route>
              <Route path="/calendar" element={<Calendar/>}> </Route>
              <Route path="/addcpd" element={<AddCPD/>}> </Route>
              <Route path="/profile" element={<Profile/>}> </Route>
              {/* <Route path="calendar" element={<Calendar/>}> </Route>
              <Route path="calendar" element={<Calendar/>}> </Route> */}
              <Route path="cpdTypePage" element={<CPDTypePage/>}></Route>
              <Route path="CPDRecordingUserGuide" element={<CPDRecordingUserGuide/>}></Route>
              <Route path="cpdsummary" element={<CPDsummary/>}></Route>
            </Route> 
            <Route 
              path="/login" 
              element={!user ? <Login/>: <Navigate to="/"/>} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup/> : <Navigate to="/"/>} 
            />
            <Route
              path="/userdetails"
              element={!user ? <Navigate to="/login"/> : (!user.detailsCompletedStatus) ? <UserDetailsFormPage/> : <Navigate to="/"/>}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
