import { create } from "zustand";
import { db } from "./firebase";
import { useUserStore } from "./userStore";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverUserBlocked: false,
  isLoading: true,
  changeChat: async (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    //  Check if user is already blcoked
    if (user?.blocked.includes(currentUser?.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverUserBlocked: false,
        isLoading: false,
      });
    }

    //  Check if receiver is already blcoked
    else if (currentUser?.blocked.includes(user?.id)) {
      return set({
        chatId,
        user: user,
        isCurrentUserBlocked: false,
        isReceiverUserBlocked: true,
        isLoading: false,
      });
    } else {
      set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverUserBlocked: false,
        isLoading: false,
      });
    }
  },
  //  Button to block unblock user
  changeBlock: () => {
    set((state) => ({
      ...state,
      isReceiverBlocked: !state.isReceiverBlocked,
    }));
  },
}));
