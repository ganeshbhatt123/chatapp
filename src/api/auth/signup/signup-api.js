import { toast } from "sonner";
import { auth, db } from "../../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { uploadFile } from "../../../lib/uploadFile";

/*________________________POST_____________________________________*/
export const addSignUp = async (formData) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      formData?.email,
      formData?.password,
    );
    const imgUrl = await uploadFile(formData?.file);
     await setDoc(doc(db, "users", res?.user?.uid), {
      id: res?.user?.uid,
      displayName: formData?.displayName,
      email: formData?.email,
      password: formData?.password,
      file: imgUrl,
      blocked: [],
    });
     await setDoc(doc(db, "userChats", res?.user?.uid), {
      chats: [],
    });
  } catch (error) {
    console.log("🚀 ~ addSignUp ~ error:", error)
    return false;
  }
};
