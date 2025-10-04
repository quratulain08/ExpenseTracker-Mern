import React, { useState, useEffect, useCallback } from "react";
import { UserContext } from "./userContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateUser = (userData) => setUser(userData);
  const clearUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem("accessToken");
  }, []);

 const fetchUserInfo = useCallback(async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    setIsLoading(false);
    return;
  }

  try {
    const response = await axiosInstance.get(API_PATHS.Auth.GET_USER_INFO);
    console.log("GET_USER_INFO response:", response.data);

    // adjust based on actual API response
    setUser(response.data.user || response.data);
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    clearUser();
  } finally {
    setIsLoading(false);
  }
}, [clearUser]);


  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, isLoading, fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
