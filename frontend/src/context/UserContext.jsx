import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const dataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "https://sih-prototype-backend-hqt8.onrender.com"; // backend URL

  // user state (login info)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Optional: check if user session is valid on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/me`, {
          withCredentials: true,
        });
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        setUser(null);
        localStorage.removeItem("user");
      }
    };
    checkSession();
  }, []);

  const value = {
    serverUrl,
    user,
    setUser,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export default UserContext;
