import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import LogIn from "./pages/LogIn";
import Registration from "./pages/Registration";
import CompleteProfile from "./pages/CompleteProfile";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
