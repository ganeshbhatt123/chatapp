import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSearch } from "../../hooks/chat/useSearch";

export const searchSchema = Yup.object().shape({
  displayName: Yup.string().required("User Name is required"),
});

export const useSearchForm = () => {
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState(false);
  const { mutate: addMutate } = useSearch({});

  const formik = useFormik({
    initialValues: {
      displayName: "",
    },
    validationSchema: searchSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    addMutate(values, {
      onSuccess: (data) => {
        setSearchData(data);
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return {
    loading,
    formik,
    searchData,
  };
};
