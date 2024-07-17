import React, { Children } from "react";
import { createContext, useState } from "react";

const navContext = createContext(null);
function NavContextProvider({children}) {
  const [activeNav, setActiveNav] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const changeActiveNav = (index) => {
    const temp = [...activeNav];
    for (let i = 0; i < temp.length; i++) {
      if (i === index) temp[i] = true;
      else temp[i] = false;
    }
    setActiveNav(temp);
  };
  return (
    <navContext.Provider value={{ activeNav, changeActiveNav }}>
      {children}
    </navContext.Provider>
  );
}

export { navContext, NavContextProvider };
