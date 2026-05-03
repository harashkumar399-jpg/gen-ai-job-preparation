import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"

function App() {


  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  ) // wrapping the entire app with AuthProvider to make the auth context available throughout the app.. now there will acces to user, setUser, loading, setLoading in any component that is wrapped by AuthProvider
}

export default App
