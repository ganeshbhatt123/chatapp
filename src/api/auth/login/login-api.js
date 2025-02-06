import { setDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

{
  /*________________________POST_____________________________________*/
}
export const addLogin = async (formData) => {
  try {
    const res = await signInWithEmailAndPassword(auth, formData?.email, formData?.password);
    return res;

  } catch (error) {
    console.log("🚀 ~ addLogin ~ error:", error)
    // toast.error(error);
    return false;
  }
};
