import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import schoolImg from "../../assets/icons/education.png";
import { Box, Grid } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import RegisterStudentForm from "@/components/Forms/RegisterStudentForm";
import { getRegStatus, logout } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const RegisterStudents = () => {
  const dispatch = useDispatch();
  const { user, schoolStatus, isLoading } = useSelector(
    (state) => state.schoolAuth
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (navigator.onLine) {
      dispatch(getRegStatus());
    }
  }, [navigator.onLine]);

  useEffect(() => {
    if (!schoolStatus?.is_school_active) {
      navigate("/login");
      dispatch(logout());
    }
  }, []);

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
            Register new student
          </Link>
        </Breadcrumbs>
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="mt-5">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Box className="bg-white rounded-md p-5 ">
                <Box>
                  <RegisterStudentForm />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default RegisterStudents;
