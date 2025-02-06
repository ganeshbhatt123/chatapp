import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useDebugValue, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddUser from "../AddUser/AddUser";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useChatStore } from "../../../../lib/chatStore";

const ChatList = ({ userDetails }) => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");
  const currentUser = localStorage.getItem("uid");
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    if (userDetails) {
      const unSub = onSnapshot(
        doc(db, "userChats", userDetails.id),
        async (res) => {
          const items = res.data().chats;
          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "users", item?.receiverId);
            const userDocSnap = await getDoc(userDocRef);
            const user = userDocSnap?.data();
            return { ...item, user };
          });
          const chatData = await Promise.all(promises);
          setChats(chatData.sort((a, b) => b.createdAt - a.createdAt));
        }
      );
      return () => {
        unSub();
      };
    }
  }, [userDetails?.id]);

  const handleChatUserClick = async (item) => {
    const userChats = chats?.map((d) => {
      const { user, ...rest } = d;
      return rest;
    });

    const chatIndex = userChats?.findIndex((d) => d.chatId === item?.chatId);

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userChats", currentUser);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(item?.chatId, item?.user);
    } catch (err) {
      console.log("🚀 ~ handleChatUserClick ~ err:", err);
    }
  };

  const newUserList = chats?.filter((user) =>
    user?.user?.displayName.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          size="small"
          onChange={(e) => setInput(e.target.value)}
          inputLabelProps={{ shrink: false }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button onClick={() => setAddMode((prev) => !prev)}>
          {addMode ? (
            <RemoveIcon sx={{ fontSize: "2rem" }} />
          ) : (
            <AddIcon sx={{ fontSize: "2rem" }} />
          )}
        </Button>
      </Box>
      <AddUser userDetails={userDetails} />
      <Box
        sx={{
          margin: "1rem 0",
        }}
      >
        {newUserList?.map((item) => {
          return (
            <div
              key={item?.chatId}
              onClick={() => handleChatUserClick(item)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.4rem 0.2rem",
                gap: "1rem",
                borderBottom: "1px solid grey",
              }}
            >
              {item?.user?.file ? (
                <img
                  src={
                    item?.user?.blocked?.includes(currentUser) ? (
                      <AccountCircleIcon />
                    ) : (
                      item?.user?.file
                    )
                  }
                  alt="img"
                  width="40px"
                  height="40px"
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <AccountCircleIcon />
              )}
              <Typography variant="p">
                {item?.user?.blocked?.includes(currentUser)
                  ? "User"
                  : item?.user?.displayName}
              </Typography>
              <Typography
                variant="p"
                sx={{
                  background: item?.isSeen ? "transparent" : "grey",
                }}
              >
                {item?.lastMessage}
              </Typography>
            </div>
          );
        })}
      </Box>
    </>
  );
};

export default ChatList;
