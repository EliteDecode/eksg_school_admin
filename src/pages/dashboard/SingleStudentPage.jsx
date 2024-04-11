import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Box, Grid } from "@mui/material";
import { Typography } from "antd";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleStudents,
  getSingleStudents,
} from "@/features/students/studentSlice";
import Loader from "@/lib/Loader";
import { Table } from "react-bootstrap";
import { Button } from "@/components/ui/button";
import { deleteStudentFromLocalDB, getAllStudentsFromLocalDB } from "@/lib/db";
import { useSyncGlobalContext } from "@/lib/Context";
import { toast } from "react-toastify";
import Error from "@/lib/Error";
import { rawSchools } from "@/lib/generateContent";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const SingleStudentPage = () => {
  const dispatch = useDispatch();
  const { studentId } = useParams();
  const { isOnline } = useSyncGlobalContext();
  const { singleStudent, isError, isSuccess, isLoading, subjects, message } =
    useSelector((state) => state.students);
  const { user } = useSelector((state) => state.schoolAuth);
  const [localStudent, setLocalStudent] = useState();
  const [allLocalStudent, setAllLocalStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let subjectsApi = [];

  if (user?.exam_type_id == 1) {
    subjectsApi = subjects?.[0]?.subjects;
  } else if (user?.exam_type_id == 2) {
    subjectsApi = subjects?.[1]?.subjects;
  } else {
    subjectsApi = subjects?.[2]?.subjects;
  }

  const getLocalStudent = async () => {
    const local = await getAllStudentsFromLocalDB();

    setAllLocalStudent(local);
    setLocalStudent(local.find((student) => student.id == studentId));
  };

  const location = useLocation();

  useEffect(() => {
    if (navigator.onLine && location?.state?.synced === true) {
      dispatch(getSingleStudents(studentId));
    } else {
      getLocalStudent();
    }
  }, []);

  useEffect(() => {
    if (isSuccess && message == "deleted") {
      toast.info("Student data deleted successfully", {
        onClose: () => {
          navigate("/dashboard/students");
          setLoading(false);
        },
      });
    }
  }, [isSuccess, isError, isLoading, message]);

  const studentDetails = [
    {
      title: "Firstname",
      value:
        navigator.onLine && location?.state?.synced === true
          ? singleStudent?.firstname
          : localStudent?.firstname,
    },
    {
      title: "Lastname/Surname",
      value:
        navigator.onLine && location?.state?.synced === true
          ? singleStudent?.surname
          : localStudent?.surname,
    },
    {
      title: "Othernames",
      value:
        navigator.onLine && location?.state?.synced === true
          ? singleStudent?.othername
          : localStudent?.othername,
    },

    {
      title: "Student Access Pin",
      value:
        navigator.onLine && location?.state?.synced === true
          ? singleStudent?.pin
          : "Not assigned yet",
    },
    {
      title: "Gender",
      value:
        navigator.onLine && location?.state?.synced === true
          ? singleStudent?.gender
          : localStudent?.gender,
    },
    {
      title: "State of Origin",
      value:
        navigator.onLine && location?.state?.synced === true
          ? singleStudent?.state_of_origin
          : localStudent?.state_of_origin,
    },
    {
      title: "LGA",
      value:
        navigator.onLine && location?.state?.synced === true
          ? singleStudent?.local_government
          : localStudent?.lga,
    },
    // {
    //   title: "Placement school selected",
    //   value:
    //     navigator.onLine && location?.state?.synced === true
    //       ? singleStudent?.school_name
    //       : rawSchools.find((item) => item.id == localStudent?.placed_school_id)
    //           ?.school_name,
    // },
    {
      title: "Date of Birth",
      value: new Date(
        navigator.onLine && location?.state?.synced === true
          ? singleStudent?.date_of_birth
          : localStudent?.date_of_birth
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    {
      title: "Registered At",
      value: singleStudent?.created_at
        ? new Date(singleStudent?.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Data is still Offline",
    },
  ];

  const handleedit = () => {
    navigate(`/dashboard/edit-student/${studentId}`, {
      state: {
        student:
          location?.state?.synced === false ? localStudent : singleStudent,
        status: location?.state?.synced === false ? "offline" : "online",
      },
    });
  };

  const handleDelete = async () => {
    if (navigator.onLine && location?.state?.synced === true) {
      setLoading(true);
      dispatch(deleteSingleStudents(studentId));
    } else {
      setLoading(true);
      const deleteData = await deleteStudentFromLocalDB(studentId);
      if (deleteData) {
        toast.info("Student deleted Successfully", {
          onClose: () => {
            setLoading(false);
            navigate("/dashboard/students");
          },
        });
      }
    }
  };

  const scores = singleStudent?.scores?.filter(
    (item) => item.ca1_score !== 0 && item.ca2_score !== 0
  );

  console.log(scores);
  return (
    <Box className="p-4">
      {isLoading ? (
        <Loader />
      ) : !isLoading &&
        navigator.onLine === false &&
        location?.state?.synced === true ? (
        <Error />
      ) : (
        <>
          <Box
            className={`w-full mt-5 bg-white sm:px-5 sm:py-5 p-3 rounded-md mb-5`}>
            <Box className="flex flex-wrap justify-between space-y-4 ">
              <Box className="bg-white my-3 rounded-md p-1.5 shadow-md sm:w-[15%] w-[50%]">
                {location?.state?.synced === false && localStudent ? (
                  <img
                    src={URL.createObjectURL(localStudent?.passportLocal)}
                    alt="student Image"
                    className="rounded-md"
                  />
                ) : (
                  <img
                    src={singleStudent?.passport}
                    alt="student Image"
                    className="rounded-md"
                  />
                )}
              </Box>
              <Box className="space-x-2">
                {/* <Link
              to={{
                pathname: `/dashboard/edit-student/${studentId}`,
                state: { data: "jjjjj" },
              }}>
            </Link> */}
                <Button onClick={handleedit}>Edit Student Info</Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete student data</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Delete Student data</DialogTitle>
                      <DialogDescription>
                        You are about to delete this student data
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <Button
                        type="submit"
                        variant="destructive"
                        disabled={loading || isLoading}
                        onClick={handleDelete}>
                        {loading ? "Please wait..." : "Proceed"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Box>
            </Box>
          </Box>

          <Box className="mt-5">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="bg-white rounded-md p-5 ">
                  <Box>
                    <Box className="space-y-4">
                      {studentDetails.map((item, index) => (
                        <Box
                          key={index}
                          className="flex  items-center justify-between space-x-2">
                          <Typography className="font-bold text-[14px] text-[#000]">
                            {item.title}:
                          </Typography>
                          <Typography>{item.value}</Typography>
                        </Box>
                      ))}
                      {singleStudent?.student_code != null && (
                        <Box className="flex  items-center justify-between space-x-2">
                          <Typography className="font-bold text-[14px] text-[#000]">
                            Student Exam Number
                          </Typography>
                          <Typography>
                            {navigator.onLine &&
                            location?.state?.synced === true
                              ? singleStudent?.student_code
                              : "Not assigned yet"}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="bg-white rounded-md p-5 overflow-x-scroll">
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
                              CA1 Score
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              CA2 Score
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {singleStudent
                            ? scores?.map((item, index) => {
                                const sub = subjectsApi.find(
                                  (subject) =>
                                    subject.subject_id == item.subject_id
                                );

                                return (
                                  <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 text-left whitespace-nowrap">
                                      {sub?.subject_name}
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                      {item?.ca1_score}
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                      {item?.ca2_score}
                                    </td>
                                  </tr>
                                );
                              })
                            : localStudent?.ca_scores?.map((item, index) => {
                                const sub = subjectsApi.find(
                                  (subject) =>
                                    subject.subject_id == item.subject_id
                                );

                                return (
                                  <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 text-left whitespace-nowrap">
                                      {sub?.subject_name}
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                      {item?.ca1_score}
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                      {item?.ca2_score}
                                    </td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      </table>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SingleStudentPage;
