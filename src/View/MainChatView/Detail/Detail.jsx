import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutButton from "../../../Components/Auth/Logout/LogoutButton";
import { auth, db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =  useChatStore();
  const currentUser = localStorage.getItem("uid");

  const handleLogout = () => {
    localStorage.clear();
    auth.signOut();
  };

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked
          ? arrayRemove(user?.id)
          : arrayUnion(user?.id),
      });
      changeBlock();
    } catch (err) {
      console.log("🚀 ~ handleBlock ~ err:", err);
    }
  };

  return (
    <Box
      sx={{
        borderLeft: "1px solid grey",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {user?.file ? (
            <img
              src={user?.file}
              alt="img"
              width={"120px"}
              height={"120px"}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <AccountCircleIcon />
          )}
          <Typography variant="h5">{user?.displayName}</Typography>
          <Typography variant="p">{user?.email}</Typography>
        </Box>
        <Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Chat Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">Privacy & Help</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography component="span">Shared Photos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
        </Box>
      </div>
      <Box>
        <Button
          variant="outlined"
          color="error"
          sx={{
            width: "100%",
          }}
          onClick={handleBlock}
        >
          {isCurrentUserBlocked
            ? "You are blocked"
            : isReceiverBlocked
            ? "User isblocked"
            : "Block User"}
        </Button>
        <LogoutButton
          label={"Logout"}
          variant={"outlined"}
          color={"error"}
          width={"100%"}
          handleLogout={handleLogout}
        />
      </Box>
    </Box>
  );
};

export default Detail;
