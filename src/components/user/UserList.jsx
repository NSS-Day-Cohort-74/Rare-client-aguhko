import { useEffect, useState } from "react";
import { getAllUsers } from "../../managers/UserManager";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((users) => {
      const sortedUsers = users.sort((a, b) => a.username > b.username);
      setUsers(sortedUsers);
    });
  }, []);

  return (
    <div className="box mx-4 ">
      <div>
        <h1 className="ml-6 is-size-2">Users</h1>
      </div>
      <div className="is-flex is-justify-content-center is-align-items-center ">
        <div className="table-container">
          <table className="table is-striped is-hoverable is-bordered">
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(
                ({ first_name, last_name, email, username }, index) => (
                  <tr key={index}>
                    <td>{username}</td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{email}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;

{
  /*

is - primary;
is - link;
is - info;
is - success;
is - warning;
is - danger;
is - black;
is - dark;
is - light;
is - white;
*/
}
