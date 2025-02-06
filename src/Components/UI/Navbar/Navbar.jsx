import React from "react";
import { AppBar, Typography, Toolbar, Box, List, ListItem } from "@mui/material";
import { useNavigate } from "react-router";

const navItems = [
  { id: 1, item: "Home", path: "/dashboard" },
  { id: 2, item: "Portfolio", path: "/portfolio" },
  { id: 6, item: "Users", path: "/users" },
];

const Navbar = () => {
  const navigate = useNavigate();

  const handleActiveClick = (path) => {
    navigate(path);
  };

  return (
    <AppBar
      style={{
        position: "sticky",
        top: 0,
        boxShadow: "rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
        background: "rgba(255, 255, 255, 0.25)",
        color: "black",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Chat App</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {navItems.map((item) => (
            <List key={item.id}>
              <ListItem>
                <Typography
                  sx={{
                    cursor: "pointer",
                    fontWeight: "normal",
                    "&:hover": {
                      fontWeight: "bold",
                    },
                  }}
                  onClick={() => handleActiveClick(item.path)}
                >
                  {item.item}
                </Typography>
              </ListItem>
            </List>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
