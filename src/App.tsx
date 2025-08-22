import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import LogIn from "./pages/LogIn";
import Registration from "./pages/Registration";
import CompleteProfile from "./pages/CompleteProfile";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route
              path="/teacher/dashboard"
              element={<h1>Welcome to the Teacher Dashboard!</h1>}
            />
            <Route
              path="/admin/dashboard"
              element={<h1>Welcome to the Admin Dashboard!</h1>}
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
