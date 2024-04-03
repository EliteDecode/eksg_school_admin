import HeaderTitle from "@/components/dashboard/HeaderTitle";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import teachersImg from "../../assets/icons/results.png";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectAnalysis } from "@/features/students/studentSlice";
import Loader from "@/lib/Loader";
import Error from "@/lib/Error";

const SubjectAnalysis = () => {
  const { students, isError, isSuccess, message, isLoading, analysis } =
    useSelector((state) => state.students);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.schoolAuth);

  useEffect(() => {
    dispatch(getSubjectAnalysis(user?.school?.id));
  }, []);

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
                Subject Analysis
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                OverView of subjects taken by Students
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {isLoading ? (
        <Loader />
      ) : !isLoading && !analysis ? (
        <Error />
      ) : (
        <Box className="overflow-x-scroll  ">
          <Box className="bg-white sm:w-[50%] w-[100%] rounded-md p-5 overflow-x-scroll">
            <Box>
              <Box className="space-y-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="text-center">
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Count
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {analysis?.examTypes?.[0]?.subjects?.map((item, index) => {
                      return (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="px-6 py-4 text-left whitespace-nowrap">
                            {item?.name}
                          </td>

                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            {item?.student_count}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SubjectAnalysis;
