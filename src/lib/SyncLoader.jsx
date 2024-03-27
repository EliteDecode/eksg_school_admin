import { Box } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import { ClipLoader, SyncLoader } from "react-spinners";
import { useSyncGlobalContext } from "./Context";
import { Button } from "@/components/ui/button";

const SyncLoading = () => {
  const {
    syncing,
    setSyncingText,
    syncingText,
    syncDataWithDb,
    setIsOnline,
    isOnline,
  } = useSyncGlobalContext();
  return (
    <Box
      className={`absolute z-100 top-2 right-10 bg-gray-800 sm:w-[15vw] w-[40%] ${
        syncing ? "justify-between p-5" : "justify-center p-2"
      } flex items-center  rounded-md space-x-2 `}
      style={{ zIndex: 100 }}>
      {syncing ? (
        <>
          <Typography
            className="text-[12px] font-semibold text-gray-100"
            style={{ zIndex: 100 }}>
            Uploading data...
          </Typography>{" "}
          <SyncLoader color="#ad9440" size={10} />
        </>
      ) : (
        <>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => syncDataWithDb()}>
            Sync Offline Data
          </Button>
        </>
      )}
    </Box>
  );
};

export default SyncLoading;
