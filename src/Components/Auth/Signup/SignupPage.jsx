import React, { useState } from "react";
import first1 from "../../../assets/purpleVector.svg";
import {
  Grid2,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { nanoid } from "nanoid";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useSignupForm } from "../../../forms/auth/signupForm/useSignupform";
import RenderInput from "../../UI/RenderInput/RenderInput";

const SignupPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [isChecked, setIsChecked] = useState(false);

  const {
    formik,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleMouseDownPassword,
    loading,
  } = useSignupForm();

  const props = {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleMouseDownPassword,
  };

  const handleFormSubmit = () => {
    formik.handleSubmit();
  };

  const inputFields = [
    {
      name: "displayName",
      label: "User Name",
      type: "text",
      required: true,
      isUpperCase: true,
      iconStart: <PersonIcon />,
      id: nanoid(),
      md: 4,
      sm: 12,
    },
    {
      name: "email",
      label: "Email",
      required: true,
      type: "text",
      iconStart: <EmailIcon />,
      id: nanoid(),
      md: 6,
      sm: 12,
    },
    {
      name: "password",
      label: "Password",
      required: true,
      type: "password",
      passwordPopup: true,
      passwordRules: [
        {
          label: "At least 8 characters",
          check: (value) => value.length >= 8,
        },
        {
          label: "At least one lowercase letter",
          check: (value) => /[a-z]/.test(value),
        },
        {
          label: "At least one uppercase letter",
          check: (value) => /[A-Z]/.test(value),
        },
        { label: "At least one number", check: (value) => /\d/.test(value) },
        {
          label: "At least one special character",
          check: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
        },
      ],
      iconEnd1: <Visibility />,
      iconEnd2: <VisibilityOff />,
      iconStart: <LockIcon />,
      id: nanoid(),
      md: 6,
      sm: 12,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      required: true,
      type: "password",
      id: nanoid(),
      iconEnd1: <Visibility />,
      iconEnd2: <VisibilityOff />,
      iconStart: <LockIcon />,
      md: 6,
      sm: 12,
    },
    {
      id: nanoid(),
      name: "file",
      label: "File",
      labelName: "upload image",
      type: "documentUpload",
      required: true,
      xs: 12,
      md: 12,
      lg: 12,
      sm: 12,
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "image/pdf": [".pdf"],
      },
    },
  ];

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
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
          // boxShadow: theme.palette.boxShadow.main,
          // background: theme.palette.background.light,
          margin: "1rem auto",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {!isSm && (
          <Grid2 item xs={3} sm={4} md={5} lg={5}>
            <Box
              sx={{
                width: { lg: "450px", md: "350px", sm: "280px", xs: "00px" },
              }}
            >
              <img width="100%" src={first1} alt="" />
            </Box>
          </Grid2>
        )}
        <Grid2
          item
          xs={11}
          sm={7}
          md={6}
          lg={6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Box>
            <Grid2>
              <Typography
                variant="h6"
                align="center"
                mb={2}
                sx={{
                  width: "fit-content",
                  borderRadius: "0 14px 14px 0",
                  // background: theme.palette.background.main,
                  color: theme.palette.text.light,
                  padding: "0.5rem 1rem",
                  "&:hover": {
                    // background: theme.palette.hover.main,
                  },
                }}
              >
                Welcome to CHAT APP
              </Typography>
            </Grid2>
            <Box mt={2} mb={5} sx={{ textAlign: "center" }}>
              <Typography
                variant="h3"
                align="center"
                sx={{
                  // color: theme.palette.text.main,
                }}
              >
                Registration Details
              </Typography>
            </Box>
          </Box>
          <RenderInput
            inputField={inputFields}
            formik={formik}
            passwordProps={props}
          />
          <Grid2 item xs={12}>
            <FormControlLabel
              control={
                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              }
              label={
                <Typography
                  variant="h6"
                  mt={2}
                  sx={{ textAlign: "justify", lineHeight: 1.2 }}
                >
                  I confirm that I am authorised to provide the personal details
                  presented and I consent to the information being checked with
                  the document issuer or official record holder via third party
                  systems for the purpose of confirming my identity.
                </Typography>
              }
            />
          </Grid2>
          <Grid2 mt={2}>
            <LoadingButton
              loading={loading}
              onClick={handleFormSubmit}
              variant={"contained"}
              disabled={!isChecked}
              fullWidth={true}
              width={"-webkit-fill-available"}
              sx={{
                // background: theme.palette.button.primary,
                "&:hover": {
                  // background: theme.palette.hover.primary,
                },
              }}
            >
              SIGN UP
            </LoadingButton>
          </Grid2>
          <Grid2 my={1.2} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="p">
              Already have an account?{" "}
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "1rem",
                  // color: theme.palette.text.main,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </span>
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default SignupPage;
