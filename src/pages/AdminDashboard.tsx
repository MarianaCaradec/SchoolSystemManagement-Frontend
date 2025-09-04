import { useState } from "react";
import { updateUser } from "../api/apiHelpers";
import type { UserToBeUpdatedForm } from "../utils/types";

const AdminDashboard = () => {
  const [userToBeUpdated, setUserToBeUpdated] = useState<UserToBeUpdatedForm>({
    email: "",
    password: "",
    roleName: "",
  });

  const selectUserToBeUpdated = (selectedUser: UserToBeUpdatedForm) => {
    setUserToBeUpdated({
      email: selectedUser.email,
      password: "", // Passwords are not retrievable for security reasons
      roleName: selectedUser.roleName,
    });
  };

  const handleUpdateUser = async (userId: number) => {
    const update = await updateUser(
      userId,
      userToBeUpdated.email ?? "",
      userToBeUpdated.password ?? "",
      userToBeUpdated.roleName ?? ""
    );
    return update;
  };

  return (
    <>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>
          Welcome, here you can Create, Update or Delete any user that you want
        </h2>
        <input
          type="text"
          value={userToBeUpdated?.email}
          onChange={(e) =>
            setUserToBeUpdated({ ...userToBeUpdated, email: e.target.value })
          }
          placeholder="Search user by email"
        />
        <button>Search user</button>
      </div>
      <div>
        <h2>List of all users</h2>
        <ul>
          <li>
            {userToBeUpdated?.email}
            {userToBeUpdated?.roleName}
            <button onClick={() => selectUserToBeUpdated(userToBeUpdated)}>
              Select user
            </button>
          </li>
        </ul>
      </div>
      <div>
        <form onSubmit={() => handleUpdateUser(userToBeUpdated.id ?? 0)}>
          <input
            type="email"
            value={userToBeUpdated.email}
            onChange={(e) =>
              setUserToBeUpdated({ ...userToBeUpdated, email: e.target.value })
            }
          />
          <input
            type="password"
            value={userToBeUpdated.password}
            onChange={(e) =>
              setUserToBeUpdated({
                ...userToBeUpdated,
                password: e.target.value,
              })
            }
          />
          <select
            value={userToBeUpdated.roleName}
            onChange={(e) =>
              setUserToBeUpdated({
                ...userToBeUpdated,
                roleName: e.target.value,
              })
            }
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>
        </form>
      </div>
    </>
  );
};

export default AdminDashboard;
