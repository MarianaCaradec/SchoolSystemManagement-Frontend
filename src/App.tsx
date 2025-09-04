import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import LogIn from "./pages/LogIn";
import Registration from "./pages/Registration";
import CompleteProfile from "./pages/CompleteProfile";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div className="bg-[#161032] h-screen w-full text-white">
      <BrowserRouter>
        <AuthContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
