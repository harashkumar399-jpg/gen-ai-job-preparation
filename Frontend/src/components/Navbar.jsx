import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'

const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false)
    const dropdownRef = useRef(null)
    const navigate = useNavigate()

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const onLogout = async () => {
        await handleLogout()
        navigate('/login')
    }

    const userInitial = user?.username ? user.username[0].toUpperCase() : 'U'

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            width: '100%',
            backgroundColor: 'rgba(22, 27, 34, 0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #2a3348',
            padding: '0.8rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
        }}>
            {/* Brand Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #ff2d78, #ff6b9d)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 12px rgba(255, 45, 120, 0.3)'
                }}>
                    AI
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#e6edf3', letterSpacing: '-0.5px' }}>
                    GenAI <span style={{ color: '#ff2d78' }}>Job Prep</span>
                </span>
            </Link>

            {/* Right Side: My Profile Dropdown */}
            {user && (
                <div ref={dropdownRef} style={{ position: 'relative' }}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{
                            background: isDropdownOpen ? '#1c2230' : '#161b22',
                            border: '1px solid #2a3348',
                            borderRadius: '30px',
                            padding: '6px 14px 6px 8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            outline: 'none'
                        }}
                    >
                        {/* Avatar Circle */}
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                            color: '#ffffff',
                            fontWeight: '700',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {userInitial}
                        </div>

                        <span style={{ color: '#e6edf3', fontWeight: '600', fontSize: '0.9rem' }}>
                            My Profile ({user.username})
                        </span>

                        <svg
                            style={{
                                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                            }}
                            xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7d8590" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>

                    {/* Dropdown Menu Card */}
                    {isDropdownOpen && (
                        <div style={{
                            position: 'absolute',
                            right: 0,
                            top: 'calc(100% + 10px)',
                            width: '260px',
                            backgroundColor: '#1c2230',
                            border: '1px solid #2a3348',
                            borderRadius: '12px',
                            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            zIndex: 1001,
                            animation: 'fadeIn 0.15s ease-out'
                        }}>
                            {/* Profile Header */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                paddingBottom: '12px',
                                borderBottom: '1px solid #2a3348'
                            }}>
                                <div style={{
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                                    color: '#ffffff',
                                    fontWeight: '700',
                                    fontSize: '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {userInitial}
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <div style={{ color: '#e6edf3', fontWeight: '700', fontSize: '1rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {user.username}
                                    </div>
                                    <div style={{ color: '#7d8590', fontSize: '0.82rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {user.email}
                                    </div>
                                </div>
                            </div>

                            {/* User Details Details Box */}
                            <div style={{
                                backgroundColor: '#161b22',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#7d8590' }}>Status:</span>
                                    <span style={{ color: '#10b981', fontWeight: '600' }}>Active Logged In</span>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={onLogout}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: '#fee2e2',
                                    color: '#991b1b',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'background 0.2s ease'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fca5a5'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar
