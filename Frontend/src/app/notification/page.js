"use client";
import { useState, useEffect } from "react";
import { useSubscription } from "@apollo/client/react";
import { IconButton, Badge, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NOTIFICATION_SUBSCRIPTION } from "../graphql/subscription";

export default function NotificationBell({ userId }) {
  const { data } = useSubscription(NOTIFICATION_SUBSCRIPTION, {
    variables: { userId },
    skip: !userId
  });

  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  // whenever a new notification comes in, add it
  useEffect(() => {
    if (data?.notificationAdded) {
      setNotifications((prev) => [data.notificationAdded, ...prev]);
    }
  }, [data]);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      {/* Bell Icon with count */}
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Dropdown list of notifications */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notifications.length === 0 ? (
          <MenuItem>No notifications</MenuItem>
        ) : (
          notifications.map((n) => (
            <MenuItem key={n.id}>{n.message}</MenuItem>
          ))
        )}
      </Menu>
    </>
  );
}
