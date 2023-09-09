import { useEffect, useState } from "react";
import { getAllUsers } from "../adapters/user-adapter";
import UserLink from "../components/UserLink";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <div className="users-page">
      <h1>Users</h1>
      <ul className="user-list"> {/* Add a class for the <ul> */}
        {users.map((user) => (
          <li key={user.id} className="user-item"> {/* Add a class for the <li> */}
            <UserLink user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}


