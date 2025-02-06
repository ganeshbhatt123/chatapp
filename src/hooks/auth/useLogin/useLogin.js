import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { addLogin } from "../../../api/auth/login/login-api";


export const useLogin = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation(["addsignup"], (formData) => addLogin(formData), {
    onSuccess: (data, variables, context) => {
      localStorage.setItem("uid", (data?.user?.uid));
      toast.success("Login successful");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("");
    },
    onError: (err, _variables, _context) => {
    //   toast.error(getErrorMessage(err));
    },
  });
};
