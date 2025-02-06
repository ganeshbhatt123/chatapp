import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";

export const addSearch = async (formData) => {
  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where("displayName", "==", formData?.displayName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const users = querySnapshot.docs.map((doc) => doc.data());
      return users;
    } else {
      console.log("No matching documents found.");
      return [];
    }
  } catch (err) {
    console.error("🚀 ~ addSearch ~ err:", err);
    return [];
  }
};