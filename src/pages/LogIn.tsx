import React from "react";
import { useAuthContext } from "../contexts/AuthContext";

const LogIn = () => {
  const { loginInputValue, setLoginInputValue, loginHandler } =
    useAuthContext();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginHandler();
    setLoginInputValue({ email: "", password: "" });
  };

  return (
    <>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          value={loginInputValue.email}
          onChange={(e) =>
            setLoginInputValue({ ...loginInputValue, email: e.target.value })
          }
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={loginInputValue.password}
          onChange={(e) =>
            setLoginInputValue({
              ...loginInputValue,
              password: e.target.value,
            })
          }
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LogIn;
