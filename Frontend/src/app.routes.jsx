import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import LandingPage from "./features/interview/pages/LandingPage";
import { useAuth } from "./features/auth/hooks/useAuth";

const IndexRoute = () => {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <main className="loading-screen" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1117', color: '#e6edf3' }}>
                <h1>Loading...</h1>
            </main>
        )
    }

    if (user) {
        return (
            <Protected>
                <Home />
            </Protected>
        )
    }

    return <LandingPage />
}

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <IndexRoute />
    },
    {
        path: "/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    }
])