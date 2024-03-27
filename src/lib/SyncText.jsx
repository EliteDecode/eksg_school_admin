import { Close } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import { ClipLoader, SyncLoader } from "react-spinners";
import { useSyncGlobalContext } from "./Context";
import { useNavigate } from "react-router-dom";

const SyncText = ({ text }) => {
  const { setSyncingText, syncingText } = useSyncGlobalContext();
  const navigate = useNavigate();
  return (
    <Box
      className={`absolute z-100 top-2 right-10 ${
        text.includes("Offline") ? "bg-blue-800" : "bg-gray-800"
      }  sm:w-[25vw] text-center w-[55%] flex items-center justify-between rounded-md space-x-2 p-5`}
      style={{ zIndex: 100 }}>
      <Typography className="text-[12px] font-semibold text-gray-100">
        {text}
      </Typography>{" "}
      <Close
        onClick={() => {
          setSyncingText("");
          if (syncingText.includes("Upload")) {
            navigate("/dashboard");
          }
        }}
        className="text-primary cursor-pointer text-[10px] -mt-5 "
        style={{ fontSize: "18px" }}
      />
    </Box>
  );
};

export default SyncText;
