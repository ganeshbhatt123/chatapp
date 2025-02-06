import React from "react";
import UserInfo from "./UserInfo/UserInfo";
import ChatList from "./ChatList/ChatList";
import { Box } from "@mui/material";

const List = ({userDetails}) => {
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid grey",
      }}
    >
      <UserInfo userDetails={userDetails} />
      <ChatList userDetails={userDetails} />
    </Box>
  );
};

export default List;
