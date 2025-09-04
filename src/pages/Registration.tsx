import { useAuthContext } from "../contexts/AuthContext";

const Registration = () => {
  const { registrationInputValue, setRegistrationInputValue, registerHandler } =
    useAuthContext();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerHandler();
    setRegistrationInputValue({ email: "", password: "", roleName: "" });
  };

  return (
    <>
      <form onSubmit={handleRegisterSubmit}>
        <input
          type="email"
          value={registrationInputValue.email}
          onChange={(e) =>
            setRegistrationInputValue({
              ...registrationInputValue,
              email: e.target.value,
            })
          }
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={registrationInputValue.password}
          onChange={(e) =>
            setRegistrationInputValue({
              ...registrationInputValue,
              password: e.target.value,
            })
          }
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={registrationInputValue.roleName}
          onChange={(e) =>
            setRegistrationInputValue({
              ...registrationInputValue,
              roleName: e.target.value,
            })
          }
          placeholder="Role (e.g., student, teacher, admin)"
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Registration;
