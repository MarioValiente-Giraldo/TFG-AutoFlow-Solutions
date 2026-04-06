import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AgendarCita from "./pages/AgendarCita"
import AdminDashboard from "./pages/AdminDashboard"
import ClienteDashboard from "./pages/ClienteDashboard"
import ProtectedRouteAuth from "./components/ProtectedRoutes/ProtectedRouteAuth"
import ProtectedRouteAdmin from "./components/ProtectedRoutes/ProtectedRouteAdmin"
import AutomatizacionDetalle from "./pages/AutomatizacionDetalle"
import PagoCompletado from "./pages/PagoCompletado"
import Servicios from "./pages/Servicios"

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
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
        <Route path="/pago-completado" element={<PagoCompletado />} />
        <Route
          path="/automatizacion/:id"
          element={
            <ProtectedRouteAuth>
              <AutomatizacionDetalle />
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
      </Route>
    </Routes>
  )
}

export default App
