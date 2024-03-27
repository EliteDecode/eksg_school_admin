import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import schoolImg from "../../assets/icons/education.png";
import { Box, Grid } from "@mui/material";

import { Link, useLocation, useParams } from "react-router-dom";
import RegisterStudentForm from "@/components/Forms/RegisterStudentForm";
import EditStudentForm from "@/components/Forms/EditStudentForm";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import { getSingleStudents } from "@/features/students/studentSlice";
import { useSyncGlobalContext } from "@/lib/Context";
import { getAllStudentsFromLocalDB } from "@/lib/db";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const EditStudents = () => {
  const dispatch = useDispatch();
  const { studentId } = useParams();
  const { singleStudent, isError, isSuccess, subjects } = useSelector(
    (state) => state.students
  );
  const { isOnline } = useSyncGlobalContext();
  const { user } = useSelector((state) => state.schoolAuth);

  const [loading, setLoading] = useState(false);
  const [localStudent, setLocalStudent] = useState();

  const getLocalStudent = async () => {
    const local = await getAllStudentsFromLocalDB();
    setLoading(true);

    if (local) {
      setLocalStudent(local.find((student) => student.id == studentId));
      setLoading(false);
    }
  };
  const location = useLocation();
  useEffect(() => {
    if (navigator.onLine && location.state.status === true) {
      dispatch(getSingleStudents(studentId));
      setLoading(true);
    } else {
      getLocalStudent();
    }
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [isSuccess, isError]);

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <Box role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/dashboard/schools"
            className="hover:underline"
            style={{ fontSize: "14px" }}>
            Student Registeration
          </Link>

          <Link
            className="hover:underline"
            aria-current="page"
            style={{ fontSize: "14px" }}>
            Edit student
          </Link>
        </Breadcrumbs>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <Box className="mt-5">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Box className="bg-white rounded-md p-5 ">
                <Box>
                  <EditStudentForm localStudent={localStudent} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default EditStudents;
