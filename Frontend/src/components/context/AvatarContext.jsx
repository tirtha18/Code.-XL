import React, { createContext, useContext, useState } from 'react';
import User_img from '../../images/User_img.png';
const AvatarContext = createContext();
const AvatarProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(User_img);

  const updateAvatar = (newAvatar) => {
    setAvatar(newAvatar);
  };

  return (
    <AvatarContext.Provider value={{ avatar, updateAvatar}}>
      {children}
    </AvatarContext.Provider>
  );
};

export { AvatarContext, AvatarProvider };