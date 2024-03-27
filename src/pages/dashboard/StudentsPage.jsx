import HeaderTitle from "@/components/dashboard/HeaderTitle";
import { Box, Typography } from "@mui/material"; // Combine imports from the same library
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentsFromLocalDB } from "@/lib/db";
import StudentsTables from "@/components/Tables/StudentsTables";
import teachersImg from "../../assets/icons/student.png";
import {
  getAllStudents,
  getAllSubjects,
  reset,
} from "@/features/students/studentSlice";
import { useSyncGlobalContext } from "@/lib/Context";
import Loader from "@/lib/Loader";

const StudentsPage = () => {
  const { students, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.students
  );
  const { user } = useSelector((state) => state.schoolAuth);
  const { setIsOnline, setSyncingText } = useSyncGlobalContext();
  const [localStore, setLocalStore] = useState([]);

  const dispatch = useDispatch();

  let filteredStudents = [];

  if (user?.exam_type_id == 1) {
    filteredStudents = students?.data?.CE?.students;
  } else if (user?.exam_type_id == 2) {
    filteredStudents = students?.data?.JSS3?.students;
  } else {
    filteredStudents = students?.data?.SS2?.students;
  }

  filteredStudents =
    localStore && filteredStudents
      ? [...localStore, ...filteredStudents]
      : localStore && !filteredStudents
      ? [...localStore]
      : !localStore && filteredStudents
      ? [...filteredStudents]
      : [];

  const fetchLocal = async () => {
    const store = await getAllStudentsFromLocalDB();
    if (store) {
      setLocalStore(store);
    }
  };

  useEffect(() => {
    if (navigator.onLine) {
      dispatch(getAllStudents());
      dispatch(getAllSubjects());
    } else {
      setSyncingText("Offline mode, no network currently detected");
    }
    fetchLocal();
  }, []);

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <Box
        className={`w-full mt-5 bg-white sm:px-5 sm:py-5 p-3 rounded-md mb-5`}>
        <Box className="flex flex-wrap space-y-4 items-center justify-between">
          <Box className="flex items-center space-x-2">
            <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
            <Box>
              <Typography
                className="text-primary text-[15px]"
                style={{ fontWeight: "bold" }}>
                Overview of all Students
              </Typography>
              <Typography className="text-gray-400 -mt-0.5 text-[11px]">
                All currently registered students
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="overflow-x-scroll bg-white">
          <StudentsTables
            filteredStudents={filteredStudents}
            localStore={localStore}
          />
        </Box>
      )}
    </Box>
  );
};

export default StudentsPage;
