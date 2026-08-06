import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const successMsg = location.state?.message

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Please provide both email and password.")
            return
        }

        setIsSubmitting(true)
        try {
            const res = await handleLogin({ email, password })
            if (res && res.success) {
                navigate('/')
            } else {
                setError(res?.error || "Login failed. Please check your credentials.")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return (<main><h1>Loading...</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

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
                    <button type="submit" disabled={isSubmitting} className='button primary-button'>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p style={{ marginTop: "16px" }}>Don't have an account? <Link to={"/register"}>Register</Link></p>
            </div>
        </main>
    )
}

export default Login