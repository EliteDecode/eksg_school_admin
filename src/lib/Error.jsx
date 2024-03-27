import { Box } from "@mui/material";
import React from "react";
import errorImg from "../assets/images/error.png";
import { Button } from "@/components/ui/button";
import { Typography } from "antd";

const Error = () => {
  return (
    <Box className="h-screen flex flex-col items-center bg-white">
      <img src={errorImg} width="30%" />
      <Typography className="text-[15px] font-semibold mb-3">
        Something went wrong, check your network...
      </Typography>
      <Button onClick={() => window.location.reload()}>Refresh</Button>
    </Box>
  );
};

export default Error;
