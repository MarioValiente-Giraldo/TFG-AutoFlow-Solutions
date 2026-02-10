import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRouteAuth from "./components/ProtectedRoutes/ProtectedRouteAuth"
import AgendarCitaForm from "./components/AgendarCita/AgendarCitaForm"

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
            <AgendarCitaForm />
          </ProtectedRouteAuth>
        }
        />
      </Routes>
    </div>
  )
}

export default App
