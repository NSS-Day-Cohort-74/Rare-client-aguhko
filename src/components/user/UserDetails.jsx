import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../managers/UserManager";
import {
  createNewSubscription,
  getAllSubscriptions,
} from "../../managers/Subscriptions";

const UserDetails = ({ token }) => {
  const [user, setUser] = useState();
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUser(userId).then((user) => setUser(user));
  }, [userId]);

  const fetchSubscriptions = () => {
    getAllSubscriptions().then((subscriptionsArray) =>
      setSubscriptions(subscriptionsArray),
    );
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    // Does the current user have a relationship with the user they are viewing?
    const areYouSubscribed = subscriptions.find(
      (subscription) =>
        subscription.follower_id === parseInt(token) &&
        subscription.author_id === user?.id,
    );
    // Was a relationship found?
    if (areYouSubscribed !== undefined) {
      setSubscribed(true);
    }
  }, [subscriptions, user, token]);

  const handleSubscription = (event) => {
    // The unique id associated with a user is the id of their subscribe/unsubscribed button
    const subscriptionForm = {
      follower_id: parseInt(token),
      author_id: user?.id,
    };
    createNewSubscription(subscriptionForm).then(navigate("/"));
  };

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
          {/* Is current user viewing their own user details? */}
          {parseInt(token) === user?.id ? (
            // No subscribe/unsubscribe button will appear
            ""
          ) : (
            // Is current user viewing another user's user details?
            <>
              {subscribed ? (
                // They are subscribed to the user they are viewing
                <button id={user?.id}>Unsubscribe</button>
              ) : (
                // They are not subscribed to the user they are viewing
                <button id={user?.id} onClick={handleSubscription}>
                  Subscribe!
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="column is-one-third">
        <div className="card">
          <div className="card-content">
            <strong>Profile Image: </strong>
            <figure className="image is-128x128 has-margin-right-5">
              <img src={user?.profile_image_url} alt="" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
