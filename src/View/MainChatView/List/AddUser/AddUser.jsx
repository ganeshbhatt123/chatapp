import { useState } from "react";
import {
  Button,
  List,
  ListItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import RenderInput from "../../../../Components/UI/RenderInput/RenderInput";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchForm } from "../../../../forms/chat/useSearchForm";
import { nanoid } from "nanoid";
import { arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

const AddUser = ({userDetails}) => {
  const { formik, searchData, loading } = useSearchForm({});
  const [open, setOpen] = useState(false);

  const inputFields = [
    {
      name: "displayName",
      label: "Search",
      required: true,
      type: "text",
      iconStart: <SearchIcon />,
      id: nanoid(),
      md: 12,
      sm: 12,
    },
  ];

  const handleSubmit = async () => {
    formik.handleSubmit();
    setOpen(true);
  };

  const handleAddUser = async (id) => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");
    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      })
      await updateDoc(doc(userChatsRef, id), {
        chats: arrayUnion({
          chatId: newChatRef?.id,
          lastMessage: "",
          receiverId: userDetails?.id,
          updatedAt: Date.now(),
        })
      });

      await updateDoc(doc(userChatsRef, userDetails?.id), {
        chats: arrayUnion({
          chatId: newChatRef?.id,
          lastMessage: "",
          receiverId: id,
          updatedAt: Date.now(),
        })
      });
    } catch (err) {
      console.log("🚀 ~ handleAddUser ~ err:", err);
    }
  };

  return (
    <>
      <RenderInput inputField={inputFields} formik={formik} />
      <Button onClick={handleSubmit} variant="outlined" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Search Results</DialogTitle>
        <DialogContent>
          {searchData?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchData?.map((item) => (
                    <TableRow key={item?.id}>
                      <TableCell>
                        <img
                          src={item?.file}
                          alt="img"
                          width="60px"
                          height="60px"
                          style={{
                            borderRadius: "50%",
                          }}
                        />
                      </TableCell>
                      <TableCell>{item?.displayName}</TableCell>
                      <TableCell>{item?.email}</TableCell>
                      <TableCell align="center">
                        <Button variant="outlined" onClick={() => handleAddUser(item?.id)}>
                          Add User
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="p" color="error">
              No users found.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddUser;
