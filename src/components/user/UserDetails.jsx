import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../managers/UserManager";

const UserDetails = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();

  useEffect(() => {
    getUser(userId).then((user) => setUser(user));
  }, []);

  return (
    <div className="columns is-vcentered">
      <div className="column is-half">
        <div className="card mx-6 p-6">
          <div>
            <strong>Full name: </strong>
            {user?.full_name}
          </div>
          <div>
            <strong>Username: </strong>
            {user?.username}
          </div>
          <div>
            <strong>Creation date: </strong>
            {user?.created_on}
          </div>
          <div>
            <strong>Bio: </strong>
            {user?.bio}
          </div>
        </div>
      </div>
      <div className="column is-one-third">
        <div className="card">
          <div className="card-content">
            <strong>Profile Image: </strong>
            <figure className="image is-128x128 has-margin-right-5">
              <img src={user?.profile_image_url} alt="Profile Image" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
