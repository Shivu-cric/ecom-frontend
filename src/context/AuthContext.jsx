import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize user state from localStorage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Don't store sensitive data in state
        const { password, ...safeUserData } = userData;
        setUser(safeUserData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData) => {
    // Don't store sensitive data in state
    const { password, ...safeUserData } = userData;
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(safeUserData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
