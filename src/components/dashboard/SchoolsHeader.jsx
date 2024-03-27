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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import teachersImg from "../../assets/icons/teachers-day.png";
import { Typography } from "antd";
import { Box } from "@mui/material";
const SchoolsHeader = () => {
  return (
    <div>
      {" "}
      <Box className="flex space-x-2 sm:justify-end justify-center items-center ">
        <Link to="/dashboard/schools/add-school">
          <Button
            variant="default"
            className="border-primary"
            size="sm"
            icon={<Add />}>
            Add New School
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default SchoolsHeader;
