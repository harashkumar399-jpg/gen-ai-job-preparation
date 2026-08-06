import React from 'react'
import { Link, useNavigate } from 'react-router'
import Navbar from '../../../components/Navbar'

const LandingPage = () => {
    const navigate = useNavigate()

    const scrollToSample = () => {
        const el = document.getElementById('sample-report-section')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0d1117', color: '#e6edf3', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            {/* Top Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section style={{
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '5rem 1.5rem 4rem 1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
            }}>
                {/* Tagline Badge */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(255, 45, 120, 0.1)',
                    border: '1px solid rgba(255, 45, 120, 0.3)',
                    color: '#ff6b9d',
                    padding: '6px 16px',
                    borderRadius: '30px',
                    fontSize: '0.88rem',
                    fontWeight: '600'
                }}>
                    ⚡ Next-Gen AI Interview Preparation
                </div>

                {/* Main Hero Headline */}
                <h1 style={{
                    fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                    fontWeight: '800',
                    lineHeight: '1.15',
                    letterSpacing: '-1px',
                    color: '#ffffff',
                    maxWidth: '900px',
                    margin: 0
                }}>
                    AI-Powered Job Prep: Land <span style={{
                        background: 'linear-gradient(135deg, #ff2d78, #ff6b9d)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>3X More Interviews</span>
                </h1>

                {/* Subtitle */}
                <p style={{
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                    color: '#94a3b8',
                    maxWidth: '720px',
                    lineHeight: '1.65',
                    margin: 0
                }}>
                    Save hours of generic preparation, pinpoint your skill gaps against any job description, and get AI-tailored strategies that put you steps ahead of other candidates.
                </p>

                {/* Hero CTA Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '1rem' }}>
                    <button
                        onClick={() => navigate('/register')}
                        style={{
                            padding: '14px 32px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #ff2d78, #ff6b9d)',
                            color: '#ffffff',
                            fontWeight: '700',
                            fontSize: '1.05rem',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 6px 20px rgba(255, 45, 120, 0.4)',
                            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Get Started Free &rarr;
                    </button>

                    <button
                        onClick={scrollToSample}
                        style={{
                            padding: '14px 28px',
                            borderRadius: '8px',
                            backgroundColor: '#161b22',
                            color: '#e6edf3',
                            fontWeight: '600',
                            fontSize: '1rem',
                            border: '1px solid #2a3348',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = '#ff2d78'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = '#2a3348'}
                    >
                        View Sample Report &darr;
                    </button>
                </div>
            </section>

            {/* Feature Cards Grid */}
            <section style={{
                maxWidth: '1100px',
                margin: '0 auto 5rem auto',
                padding: '0 1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
            }}>
                <div style={{
                    backgroundColor: '#161b22',
                    border: '1px solid #2a3348',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <div style={{ fontSize: '2rem' }}>⏱️</div>
                    <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>Save 10+ Hours Per Role</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                        Stop manually scouring the web for interview questions. Instantly extract required skills and interview questions tailored to any job posting.
                    </p>
                </div>

                <div style={{
                    backgroundColor: '#161b22',
                    border: '1px solid #2a3348',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <div style={{ fontSize: '2rem' }}>🎯</div>
                    <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>Pinpoint Match Score & Gaps</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                        Know exactly how well your resume matches the job description before you apply, and fix missing keywords recruiters look for.
                    </p>
                </div>

                <div style={{
                    backgroundColor: '#161b22',
                    border: '1px solid #2a3348',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <div style={{ fontSize: '2rem' }}>🚀</div>
                    <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>Stand Out From Candidates</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                        Get a step-by-step personalized preparation roadmap with expert technical and behavioral answers that wow interviewers.
                    </p>
                </div>
            </section>

            {/* Sample Report Section (Image 3 Reference) */}
            <section id="sample-report-section" style={{
                backgroundColor: '#161b22',
                borderTop: '1px solid #2a3348',
                borderBottom: '1px solid #2a3348',
                padding: '5rem 1.5rem'
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ color: '#ff2d78', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Live Report Preview
                    </div>
                    <h2 style={{ fontSize: '2.2rem', color: '#ffffff', margin: '10px 0 16px 0', fontWeight: '800' }}>
                        Real Sample AI Interview Report
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
                        Here is an interactive preview of the comprehensive interview strategy report generated by our AI platform.
                    </p>

                    {/* Sample Report UI Card */}
                    <div style={{
                        backgroundColor: '#1c2230',
                        border: '1px solid #2a3348',
                        borderRadius: '16px',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                        textAlign: 'left',
                        overflow: 'hidden'
                    }}>
                        {/* Report Header Bar */}
                        <div style={{
                            backgroundColor: '#0d1117',
                            padding: '16px 24px',
                            borderBottom: '1px solid #2a3348',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <div>
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Resume Scan & Match Results</div>
                                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.2rem' }}>
                                    Netflix &bull; Product Manager / Senior Developer
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <span style={{ backgroundColor: '#161b22', border: '1px solid #2a3348', color: '#94a3b8', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                                    PDF Generated
                                </span>
                                <button onClick={() => navigate('/register')} style={{ backgroundColor: '#ff2d78', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>
                                    Try With Your Resume
                                </button>
                            </div>
                        </div>

                        {/* Report Body Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 1fr) 2.5fr', gap: '1px', backgroundColor: '#2a3348' }}>
                            {/* Left Column: Match Rate Dial */}
                            <div style={{ backgroundColor: '#1c2230', padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
                                <h4 style={{ margin: 0, color: '#94a3b8', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Match Rate</h4>
                                
                                {/* Ring Indicator */}
                                <div style={{
                                    width: '130px',
                                    height: '130px',
                                    borderRadius: '50%',
                                    background: 'conic-gradient(#10b981 0% 76%, #2a3348 76% 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        width: '102px',
                                        height: '102px',
                                        borderRadius: '50%',
                                        backgroundColor: '#1c2230',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <span style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981' }}>76%</span>
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>High Match</span>
                                    </div>
                                </div>

                                {/* Skill Progress Indicators */}
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                                            <span style={{ color: '#e6edf3' }}>Searchability</span>
                                            <span style={{ color: '#10b981', fontWeight: '600' }}>1 issue to fix</span>
                                        </div>
                                        <div style={{ height: '6px', backgroundColor: '#2a3348', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: '85%', height: '100%', backgroundColor: '#10b981' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                                            <span style={{ color: '#e6edf3' }}>Hard Skills</span>
                                            <span style={{ color: '#eab308', fontWeight: '600' }}>2 issues to fix</span>
                                        </div>
                                        <div style={{ height: '6px', backgroundColor: '#2a3348', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: '70%', height: '100%', backgroundColor: '#eab308' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                                            <span style={{ color: '#e6edf3' }}>Soft Skills</span>
                                            <span style={{ color: '#10b981', fontWeight: '600' }}>5 issues to fix</span>
                                        </div>
                                        <div style={{ height: '6px', backgroundColor: '#2a3348', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: '90%', height: '100%', backgroundColor: '#10b981' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Searchability & Questions Preview */}
                            <div style={{ backgroundColor: '#161b22', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                        <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.25rem' }}>Searchability &amp; ATS Check</h3>
                                        <span style={{ backgroundColor: '#2d4a7a', color: '#93c5fd', fontSize: '0.75rem', fontWeight: '600', padding: '2px 8px', borderRadius: '4px' }}>IMPORTANT</span>
                                    </div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                                        Below is how well your resume parsed against the job description. Fix the missing keywords to ensure your resume reaches the recruiter.
                                    </p>
                                </div>

                                {/* Check Items List */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#1c2230', padding: '16px', borderRadius: '8px', border: '1px solid #2a3348' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#e6edf3' }}>
                                        <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                                        <span>Provided physical address &amp; valid contact information</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#e6edf3' }}>
                                        <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                                        <span>Matched core technical stack (React, Node.js, System Architecture)</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#f87171' }}>
                                        <span style={{ fontWeight: 'bold' }}>✕</span>
                                        <span>Missing Keywords: <strong>Microservices Governance, GraphQL, Docker Optimization</strong></span>
                                    </div>
                                </div>

                                {/* Technical Questions Sample */}
                                <div>
                                    <h4 style={{ color: '#ff6b9d', margin: '0 0 10px 0', fontSize: '1rem' }}>Generated Technical Questions Preview</h4>
                                    <div style={{ backgroundColor: '#1c2230', padding: '14px', borderRadius: '8px', border: '1px solid #2a3348', fontSize: '0.9rem' }}>
                                        <div style={{ fontWeight: '600', color: '#818cf8', marginBottom: '4px' }}>Q1: How do you optimize API database queries under high concurrency?</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}><strong>Model Answer:</strong> Use connection pooling, index frequently queried columns, and implement Redis caching for read-heavy operations...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA Banner */}
            <section style={{
                maxWidth: '900px',
                margin: '5rem auto',
                padding: '3rem 1.5rem',
                textAlign: 'center',
                backgroundColor: '#161b22',
                border: '1px solid #2a3348',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
            }}>
                <h2 style={{ fontSize: '2rem', color: '#ffffff', margin: 0, fontWeight: '800' }}>
                    Ready to Ace Your Next Interview?
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '550px', margin: 0, lineHeight: '1.6' }}>
                    Join thousands of candidates who cut their prep time in half and landed their dream roles.
                </p>
                <button
                    onClick={() => navigate('/register')}
                    style={{
                        marginTop: '10px',
                        padding: '14px 36px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #ff2d78, #ff6b9d)',
                        color: '#ffffff',
                        fontWeight: '700',
                        fontSize: '1.05rem',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 6px 20px rgba(255, 45, 120, 0.4)',
                        transition: 'transform 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    Create Your Interview Strategy Now &rarr;
                </button>
            </section>

            {/* Footer */}
            <footer style={{
                backgroundColor: '#0d1117',
                borderTop: '1px solid #2a3348',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                color: '#7d8590',
                fontSize: '0.88rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
            }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</a>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Help Center</a>
                </div>
                <div>&copy; {new Date().getFullYear()} GenAI Job Preparation. All rights reserved.</div>
            </footer>
        </div>
    )
}

export default LandingPage
