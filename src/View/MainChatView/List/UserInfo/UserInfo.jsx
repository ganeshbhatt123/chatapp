import React from "react";
import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VideocamIcon from "@mui/icons-material/Videocam";
import EditIcon from "@mui/icons-material/Edit";

const UserInfo = ({userDetails}) => {

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left section: User Icon and Name */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {userDetails?.file ? (
          <>
            <img
              src={userDetails?.file}
              alt="img"
              width="32px"
              height="32px"
              style={{
                borderRadius: "1rem",
              }}
            />
          </>
        ) : (
          <>
            <AccountCircleIcon />
          </>
        )}
        <Typography variant="p">{userDetails?.displayName}</Typography>
      </Box>

      {/* Right section: Icons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <MoreHorizIcon />
        <VideocamIcon />
        <EditIcon />
      </Box>
    </Box>
  );
};

export default UserInfo;
