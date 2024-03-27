import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, Grid } from "@mui/material";
import dashboadImg from "../../assets/icons/dashboard.png";
import { Typography } from "antd";
import HeaderTitle from "@/components/dashboard/HeaderTitle";
import studentsImg from "../../assets/icons/student.png";
import AreaChartComp from "../../components/Charts/AreaChartComp";
import { usersData } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";

import Loader from "@/lib/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  getAllStudents,
  getAllStudentsSheets,
  getAllSubjects,
} from "@/features/students/studentSlice";
import { getAllStudentsFromLocalDB } from "@/lib/db";

const DashboardHomePage = () => {
  const { students, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.students
  );
  const { user } = useSelector((state) => state.schoolAuth);

  const HomeCardContentsStudents = [
    {
      title: "Total Students (Primary)",
      description: students?.data?.CE?.total,
      image: studentsImg,
      buttonText: "View Students",
      link: "students",
      cat: "1",
    },
    {
      title: "Total Students (JSS3)",
      description: students?.data?.JSS3?.total,
      image: studentsImg,
      buttonText: "View Students",
      link: "students",
      cat: "2",
    },
    {
      title: "Total Students (SS3)",
      description: students?.data?.SS2?.total,
      image: studentsImg,
      buttonText: "View Students",
      link: "students",
      cat: "3",
    },
  ];

  const dispatch = useDispatch();

  const fetchLocal = async () => {
    const store = await getAllStudentsFromLocalDB();
    if (store) {
      setLocalStore(store);
    }
  };

  useEffect(() => {
    if (navigator.onLine === true) {
      dispatch(getAllStudents());
      dispatch(getAllSubjects());
      dispatch(getAllStudentsSheets(user?.school?.id));
    }
    fetchLocal();
  }, []);

  console.log(navigator.onLine);

  return (
    <Box className="sm:p-5 p-3 relative">
      <Box
        className="flex items-center z-0 space-x-2 bg-white p-5 rounded-md"
        style={{ zIndex: 0 }}>
        <img src={dashboadImg} alt="dashboard icon" className="w-[32px]" />

        <Box>
          <Typography
            className="text-primary text-[15px]"
            style={{ fontWeight: "bold" }}>
            {user?.school?.school_name}
          </Typography>
          <Typography className="text-gray-400 -mt-0.5 text-[11px]">
            Showing all data in the school
          </Typography>
        </Box>
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid container>
          <Grid item sm={12} md={12}>
            <Box>
              <Typography className="my-2 text-[13px] font-bold">
                All Students Data
              </Typography>
              <Grid container spacing={2}>
                {HomeCardContentsStudents.map((item, index) => (
                  <Grid item xs={12} sm={12} md={4} key={index} className="">
                    <Card className="border-none">
                      <Box className="flex justify-between items-center">
                        <CardHeader>
                          <CardTitle className="text-[12px]">
                            {item.title}
                          </CardTitle>
                          <CardDescription className="text-primary font-semibold">
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                        <Box className="p-6">
                          <img
                            src={item.image}
                            alt=" image"
                            className="w-[32px]"
                          />
                        </Box>
                      </Box>

                      {user?.exam_type_id == item.cat ? (
                        <Link to="/dashboard/students">
                          <CardFooter>
                            <Button size="sm" variant="secondary">
                              {item.buttonText}
                            </Button>
                          </CardFooter>
                        </Link>
                      ) : (
                        <CardFooter>
                          <Button disabled={true} size="sm" variant="secondary">
                            {item.buttonText}
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Grid container className="mt-5">
              <Grid item xs={12} sm={12} md={12}>
                <Box className="sm:h-[55vh] h-[45vh] py-5 bg-white rounded-md">
                  <Typography className="text-[14px] p-5 mb-5 font-semibold uppercase text-primary">
                    Overview of Schools
                  </Typography>
                  <AreaChartComp
                    data={usersData}
                    stroke="#87CEEB"
                    fill="#87CEEB"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DashboardHomePage;
