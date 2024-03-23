/*
* Author - A.M.W.W.R.L. Wataketiya (MS23466944)
* Generic Profile for Auth0 users
*
* */

import {useAuth0} from "@auth0/auth0-react";

const Profile = () => {
  const {user, isAuthenticated, isLoading,} = useAuth0();

  if(isLoading) {
      return <div>Loading...</div>
  }

  return (
      isAuthenticated && (
          <div>
              <p>Auth Details</p>
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
          </div>
      )
  );
}

export default Profile;