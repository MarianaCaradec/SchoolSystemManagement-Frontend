import "./App.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import LogIn from "./pages/LogIn";
import Registrarion from "./pages/Registration";

function App() {
  return (
    <>
      <AuthContextProvider>
        <div>
          <h1>School System Management</h1>
          <Registrarion />
          <LogIn />
        </div>
      </AuthContextProvider>
    </>
  );
}

export default App;
