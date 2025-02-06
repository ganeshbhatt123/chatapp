import { ThemeProvider, CssBaseline } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";


const ThemeProvider = ({ children }) => {
  const mode = useSelector((state) => state.theme.mode);

  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#ffffff",
            },
          }
        : {
            background: {
              default: "#ffffff",
              paper: "#f5f5f5",
            },
            text: {
              primary: "#000000",
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProvider;
