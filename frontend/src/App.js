import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages and components
import Home from './pages/Home'
import Calendar from './pages/DashboardPages/Calendar'
import Dashboard from './pages/DashboardPages/Dashboard'
import NewUserInfo from './pages/DashboardPages/UserDetailsPage/UserDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>}>
              <Route index element={<Dashboard/>}></Route>
              <Route path="calendar" element={<Calendar/>}> </Route>
              {/* <Route path="calendar" element={<Calendar/>}> </Route>
              <Route path="calendar" element={<Calendar/>}> </Route> */}
              <Route path="NewUserInfo" element={<NewUserInfo/>}> </Route>
            </Route> 
            <Route 
              path="/login" 
              element={!user ? <Login/>: <Navigate to="/"/>} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup/> : <Navigate to="/"/>} 
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
