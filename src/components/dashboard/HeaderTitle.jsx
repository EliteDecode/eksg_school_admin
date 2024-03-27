import { Box } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const HeaderTitle = ({
  img,
  title,
  subtitle,
  BtnText,
  BtnText2,
  BtnTextType,
  BtnTextType2,
  route,
}) => {
  return (
    <>
      <Box
        className={`w-full
       bg-white sm:p-5 p-3 rounded-md mb-5`}>
        <Box className="flex flex-wrap space-y-4 items-center justify-between">
          <Box className="flex items-center space-x-2">
            <img src={img} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                {title}
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                {subtitle}
              </Typography>
            </Box>
          </Box>
          <Box className="space-x-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={BtnTextType ? BtnTextType : "default"}>
                  {BtnText}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="text-center">
                  <AlertDialogTitle>Confirm Deactivation</AlertDialogTitle>
                  <AlertDialogDescription>
                    You are about to deactivate Adventist Comprehensive High
                    School from PB Resultvault. This will not delete their file
                    or account from the system. Do you still want to proceed?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeaderTitle;
