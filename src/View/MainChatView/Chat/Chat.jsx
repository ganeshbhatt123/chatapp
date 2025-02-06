import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoIcon from "@mui/icons-material/Info";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
import { useUserStore } from "../../../lib/userStore";
import { uploadFile } from "../../../lib/uploadFile";

const Chat = () => {
  const endRef = useRef(null);
  const [chats, setChats] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const { chatId, user,  isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const currentUser = localStorage.getItem("uid");

  const handleEmojiClick = () => {
    setOpenEmoji((prev) => !prev);
  };

  const handleEmojiText = (e) => {
    setText((prev) => prev + e?.emoji);
    setOpenEmoji(false);
  };

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behaviour: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChats(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!text || text.trim() === "") return;

    let imgUrl = null;
    try {
      if(img?.file){
        imgUrl = await uploadFile(img?.file);
      };

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser,
          text: text,
          createdAt: Date.now(),
          ...(imgUrl && {file: imgUrl})
        }),
      });

      const userIDs = [currentUser, user?.id];

      userIDs?.forEach(async (id) => {
        const userChatsRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);
        if (userChatsSnapshot?.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData?.chats?.findIndex(
            (c) => c?.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData?.chats,
          });
        }
      });

    } catch (err) {
      console.log("🚀 ~ handleSendMessage ~ err:", err);
    }
    setImg({
      file: null,
      url: "",
    });
    setText("");
  };

  const handleImage = (e) => {
    if(e.target.files[0]){
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      })
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <AccountCircleIcon sx={{ fontSize: "3rem" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="p">Sameer bhatt</Typography>
            <Typography variant="p">Lorem, ipsum dolor sit amet</Typography>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <PhoneIcon />
          <VideocamIcon />
          <InfoIcon />
        </div>
      </Box>

      {/* Center */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
          maxHeight: "75vh",
          overflowY: "auto",
        }}
      >
        {chats?.messages?.map((msg) => {
          return (
            <div
              key={msg?.createdAt}
              style={{
                display: "flex",
                gap: "0.6rem",
                justifyContent: msg?.senderId === currentUser ? "end" : "flex-start",
              }}
            >
             {/* {msg?.senderId === currentUser && <AccountCircleIcon sx={{ fontSize: "3rem" }} />} */}
              {msg?.file && (
                <div style={{display: "flex", flexDirection: "column"}}>
                  <img src={msg?.file} alt="img" width="200px" height="200px" />
                </div>
              )}
              {msg?.text && (
                <>
                  <Typography
                    variant="p"
                    sx={{
                      textAlign: "justify",
                      padding: "0.4rem 0.4rem",
                      background: "grey",
                      width: "70%",
                      borderRadius: "1rem",
                    }}
                  >
                    {msg?.text}
                  </Typography>
                </>
              )}
              {/* <span>{msg?.createdAt}</span> */}
            </div>
          );
        })}
        {img?.url && (
          <div className="own-msg">
            <img src={img?.url} alt="img" width={"240px"} height={"220px"} />
            
          </div>
        )}
        <div ref={endRef}></div>
      </Box>
      {/* Bottom */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <label htmlFor="file">
          <InsertPhotoIcon />
          </label>
          <input type="file" id="file" style={{display: "none"}} onChange={handleImage} />
          <CameraAltIcon />
          <KeyboardVoiceIcon />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="type a message..."
            variant="outlined"
            size="small"
            value={text}
            onChange={(e) => setText(e.target.value)}
            inputLabelProps={{ shrink: false }}
            disabled={ isCurrentUserBlocked || isReceiverBlocked}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SentimentVerySatisfiedIcon
            onClick={handleEmojiClick}
            sx={{ cursor: "pointer", position: "relative" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "6%",
              right: "21%",
            }}
          >
            {openEmoji && <EmojiPicker onEmojiClick={handleEmojiText} />}
          </div>
          <Button variant="outlined" onClick={handleSendMessage} disabled={ isCurrentUserBlocked || isReceiverBlocked}>
            Send
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Chat;
