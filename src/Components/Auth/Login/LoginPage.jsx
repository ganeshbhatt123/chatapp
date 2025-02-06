import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Modal,
  Box,
  Grid2,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginAvatar from "../../../assets/LoginAvatar.svg";
import { nanoid } from "nanoid";
import { LoadingButton } from "@mui/lab";
import { useLoginForm } from "../../../forms/auth/loginForm/useLoginForm";
import RenderInput from "../../UI/RenderInput/RenderInput";
import { useNavigate } from "react-router-dom";

const inputFields = [
  {
    name: "email",
    label: "Email",
    required: true,
    type: "text",
    iconStart: <EmailIcon />,
    id: nanoid(),
    md: 12,
    sm: 12,
  },
  {
    name: "password",
    label: "Password",
    required: true,
    type: "password",
    iconEnd1: <Visibility />,
    iconEnd2: <VisibilityOff />,
    iconStart: <LockIcon />,
    id: nanoid(),
    md: 12,
    sm: 12,
  },
];

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSignupCompleted, setIsSignupCompleted] = useState({
    error: "",
    showPopup: false,
  });

  const {
    formik,
    loading,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleMouseDownPassword,
  } = useLoginForm({});

  const props = {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleMouseDownPassword,
  };

  const handleGoToProfile = () => {
    setSignupCompleteData("");
    navigate("/profile");
  };

  const setSignupCompleteData = (errorMessage, showPopup = false) => {
    setIsSignupCompleted((prevState) => ({
      ...prevState,
      error: errorMessage,
      showPopup: showPopup,
    }));
  };

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <>
      <Grid2
        container
        spacing={1}
        width={"90%"}
        sx={{
          display: "flex",
          flexDirection: {
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          },
          justifyContent: "space-around",
          margin: "1rem auto",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {!isSm && (
          <Grid2 item xs={12} sm={5} md={5} lg={5}>
            <Box
              sx={{
                width: { lg: "450px", md: "350px", sm: "250px", xs: "00px" },
              }}
            >
              <img width="100%" src={LoginAvatar} alt="Login Avatar" />
            </Box>
          </Grid2>
        )}

        <Grid2
          item
          xs={12}
          sm={7}
          md={5}
          lg={5}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ margin: { xs: "1rem 0" } }}>
            <Typography
              variant="h6"
              align="center"
              mb={2}
              sx={{
                width: "fit-content",
                borderRadius: "0 14px 14px 0",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                "&:hover": {},
              }}
            >
              Welcome to Chat App
            </Typography>

            <Box mt={2} sx={{ textAlign: "center" }}>
              <Typography
                variant="h3"
                sx={
                  {
                    // color: theme.palette.text.main,
                  }
                }
              >
                Login
              </Typography>
            </Box>

            <Typography
              variant="h5"
              className="fs-6 mb-3 simple"
              align="center"
            >
              Enter your details to sign in into your account
            </Typography>
          </Box>
          <RenderInput
            inputField={inputFields}
            formik={formik}
            passwordProps={props}
          />
          <Grid2 align="end">
            <Typography
              variant="h6"
              // sx={{ cursor: "pointer", color: theme.palette.text.main }}
              onClick={() => navigate("/forgotpassword")}
            >
              Forgot Password?
            </Typography>
          </Grid2>

          <Grid2 mt={2}>
            <LoadingButton
              loading={loading}
              onClick={handleFormSubmit}
              variant={"contained"}
              fullWidth={true}
              width={"-webkit-fill-available"}
              // disabled={!recapchaVal}
              sx={{
                // background: theme.palette.background.main,
                "&:hover": {
                  // background: theme.palette.hover.main,
                },
              }}
            >
              Login
            </LoadingButton>
          </Grid2>
          <Grid2 my={1.2} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">
              Don't have an account?{" "}
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "1rem",
                  // color: theme.palette.text.main,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
      <Modal
        open={isSignupCompleted.showPopup}
        onClose={() => setSignupCompleteData("", false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-container">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Signup Complete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {isSignupCompleted.error}
          </Typography>
          <Button onClick={handleGoToProfile}>Go to Profile</Button>
        </Box>
      </Modal>
    </>
  );
};
export default LoginPage;
