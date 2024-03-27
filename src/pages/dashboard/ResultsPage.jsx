import HeaderTitle from "@/components/dashboard/HeaderTitle";
import { Box } from "@mui/material";
import React, { useState } from "react";

import teachersImg from "../../assets/icons/results.png";
import { Typography } from "antd";

const ResultsPage = () => {
  const [class_taken, setClassTaken] = useState("");
  const [subject_taken, setSubjectTaken] = useState("");

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <Box
        className={`sm:w-[30%] w-full mt-5 bg-white sm:px-5 sm:py-4 p-3 rounded-md mb-5`}>
        <Box className="flex flex-wrap space-y-4 items-center justify-between">
          <Box className="flex items-center space-x-2">
            <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                All Results
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                OverView of results by local governments
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="overflow-x-scroll  bg-white"></Box>
    </Box>
  );
};

export default ResultsPage;
