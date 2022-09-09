import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import './navbar.scss'

const Navbar = () => {

    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {
        logout()
    }
    return (
        <div className="navheader">
            <div className="container">
                <Link to="/">
                    <h1>CPD HUB</h1>
                </Link>
                <nav>
                    {user ? (
                        <div>
                            Welcome {user.email}
                            <button onClick={handleClick}> Log out</button>
                        </div>
                    ):(
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    )
}

export default Navbar