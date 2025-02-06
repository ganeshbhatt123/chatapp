import React, { useEffect, useState } from "react";
import { Grid2 } from "@mui/material";
import Chat from "./Chat/Chat";
import Detail from "./Detail/Detail";
import List from "./List/List";
import { useGetUserDetails } from "../../hooks/user/useUserDetails";
import Loader from "../../Components/UI/Loader/Loader";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/authSlice";
import { useChatStore } from "../../lib/chatStore";

const MainChatViewPage = () => {
  const id = localStorage.getItem("uid");
  const { data: userDetails, isLoading } = useGetUserDetails(id);
  const { chatId } = useChatStore();
  console.log("🚀 ~ MainChatViewPage ~ chatId:", chatId)

  return (
    <>
      <Grid2 container>
        <Grid2 size="grow">
          <List userDetails={userDetails} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          {chatId && (
            <>
              <Chat />
            </>
          )}
        </Grid2>
        <Grid2 size="grow">
          {chatId && (
            <>
              <Detail />
            </>
          )}
        </Grid2>
      </Grid2>
    </>
  );
};

export default MainChatViewPage;
