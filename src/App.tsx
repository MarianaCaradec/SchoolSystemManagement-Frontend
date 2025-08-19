import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import LogIn from "./pages/LogIn";
import Registrarion from "./pages/Registration";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <div>
            <h1>School System Management</h1>
            <Registrarion />
            <LogIn />
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
