import { Grid2 } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../lib/firebase";
import { setUser } from "../../redux/reducers/authSlice";

const LoginDashboard = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("uid");

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user?.uid && id) {
        dispatch(setUser(user));
      }
    });
    return () => unSub();
  }, []);

  return (
    <>
      <Grid2 container>
        <Grid2 size={{ xs: 12 }}>dashboard</Grid2>
      </Grid2>
    </>
  );
};

export default LoginDashboard;
