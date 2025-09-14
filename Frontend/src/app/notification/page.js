"use client";
import { useContext, useState } from "react";
import { IconButton, Badge, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNotifications } from "../context/NotificationContext";
import { AuthContext } from "../context/AuthContext";

export default function NotificationBell() {
  const { notifications } = useNotifications();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(AuthContext);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notifications.length === 0 ? (
          <MenuItem>No notifications</MenuItem>
        ) : (  notifications.id !== user.id &&
          notifications.map((n) => <MenuItem key={n.id}>{n.message}</MenuItem>)
        )}
      </Menu>
    </>
  );
}
