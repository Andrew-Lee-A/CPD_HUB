import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages and components
import Home from './pages/Home'
import NewUserInfo from './pages/NewUserDetailsPage/NewUserDetailsPage'
import Calendar from './pages/DashboardPages/Calendar'
import Dashboard from './pages/DashboardPages/Dashboard'
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
            <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>}>
              <Route index element={<Dashboard/>}></Route>
              <Route path="/calendar" element={<Calendar/>}> </Route>
              {/* <Route path="calendar" element={<Calendar/>}> </Route>
              <Route path="calendar" element={<Calendar/>}> </Route> */}
              <Route path="cpdTypePage" element={<CPDTypePage/>}></Route>
              <Route path="CPDRecordingUserGuide" element={<CPDRecordingUserGuide/>}></Route>
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
              element={<NewUserInfo/>}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
