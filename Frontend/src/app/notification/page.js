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

  const filteredNotifications = notifications.filter(
    (n) => n.actor !== user?.id
  );

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={filteredNotifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {filteredNotifications.length === 0 ? (
          <MenuItem>No notifications</MenuItem>
        ) : (
          filteredNotifications.map((n) => (
            <MenuItem key={n.id}>{n.message}</MenuItem>
          ))
        )}
      </Menu>
    </>
  );
}
