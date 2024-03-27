import BroadSheetTable from "@/components/Tables/BroadsheetTable";
import { Button } from "@/components/ui/button";
import { Box } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { usePDF } from "react-to-pdf";

const Broadsheet = () => {
  const { broadsheet } = useSelector((state) => state.students);
  const { toPDF, targetRef } = usePDF({
    filename: `${broadsheet?.school?.school_code}.pdf`,
  });

  return (
    <>
      <Box className="w-[90%] m-auto mt-5">
        <Button onClick={() => toPDF()}>Download PDF</Button>
      </Box>
      <Box className="w-[90%] m-auto my-5" ref={targetRef}>
        <Box className="text-center py-5">
          <Typography className="font-black text-[20px]">
            {broadsheet?.school?.name}
          </Typography>
          <Typography className=" text-[16px]">
            Local Government: {broadsheet?.school?.local_governement}
          </Typography>
          <Typography className=" text-[16px]">
            School Code: {broadsheet?.school?.school_code}
          </Typography>
          <Typography className=" text-[16px]">
            Exam Type:{" "}
            {broadsheet?.school?.exam_type == "CE"
              ? "Common Entrance/Placement Exams"
              : broadsheet?.school?.exam_type == "JSS3"
              ? "Junior Waec (JSS3)"
              : "Preparation Exam (SS2)"}
          </Typography>
        </Box>
        <Box className="mt-10">
          <BroadSheetTable />
        </Box>
      </Box>
    </>
  );
};

export default Broadsheet;
