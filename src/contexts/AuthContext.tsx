import {
  createContext,
  useContext,
  useState,
  type SetStateAction,
} from "react";
import type { AuthenticatedUser, UserForm } from "../utils/types";
import { login, logout, register } from "../api/apiHelpers";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  registrationInputValue: UserForm;
  setRegistrationInputValue: React.Dispatch<SetStateAction<UserForm>>;
  loginInputValue: UserForm;
  setLoginInputValue: React.Dispatch<SetStateAction<UserForm>>;
  user: AuthenticatedUser | null;
  setUser: React.Dispatch<SetStateAction<AuthenticatedUser | null>>;
  redirectByRole: (user: AuthenticatedUser) => Promise<void>;
  registerHandler: () => Promise<AuthenticatedUser | null>;
  loginHandler: () => Promise<AuthenticatedUser | null>;
  logoutHandler: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [registrationInputValue, setRegistrationInputValue] =
    useState<UserForm>({
      email: "",
      password: "",
      roleName: "",
    });
  const [loginInputValue, setLoginInputValue] = useState<UserForm>({
    email: "",
    password: "",
    roleName: "",
  });
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const navigateTo = useNavigate();

  const redirectByRole = async (user: AuthenticatedUser) => {
    if (!user) {
      console.warn("No user is logged in, cannot redirect by role.");
      return;
    }

    switch (user.roleName) {
      case "student":
        navigateTo(`/complete-profile?userId=${user.id}`);
        break;
      case "teacher":
        navigateTo("/teacher/dashboard");
        break;
      case "admin":
        navigateTo("/admin/dashboard");
        break;
      default:
        console.warn(
          `Unknown role: ${user.roleName}. Cannot redirect to a specific dashboard.`
        );
        navigateTo("/login");
        break;
    }
  };

  const registerHandler = async (): Promise<AuthenticatedUser | null> => {
    try {
      console.log(
        "[⚡️] Intentando registrar usuario con datos:",
        registrationInputValue
      );

      const registeredUser = await register(
        registrationInputValue.email,
        registrationInputValue.password,
        registrationInputValue.roleName
          ? registrationInputValue.roleName
          : "student"
      );

      console.log("[📨] Respuesta del backend:", registeredUser);
      if (registeredUser) {
        setUser(registeredUser);
        redirectByRole(registeredUser);
        return registeredUser;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return null;
    }
  };

  const loginHandler = async (): Promise<AuthenticatedUser | null> => {
    try {
      const loggedUser = await login(
        loginInputValue.email,
        loginInputValue.password
      );

      if (loggedUser) {
        setUser(loggedUser);
        return loggedUser;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  };

  const logoutHandler = async () => {
    try {
      const loggedoutUser = await logout();

      if (loggedoutUser) {
        setUser(null);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registrationInputValue,
        setRegistrationInputValue,
        loginInputValue,
        setLoginInputValue,
        user,
        setUser,
        redirectByRole,
        registerHandler,
        loginHandler,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("userAuthContext must be used within AuthContextProvider");
  }
  return context;
};
