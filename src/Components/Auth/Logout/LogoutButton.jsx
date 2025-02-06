import { Button } from "@mui/material";
import React from "react";

const LogoutButton = (props) => {

  return (
    <>
      <Button
        variant={props?.variant}
        color={props?.color}
        sx={{
          width: props?.width,
        }}
        onClick={props?.handleLogout}
      >
        {props?.label}
      </Button>
    </>
  );
};

export default LogoutButton;
