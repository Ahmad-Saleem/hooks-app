import React from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const USERS = gql`
query users {
 user {
      id
      username
      status
    }
}
`;

const ONLINE_USERS = gql`
subscription online_users {
    user {
      id
      username
      status
    }
  }
`;

export function OnlineUsers(){

    const { loading, error, data } = useSubscription(ONLINE_USERS);

    if(loading) return <div>Loading users ...</div>;

    if(error) return <div>Error !!</div>;

    return data.user.map(user => <div id={user.id}>{user.username} {user.status}</div>);

}

export function Users(){

    const { loading, error, data } = useQuery(USERS);

    if(loading) return <div>Loading users ...</div>;

    if(error) return <div>Error !!</div>;

    return data.user.map(user => <div id={user.id}>{user.username} {user.status}</div>);

} 