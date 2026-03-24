import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AgendarCita from "./pages/AgendarCita"
import AdminDashboard from "./pages/AdminDashboard"
import ClienteDashboard from "./pages/ClienteDashboard"
import ProtectedRouteAuth from "./components/ProtectedRoutes/ProtectedRouteAuth"
import ProtectedRouteAdmin from "./components/ProtectedRoutes/ProtectedRouteAdmin"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/agendar"
          element={
            <ProtectedRouteAuth>
              <AgendarCita />
            </ProtectedRouteAuth>
          }
        />
        <Route
          path="/dashboard/cliente"
          element={
            <ProtectedRouteAuth>
              <ClienteDashboard />
            </ProtectedRouteAuth>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRouteAuth>
              <ProtectedRouteAdmin>
                <AdminDashboard />
              </ProtectedRouteAdmin>
            </ProtectedRouteAuth>
          }
        />
      </Routes>
    </div>
  )
}

export default App
