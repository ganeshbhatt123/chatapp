import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import SparkleEffect from "../SparkleEffect/SparkleEffect";

export const DropZone = ({ element, formik }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const [file, setFile] = useState(
    formik.values.file || formik.values.fileName
  );
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const onDropRejected = (rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError(
        "Invalid file type. Only *.jpeg, *.jpg, and *.png images are accepted."
      );
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: element?.accept,
    onDrop: (acceptedFiles) => handleUpload(acceptedFiles),
    onDropRejected,
    noClick: false, // Allow clicking to select files
  });

  const handleUpload = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        setFile(file);
        setError(""); // Clear the error when a valid file is selected
        formik.setFieldValue(`${element.name}`, file);

        // Fix: Reset the input value to allow re-selection of the same file
        const input = document.querySelector(`[name="${element.name}"]`);
        if (input) input.value = "";
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  const handleDelete = () => {
    setFile(null);
    formik.setFieldValue(`${element.name}`, null);
  };

  return (
    <div style={{ width: "100px" }}>
      {element?.title && (
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "9px",
          }}
        >
          {element?.title}
        </Typography>
      )}
      {!!file ? (
        <div
          style={{
            padding: "16px 0 16px 8px",
            position: "relative",
            cursor: "pointer",
            height: "100px",
          }}
          onMouseOver={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
        >
          {file && file.type === "application/pdf" && (
            <iframe
              src={URL.createObjectURL(file)}
              title="PDF Preview"
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          )}
          {file && (
            <img
              src={typeof file === "string" ? file : URL.createObjectURL(file)}
              alt="Uploaded file"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {showDelete && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                width: "100%",
                textAlign: "end",
                padding: "10px",
                boxSizing: "border-box",
              }}
              onClick={handleDelete}
            >
              <Typography variant="body1" sx={{ color: "#ffffff" }}>
                Remove
              </Typography>
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          style={{
            padding: "16px 0 16px 8px",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              border: "2px dashed blue",
              borderRadius: "8px",
              textAlign: "center",
              height: "100px",
            }}
          >
            <input {...getInputProps()} name={element.name} />
            <SparkleEffect>
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: theme.palette.text.light,
                  background: element?.background ? element?.background : `linear-gradient(45deg,rgb(249, 133, 233),rgb(128, 86, 233) 100%)`,
                }}
              >
                {isDragActive ? (
                  <Typography
                    variant="p"
                    sx={{ color: theme.palette.text.light, fontSize: "1rem", }}
                  >
                    Drop the file here ...
                  </Typography>
                ) : (
                  <Typography
                    variant="p"
                    sx={{ color: theme.palette.text.light, fontSize: "1rem", }}
                  >
                    {element?.labelName || "Drag & drop an image here, or click to select a file"}
                  </Typography>
                )}
                <Typography
                  variant="p"
                  sx={{ color: theme.palette.text.light, fontSize: "1rem", }}
                >
                  (*.jpeg, *.jpg, and *.png)
                </Typography>
              </Paper>
            </SparkleEffect>
          </Box>
        </div>
      )}

      {error && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </div>
  );
};
