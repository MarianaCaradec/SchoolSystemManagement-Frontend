import {
  createContext,
  useContext,
  useEffect,
  useState,
  type SetStateAction,
} from "react";
import type { AuthenticatedUser, UserForm } from "../utils/types";
import { login, logout, register } from "../api/apiHelpers";
import { useNavigate } from "react-router-dom";
import api from "../api/baseCall";

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

  useEffect(() => {
    const hasToken = document.cookie.includes("AuthToken=");

    if (!hasToken) {
      setUser(null);
      console.warn("No AuthToken found in cookies, user is not authenticated.");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await api.get("api/auth/me", { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const redirectByRole = async (user: AuthenticatedUser) => {
    if (!user) {
      console.warn("No user is logged in, cannot redirect by role.");
      return;
    }

    switch (user.roleName) {
      case "Student":
        navigateTo("/student/dashboard");
        break;
      case "Teacher":
        navigateTo("/teacher/dashboard");
        break;
      case "Admin":
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
      let roleName = registrationInputValue.roleName || "Student";

      if (roleName === "Teacher") {
        alert(
          "You cannot register directly as a Teacher. You will be registered as a Student. Please contact the admin if you need your role changed."
        );
        roleName = "Student";
      }

      const registeredUser = await register(
        registrationInputValue.email,
        registrationInputValue.password,
        roleName
      );

      if (registeredUser) {
        setUser(registeredUser);
        navigateTo("/login");

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
    const loggedUser: AuthenticatedUser = await login(
      loginInputValue.email,
      loginInputValue.password
    );

    if (!loggedUser) {
      return null;
    }

    setUser(loggedUser);

    const isNewUser = !loggedUser.hasProfile;

    if (
      isNewUser &&
      (loggedUser.roleName === "Student" || loggedUser.roleName === "Teacher")
    ) {
      navigateTo(`/complete-profile?userId=${loggedUser.id}`);
      return loggedUser;
    } else if (loggedUser.roleName === "Admin") {
      navigateTo("/admin/dashboard");
      return loggedUser;
    }

    try {
      let isProfileCompleted = false;

      if (loggedUser.roleName === "Student") {
        const { data: studentData } = await api.get(
          `api/student/by-user/${loggedUser.id}`,
          {
            withCredentials: true,
          }
        );

        isProfileCompleted =
          !!studentData.name &&
          !!studentData.surname &&
          !!studentData.birthDate &&
          !!studentData.address &&
          !!studentData.mobileNumber &&
          !!studentData.userId &&
          !!studentData.classId;

        console.log(studentData);
      } else if (loggedUser.roleName === "Teacher") {
        const { data: teacherData } = await api.get(
          `api/teacher/by-user/${loggedUser.id}`,
          {
            withCredentials: true,
          }
        );

        isProfileCompleted =
          !!teacherData.name &&
          !!teacherData.surname &&
          !!teacherData.birthDate &&
          !!teacherData.address &&
          !!teacherData.mobileNumber &&
          !!teacherData.userId;
      }

      if (!isProfileCompleted) {
        navigateTo(`/complete-profile?userId=${loggedUser.id}`);
      } else {
        redirectByRole(loggedUser);
      }

      return loggedUser;
    } catch (error) {
      console.warn("Profile fetch failed — assuming incomplete profile.");
      navigateTo(`/complete-profile?userId=${loggedUser.id}`);
      return loggedUser;
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
