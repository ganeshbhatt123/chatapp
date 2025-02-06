import React, { useState } from "react";
import {
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import ConfirmationModal from "../FormModal/ConfirmationModal";
import { auth } from "../../../lib/firebase";

const LoginNavbar = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    localStorage.clear();
    setOpenLogoutModal(true);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "6vh",
        margin: "0 1rem",
      }}
    >
      <div style={{ width: "120px" }}>
        Chat APP
      </div>
      <div style={{ display: "flex", alignItems: "center",gap:"0.5rem" }}>
        <ToggleTheme />
        <Tooltip title="Logout">
          <IconButton onClick={handleLogoutClick}>
            <LoginRoundedIcon />
          </IconButton>
        </Tooltip>
      </div>

      <ConfirmationModal
        disagreeLabel={"Yes, Confirm"}
        agreeLabel={"No, Stay Logged in."}
        alertTitle={"Alert !!!"}
        header={"Will you be logging out?"}
        confirmhead={"Are you sure ?"}
        handleModalClose={() => {
          setOpenLogoutModal(false);
          close();
        }}
        isModalOpen={openLogoutModal}
        icon={
          <LoginRoundedIcon
            sx={{
              backgroundColor: "#FFDDDC",
              borderRadius: "50%",
              fontSize: "56px",
              padding: "1rem",
            }}
          />
        }
        handleSave={handleLogout}
      />
    </Box>
  );
};

export default LoginNavbar;
