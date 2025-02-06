import { useQuery } from "react-query";
import { getUserDetails } from "../../api/user/user-api";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetUserDetails = (id) => {
    return useQuery(
      ["getUserDetails"],
      () => getUserDetails(id),
      {
        enabled: !!id,
        cacheTime: 10000,
        refetchInterval: false,
        refetchOnWindowFocus: false,
      }
    );
  };