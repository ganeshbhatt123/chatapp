import {
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
    Grid2,
    useTheme,
  } from "@mui/material";
  import { getIn } from "formik";
  import React, { useEffect, useState } from "react";
import { DropZone } from "../DropZone/DropZone";
  
  const RenderInput = ({
    inputField,
    formik,
    isFieldArray,
    passwordProps,
  }) => {
  const theme = useTheme();
    useEffect(() => {
      if (formik.values.documentType && inputField.length) {
        const isSingleFile = inputField[0].singleFile;
        const onlyDocument = inputField[0].onlyDocument;
        formik.setFieldValue("isSingleFile", isSingleFile);
        formik.setFieldValue("onlyDocument", onlyDocument);
      }
    }, [formik?.values?.documentType]);
  
    const handleChange = (event, element) => {
      const { name, value } = event.target;
      let updatedValue = value;
  
      if (element?.isCapital) {
        updatedValue = value.toUpperCase();
      }
      if (element?.isUpperCase) {
        updatedValue = value
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      }
  
      formik.setFieldValue(name, updatedValue);
    };
  
    const getComponentToRender = (element) => {
      const commonStyles = {
        textAlign: element?.extralabelMiddle ? "" : "start",
        alignItems: element?.extralabelMiddle ? "center" : "start",
        display: "flex",
        flexDirection: "column",
        // color: `${theme.palette.text.default}`,
        position: "relative",
      };
  
      if (!element) return null;
      const formValues = isFieldArray
        ? getIn(formik.values, element.name)
        : formik.values[element.name];
      const formError = isFieldArray
        ? getIn(formik.errors, element.name)
        : formik.errors[element.name];
      const formTouched = isFieldArray
        ? getIn(formik.touched, element.name)
        : formik.touched[element.name];
  
      switch (element.type) {
        case "text":
          return (
            <div
              style={
                element?.extraInfo && element?.extraLabel ? commonStyles : {}
              }
            >
              {element?.extraInfo && (
                <Typography
                  variant="h6"
                  sx={{
                    // color: `${theme.palette.text.default}`,
                    marginBottom: "0.1rem",
                    fontSize: element?.extralabelMiddle && "1.4rem",
                    fontWeight: 500,
                    alignContent: "center",
                  }}
                >
                  {element?.extraLabel}{" "}
                  {element?.required && (
                    <span style={{ color: "red" }}>*</span>
                  )}
                </Typography>
              )}
  
              <TextField
                name={element?.name}
                label={element?.label}
                placeholder={element?.extraInfo && element?.placeholder}
                value={formValues}
                onBlur={formik.handleBlur}
                size="small"
                onChange={(event) => {
                  handleChange(event, element);
                  if (element.clearField) {
                    for (let i = 0; i < element.clearField?.length; i++) {
                      formik.setFieldValue(element.clearField[i], "");
                    }
                  }
                }}
                fullWidth
                required={element?.required}
                variant={element?.variant ? element?.variant : "outlined"}
                disabled={element.isDisabled}
                multiline={element?.multiline || false}
                rows={element?.rows || false}
                error={
                  Boolean(element?.err) || (formTouched && Boolean(formError))
                }
                helperText={element?.err || (formTouched && formError)}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    formik.handleSubmit();
                    ev.preventDefault();
                  }
                }}
                inputProps={{
                  minLength: element?.min,
                  maxLength: element?.max,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{
                        // color: theme.palette.button.main,
                      }}
                    >
                      {element?.isImage ? (
                        <img
                          width={element?.iconWidth ? element?.iconWidth : 20}
                          src={element?.iconStart}
                        />
                      ) : (
                        <>{element?.iconStart}</>
                      )}
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: Boolean(formValues),
                  sx: {
                    marginLeft:
                      element?.iconStart && !formValues ? "1.8rem" : "0.2rem",
                  },
                }}
              />
            </div>
          );
        case "password":
          const [open, setOpen] = useState(false);
          const isConfirmPassword = element.name === "confirmPassword";
          const allRulesSatisfied = element?.passwordRules?.every((rule) =>
            rule?.check(formValues)
          );
          return (
            <div
            style={{
              position: "relative",
              ...(element?.extraInfo && element?.extraLabel ? commonStyles : {}),
            }}
            >
              {element?.extraInfo && (
                <Typography
                  variant="h6"
                  sx={{
                    // color: `${theme.palette.text.default}`,
                    marginBottom: "0.1rem",
                    fontWeight: 500,
                  }}
                >
                  {element?.extraLabel}{" "}
                  {element.required && (
                    <span style={{ color: "red" }}>*</span>
                  )}
                </Typography>
              )}
              <TextField
                name={element?.name}
                label={element?.label}
                placeholder={element?.extraInfo && element?.placeholder}
                value={formValues}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  setOpen(false);
                }}
                onFocus={() => setOpen(true)}
                onChange={formik.handleChange}
                fullWidth
                size="small"
                variant="outlined"
                disabled={element.isDisabled}
                error={formTouched && Boolean(formError)}
                helperText={formTouched && formError}
                InputLabelProps={{
                  shrink: Boolean(formValues),
                  sx: {
                    marginLeft:
                      element?.iconStart && !formValues ? "1.8rem" : "0.2rem",
                  },
                }}
                type={
                  isConfirmPassword
                    ? passwordProps?.showConfirmPassword
                      ? "text"
                      : "password"
                    : passwordProps?.showPassword
                    ? "text"
                    : "password"
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title={`${
                          isConfirmPassword
                            ? passwordProps?.showConfirmPassword
                              ? "Hide"
                              : "Show"
                            : passwordProps?.showPassword
                            ? "Hide"
                            : "Show"
                        } Password`}
                      >
                        <IconButton
                        //   sx={{ color: theme.palette.button.main }}
                          aria-label="toggle password visibility"
                          onClick={
                            isConfirmPassword
                              ? passwordProps?.handleClickShowConfirmPassword
                              : passwordProps?.handleClickShowPassword
                          }
                          onMouseDown={passwordProps?.handleMouseDownPassword}
                          edge="end"
                        >
                          {isConfirmPassword
                            ? passwordProps?.showConfirmPassword
                              ? element?.iconEnd1
                              : element?.iconEnd2
                            : passwordProps?.showPassword
                            ? element?.iconEnd1
                            : element?.iconEnd2}
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{
                        // color: theme.palette.button.main,
                      }}
                    >
                      <Tooltip>{element?.iconStart}</Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              {(element?.passwordPopup && open) && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0%",
                    display: !allRulesSatisfied ? "block" : "none",
                    // background: theme.palette.background.paper,
                    // boxShadow: theme.shadows[4],
                    padding: "0.5rem",
                    zIndex: 10,
                    borderRadius: "4px",
                  }}
                >
                  <Typography variant="p">
                    Password Requirements:
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                    {element?.passwordRules?.map((rule, index) => (
                      <li
                        key={index}
                        style={{
                        //   color: rule?.check(formValues)
                            // ? theme.palette.success.main
                            // : theme.palette.error.main,
                        }}
                      >
                        <Typography variant="p">
                        {rule?.label}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
          case "documentUpload":
            return (
              <DropZone
                title={element?.title}
                formik={formik}
                element={element}
              />
            );
          default:
          return <TextField name={element?.name} label={element?.label} />;
      }
    };
  
    return (
      <div>
        <Grid2 container spacing={2}>
          {inputField?.map((element, index) => {
            const isDisabled = element?.disableOnChange?.name.some(
              (item, i) =>
                element.disableOnChange.value[i] === formik.values[item]
            );
  
            return (
              <>
                <Grid2
                  item
                  sm={element?.sm}
                  xs={element?.xs || element?.sm}
                  md={element?.md}
                  lg={element?.lg}
                  xl={element?.xl}
                  mt={element?.mt}
                  key={index}
                >
                  {getComponentToRender(element, isDisabled, index)}
                </Grid2>
              </>
            );
          })}
        </Grid2>
      </div>
    );
  };
  
  export default RenderInput;
  