import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const {user} = useAuthContext()

    return (
        <header>
            <div className="container">
                { user.permission === 'admin'?(
                    <Link to="">
                        <h1>Admin Dashboard</h1>
                    </Link>
                ) : (
                    <Link to="">
                        <h1>User Dashboard</h1>
                    </Link>
                )
                }
                <nav>
                    {user ? (
                        <div>
                            
                            Welcome {user.prefferedName}!
                            {/* <button onClick={handleClick}> Log out</button> */}
                            
                        </div>
                    ):(
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar