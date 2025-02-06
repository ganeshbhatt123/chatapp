import { Outlet } from "react-router-dom";
import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../../UI/Footer/Footer";
import { useTheme } from "@mui/material";

const AppLayout = () => {
  const theme = useTheme();

  return (
    <>
      <ErrorBoundary>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              //   backgroundImage: `url(${BgLine})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% auto",
              backgroundPosition: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: `linear-gradient(45deg, ${theme.palette.background.alt} 30%, ${theme.palette.secondary.main} 190%)`,
              }}
            >
              <div
                style={{
                  flex: "0 0 auto",
                  position: "fixed",
                  width: "100%",
                  zIndex: 100,
                }}
              >
                <Navbar />
              </div>
              <div style={{ flex: "1 0 auto", marginTop: "85px" }}>
                <Outlet />
              </div>
              <div style={{ flex: "0 0 auto", marginTop: "8rem" }}>
                <Footer
                  style={{ position: "sticky", bottom: "0", zIndex: "100" }}
                />
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default AppLayout;
