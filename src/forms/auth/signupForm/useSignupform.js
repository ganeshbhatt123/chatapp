import { useFormik } from "formik";
import { useState } from "react";
import { useSignUp } from "../../../hooks/auth/useSignup/useSignup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export const signupSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const useSignupForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: addMutate } = useSignUp({});

  const formik = useFormik({
    initialValues: {
      id: "",
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      file: "",
    },
    validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setLoading(true);
      handledAddRequest(values);
    },
  });

  const handledAddRequest = (values) => {
    values = { ...values };
    addMutate(values, {
      onSuccess: (data) => {
        navigate("/login");
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      }
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return {
    loading,
    formik,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleMouseDownPassword,
  };
};
