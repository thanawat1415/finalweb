import React, { useEffect } from "react";
import "./loading.scss";
import Box from "@mui/material/Box";
import { color } from "@mui/system";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const Loading = () => {
  useEffect((e) => {
    handleToggle();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Backdrop
        style={{ size: "99px" }}
        sx={{
          color: "rgb(17, 9, 136)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Loading;
