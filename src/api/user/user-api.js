import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { toast } from "sonner";

{
  /*________________________GET_____________________________________*/
}
export const getUserDetails = async (id) => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap?.data();
    localStorage.setItem("userData", JSON.stringify(data))
     return data;
  } catch (err) {
    toast.err("error api")
  }
};
