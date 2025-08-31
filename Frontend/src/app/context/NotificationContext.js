"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useSubscription } from "@apollo/client/react";
import { NOTIFICATION_SUBSCRIPTION } from "../graphql/subscription";


const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  const { data } = useSubscription(NOTIFICATION_SUBSCRIPTION, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  useEffect(() => {
    if (data?.notificationAdded) {
      setNotifications((prev) => [data.notificationAdded, ...prev]);
    }
  }, [data]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
