import { useMutation, useQueryClient } from "react-query";
import { addSearch } from "../../api/chat/search-api";


export const useSearch = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation(["addsignup"], (formData) => addSearch(formData), {
    onSuccess: (data, variables, context) => {
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("");
    },
    onError: (err, _variables, _context) => {
    //   toast.error(getErrorMessage(err));
    },
  });
};
