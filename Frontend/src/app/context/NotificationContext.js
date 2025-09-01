"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useSubscription } from "@apollo/client/react";
import { NEW_NOTIFICATION } from "../graphql/subscription.js";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  const { data } = useSubscription(NEW_NOTIFICATION, {
    skip: !user?.id || user?.role !== "admin",
    variables: { userId: user?.id },
  });
  console.log("Data in NotificationProvider", data);
  useEffect(() => {
    if (data?.newNotification) {
      setNotifications((prev) => [data.newNotification, ...prev]);

      console.log("New notification :", notifications);
    }
  }, [data]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
