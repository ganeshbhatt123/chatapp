import React from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ToggleTheme = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mode = theme.palette.mode;

  const handleModeClick = () => {
    const newMode = mode === "light" ? "dark" : "light";
    dispatch({ type: "TOGGLE_THEME", payload: newMode });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "28px",
        borderRadius: "15px",
        background:`linear-gradient(45deg, ${theme.palette.background.alt} 30%, ${theme.palette.secondary.main} 190%)`,
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        transition: "background 0.4s ease-in-out",
        "&:hover": {
          boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
        },
      }}
      onClick={handleModeClick}
    >
      {/* Toggle Button */}
      <Box
        sx={{
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          background: mode === "dark" ? "#000" : "#fff",
          position: "absolute",
          top: "2px",
          left: mode === "dark" ? "22px" : "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "left 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s",
        }}
      >
        {mode === "dark" ? (
          <DarkModeIcon
            sx={{
              color: "#ffd700",
              fontSize: "1rem",
              transition: "transform 0.6s ease-in-out",
              "&:hover": {
                transform: "rotate(360deg)",
              },
            }}
          />
        ) : (
          <WbSunnyIcon
            sx={{
              color: "orange",
              fontSize: "1rem",
              transition: "transform 0.6s ease-in-out",
              "&:hover": {
                transform: "rotate(360deg)",
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ToggleTheme;
