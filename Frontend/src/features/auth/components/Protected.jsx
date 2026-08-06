import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'
import Navbar from "../../../components/Navbar";

const Protected = ({children}) => {
    const { loading, user } = useAuth()

    if(loading){
        return (<main className="loading-screen" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1117', color: '#e6edf3' }}><h1>Loading...</h1></main>)
    }

    if(!user){
        return <Navigate to={'/login'} replace />
    }
    
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0d1117' }}>
            <Navbar />
            {children}
        </div>
    )
}

export default Protected