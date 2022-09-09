import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages and components
import Home from './pages/LandingPage/Home'
import Dashboard from './pages/Dashboard'
import Calendar from './pages/DashboardPages/Calendar'
import DashboardHome from './pages/DashboardPages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route 
              path="/login" 
              element={!user ? <Login/>: <Navigate to="/Dashboard"/>} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup/> : <Navigate to="/Dashboard"/>} 
            />
            <Route path='/Dashboard' element={user ? <Dashboard/> : <Navigate to="/login"/>}>
              <Route index element={<DashboardHome/>}></Route>
              {/* <Route path="/calendar" element={<Calendar/>}> </Route>
              <Route path="calendar" element={<Calendar/>}> </Route>
              <Route path="calendar" element={<Calendar/>}> </Route> */}
            </Route> 
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
