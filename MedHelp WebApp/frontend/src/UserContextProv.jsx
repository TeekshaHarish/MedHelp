import React, { createContext, useContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const updateUser = async (newValue) => {
    await setUser(newValue);
  };
  return (
    <userContext.Provider value={{ user, updateUser }}>
      {children}
    </userContext.Provider>
  );
};

// export default userProvider;
