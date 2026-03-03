import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AgendarCita from "./pages/AgendarCita"
import ProtectedRouteAuth from "./components/ProtectedRoutes/ProtectedRouteAuth"

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
      </Routes>
    </div>
  )
}

export default App
