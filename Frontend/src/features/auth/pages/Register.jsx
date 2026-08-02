import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")
    const [ successMsg, setSuccessMsg ] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccessMsg("")

        if (!username || !email || !password) {
            setError("Please fill in all fields.")
            return
        }

        const res = await handleRegister({ username, email, password })
        if (res && res.success) {
            setSuccessMsg("✓ User registered successfully! Redirecting...")
            setTimeout(() => {
                navigate("/")
            }, 1500)
        } else {
            setError(res?.error || "Registration failed. Please try again.")
        }
    }

    if (loading) {
        return (<main><h1>Loading...</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                {successMsg && (
                    <div style={{
                        padding: "12px 16px",
                        backgroundColor: "#dcfce7",
                        color: "#15803d",
                        border: "1px solid #86efac",
                        borderRadius: "6px",
                        marginBottom: "16px",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        textAlign: "center"
                    }}>
                        {successMsg}
                    </div>
                )}

                {error && (
                    <div style={{
                        padding: "10px 14px",
                        backgroundColor: "#fee2e2",
                        color: "#991b1b",
                        borderRadius: "6px",
                        marginBottom: "16px",
                        fontSize: "0.9rem"
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" id="username" name='username' placeholder='Enter username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>

                    <button type="submit" className='button primary-button'>Register</button>
                </form>

                <p style={{ marginTop: "16px" }}>Already have an account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register