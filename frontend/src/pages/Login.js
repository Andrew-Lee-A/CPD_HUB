import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

import './LoginAndSignup.scss'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>

            <div className="loginContainer">
                <h2>Log in</h2>
                {/* <hr/> */}

                <label className='emailLabel'>Email address</label>
                <input
                    type="emailInput"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label className='passwordLabel'>Password</label>
                <input
                    className='passwordInput'
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button disabled={isLoading}>Log in</button>
                {error && <div className="error">{error}</div>}

                <a className='forgetpassword' href='/forgetpassword' >Forgot password?</a> <hr></hr>
                <span className='span' >new to cpd hub?<a href="/signup"> Get connected</a> </span>
            </div>

        </form>
    )
}

export default Login