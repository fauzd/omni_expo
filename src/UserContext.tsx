import React from 'react';

export interface User {
  _id: number;
  name: string;
  picture: string;
}

const UserContext = React.createContext<User | null>(null);

export default UserContext;
