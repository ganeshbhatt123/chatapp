import { useMutation, useQueryClient } from "react-query";
import { addSignUp } from "../../../api/auth/signup/signup-api";
import { toast } from "sonner";

/*________________________POST_____________________________________*/
export const useSignUp = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addsignup"], (formData) => addSignUp(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Account created successfully!");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("");
    },
    onError: (err, _variables, _context) => {
      // toast.error(getErrorMessage(err));
    },
  });
};
