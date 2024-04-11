import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, InputAdornment } from "@mui/material";
import { Typography } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from "../ui/input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { registerStudentSchema, updateEditStudentSchema } from "@/lib/schemas";
import { addStudentToLocalDB, updateStudentInLocalDB } from "@/lib/db";
import axios from "axios";
import {
  registerStudent,
  reset,
  updateSingleStudent,
} from "@/features/students/studentSlice";
import passport from "../../assets/images/passport.png";
import { useSyncGlobalContext } from "@/lib/Context";
import { LGAS, nigerianStates } from "@/lib/generateContent";

const EditStudentForm = ({ localStudent }) => {
  const {
    isLoading,
    isError,
    isSuccess,
    singleStudent,
    message,
    subjects: subjectApi,
  } = useSelector((state) => state.students);
  const { user, schoolStatus } = useSelector((state) => state.schoolAuth);
  const { lgaSchools } = useSelector((state) => state.schoolsLga);
  const [state, setState] = useState();
  const [profile, setProfile] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { setSyncingText, isOnline } = useSyncGlobalContext();
  const [placementLga, setPlacementLGA] = useState();
  let subjects = [];

  const [backgroundDetected, setBackgroundDetected] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pixelData = ctx.getImageData(0, 0, 1, 1).data;
        const [red, green, blue] = pixelData;

        // Check if the background color is red
        if (red > 200 && green < 100 && blue < 100) {
          setBackgroundDetected(true);
          formik.setFieldValue("passportLocal", event.target.files[0]);
        } else {
          setBackgroundDetected(false);
          formik.setFieldValue("passportLocal", "");
        }
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  if (user?.exam_type_id == 1) {
    subjectApi?.[0].subjects?.map((item) => {
      subjects.push({
        id: item.subject_id,
        name: item.subject_name,
        compulsory: item.is_compulsory == "1" ? true : false,
      });
    });
  } else if (user?.exam_type_id == 2) {
    subjectApi?.[1].subjects?.map((item) => {
      subjects.push({
        id: item.subject_id,
        name: item.subject_name,
        compulsory: item.is_compulsory == "1" ? true : false,
      });
    });
  } else {
    subjectApi?.[2].subjects?.map((item) => {
      subjects.push({
        id: item.subject_id,
        name: item.subject_name,
        compulsory: item.is_compulsory == "1" ? true : false,
      });
    });
  }
  const { studentId } = useParams();
  const location = useLocation();

  const [subjectScores, setSubjectScores] = useState(
    location.state.status == "offline"
      ? location.state.student.ca_scores?.map((subject) => ({
          subject_id: subject.subject_id,
          ca1_score: subject.ca1_score,
          ca2_score: subject.ca2_score,
          id: subject.id,
          compulsory: subject.compulsory,
        }))
      : location.state.student.scores?.map((subject) => ({
          subject_id: subject.subject_id,
          ca1_score: subject.ca1_score,
          ca2_score: subject.ca2_score,
          id: subject.id,
          compulsory: subject.compulsory,
        }))
  );

  const handleSelectChange = (index, value) => {
    const newScores = [...subjectScores];
    newScores[index].subject_id = value;
    setSubjectScores(newScores);

    subjects = subjects.filter((subject) => subject.id != value);
  };

  useEffect(() => {
    const filteredSubjects = subjectScores?.filter(
      (subject) =>
        subject.ca1_score !== "" &&
        subject.ca2_score !== "" &&
        subject.ca1_score !== 0 &&
        subject.ca2_score !== 0
    );

    const checkFiltered = filteredSubjects?.find(
      (subject) => subject.ca1_score > 20 || subject.ca2_score > 20
    );

    if (checkFiltered) {
      formik.setFieldValue("ca_scores", []);
    } else {
      formik.setFieldValue("ca_scores", filteredSubjects);
    }
  }, [subjectScores]);

  useEffect(() => {
    if (isSuccess && message === "student added successfully") {
      toast.success("Student updated successfully", {
        onClose: () => {
          dispatch(reset());
          navigate("/dashboard/students");
        },
      });
    }

    if (isError && navigator.onLine === true && message.includes("Network")) {
      setSyncingText("Offline mode, no network currently detected");
    } else if (isError && navigator.onLine === true) {
      toast.info("Something went wrong", {
        onClose: () => {
          dispatch(reset());
        },
      });
    }

    if (isSuccess || isError) {
      dispatch(reset());
    }
  }, [isLoading, isError, isLoading, dispatch, message]);

  const formik = useFormik({
    initialValues: {
      firstname:
        location.state.status == "online"
          ? singleStudent?.firstname
          : localStudent?.firstname,
      surname:
        location.state.status == "online"
          ? singleStudent?.surname
          : localStudent?.surname,
      othername:
        location.state.status == "online"
          ? singleStudent?.othername
          : localStudent?.othername,
      date_of_birth:
        location.state.status == "online"
          ? singleStudent?.date_of_birth
          : localStudent?.date_of_birth,
      state_of_origin:
        location.state.status == "online"
          ? singleStudent?.state_of_origin
          : localStudent?.state_of_origin,
      lga:
        location.state.status == "online"
          ? singleStudent?.local_government
          : localStudent?.lga,
      exam_type_id: "",
      passportLocal:
        location.state.status == "online"
          ? singleStudent?.passport
          : localStudent?.passportLocal,
      gender:
        location.state.status == "online"
          ? singleStudent?.gender
          : localStudent?.gender,
      placed_school_id:
        location.state.status == "online"
          ? singleStudent?.placed_school_id
          : localStudent?.placed_school_id || 0,
      placed_school_lga:
        location.state.status == "online"
          ? singleStudent?.placed_school_lga
          : localStudent?.placed_school_lga || "Not applicable",

      ca_scores:
        location.state.status == "online"
          ? singleStudent?.scores
          : localStudent?.ca_scores || [],
    },
    validationSchema: updateEditStudentSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (navigator.onLine) {
        setLoading(true);

        if (!values.passportLocal.lastModified) {
          dispatch(
            updateSingleStudent({
              ...values,
              passport: values.passportLocal,
              exam_type_id: user?.exam_type_id,
              studentId: studentId,
            })
          );
        } else {
          const formdata = new FormData();
          formdata.append("file", values.passportLocal);
          formdata.append("upload_preset", "qrvk52is");

          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dxtucu8tl/image/upload",
            formdata
          );

          if (response) {
            setLoading(false);
            dispatch(
              updateSingleStudent({
                ...values,
                passport: response?.data?.url,
                exam_type_id: user?.exam_type_id,
                studentId: studentId,
              })
            );
          }
        }
      } else {
        setLoading(true);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        const editLocal = updateStudentInLocalDB(studentId, values);

        if (editLocal) {
          toast.info("Student updated Successfully", {
            onClose: () => {
              setLoading(false);
              navigate("/dashboard/students");
            },
          });
        }
      }
    },
  });

  return (
    <Box className="">
      <Box>
        <form onSubmit={formik.handleSubmit}>
          {singleStudent ? (
            <img
              src={singleStudent?.passport}
              alt=""
              className="h-[120px] w-[110px] mt-1 rounded-md"
            />
          ) : localStudent ? (
            <img
              src={URL.createObjectURL(localStudent?.passportLocal)}
              alt="student Image"
              className="h-[120px] w-[110px] mt-1 rounded-md"
            />
          ) : (
            <img
              src={profile || passport}
              alt=""
              className="h-[120px] w-[110px] mt-1 rounded-md"
            />
          )}

          {backgroundDetected ? (
            <p className="text-[12px]" style={{ color: "green" }}>
              Background is red - Accepted
            </p>
          ) : (
            <p className="text-[12px]" style={{ color: "red" }}>
              Background color of passport MUST be red
            </p>
          )}

          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6}>
              <Box className="mt-5 w-full">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box className="">
                      <Label className="text-[11px]" htmlFor="firstname">
                        Firstname {location.state.status}
                      </Label>
                      <Input
                        placeholder="e.g. Adekunle"
                        name="firstname"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        className="text-[12px]"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.firstname && formik.errors.firstname ? (
                        <span
                          className="text-[10px] text-red-500 -mt-2 leading-none"
                          style={{ fontSize: "10px" }}>
                          (*) {formik.errors.firstname}
                        </span>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box className="">
                      <Label className="text-[11px]" htmlFor="surname">
                        Surname
                      </Label>
                      <Input
                        placeholder="e.g. Kunle"
                        name="surname"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        className="text-[12px]"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.surname && formik.errors.surname ? (
                        <span
                          className="text-[10px] text-red-500 -mt-2 leading-none"
                          style={{ fontSize: "10px" }}>
                          (*) {formik.errors.surname}
                        </span>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box className="">
                      <Label className="text-[11px]" htmlFor="othernames">
                        Other names
                      </Label>
                      <Input
                        placeholder="e.g. Ajayi"
                        name="othername"
                        value={formik.values.othername}
                        onChange={formik.handleChange}
                        className="text-[12px]"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.othername && formik.errors.othername ? (
                        <span
                          className="text-[10px] text-red-500 -mt-2 leading-none"
                          style={{ fontSize: "10px" }}>
                          (*) {formik.errors.othername}
                        </span>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box className="">
                      <Label className="text-[11px]" htmlFor="date_of_birth">
                        Date of Birth
                      </Label>
                      <Input
                        placeholder="e.g. Ajayi"
                        name="date_of_birth"
                        type="date"
                        value={formik.values.date_of_birth}
                        onChange={formik.handleChange}
                        className="text-[12px]"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.date_of_birth &&
                      formik.errors.date_of_birth ? (
                        <span
                          className="text-[10px] text-red-500 -mt-2 leading-none"
                          style={{ fontSize: "10px" }}>
                          (*) {formik.errors.date_of_birth}
                        </span>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box className="">
                      <Label className="text-[11px]" htmlFor="state_of_origin">
                        State of Origin
                      </Label>
                      <Select
                        name="state_of_origin"
                        value={formik.values.state_of_origin}
                        onValueChange={(value) => {
                          formik.setFieldValue("state_of_origin", value);
                          setState(value);
                        }}
                        className="text-[12px]">
                        <SelectTrigger className="w-[100%] text-xs">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>State of Origin</SelectLabel>
                            {nigerianStates?.map((item, index) => (
                              <SelectItem value={item} key={index}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {formik.touched.state_of_origin &&
                      formik.errors.state_of_origin ? (
                        <span
                          className="text-[10px] text-red-500 -mt-2 leading-none"
                          style={{ fontSize: "10px" }}>
                          (*) {formik.errors.state_of_origin}
                        </span>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box className="">
                      <Label className="text-[11px]" htmlFor="lga">
                        Local Government Area
                      </Label>
                      <Select
                        name="lga"
                        value={formik.values.lga}
                        onValueChange={(value) =>
                          formik.setFieldValue("lga", value)
                        }
                        className="text-[12px]">
                        <SelectTrigger className="w-[100%] text-xs">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>
                              Local Government of Origin
                            </SelectLabel>
                            {LGAS[formik.values.state_of_origin]?.map(
                              (item, index) => (
                                <SelectItem value={item} key={index}>
                                  {item}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {formik.touched.lga && formik.errors.lga ? (
                        <span
                          className="text-[10px] text-red-500 -mt-2 leading-none"
                          style={{ fontSize: "10px" }}>
                          (*) {formik.errors.lga}
                        </span>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Label className="text-[11px]" htmlFor="gender">
                      Gender
                    </Label>
                    <Select
                      name="gender"
                      value={formik.values.gender}
                      onValueChange={(value) =>
                        formik.setFieldValue("gender", value)
                      }
                      values={formik.values.gender}
                      className="text-[12px]">
                      <SelectTrigger className="w-[100%] text-xs">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Gender</SelectLabel>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Label className="text-[11px]" htmlFor="lga">
                      Students Passport
                    </Label>
                    <Input
                      accept="image/*"
                      id="passportLocal"
                      name="passportLocal"
                      type="file"
                      onChange={(event) => {
                        // formik.setFieldValue(
                        //   "passportLocal",
                        //   event.currentTarget.files[0]
                        // );
                        handleImageUpload(event);
                        // Display the chosen picture beneath the form
                        setProfile(
                          URL.createObjectURL(event.currentTarget.files[0])
                        );
                      }}
                      onClick={(event) => {
                        event.target.value = null; // Reset the input value on click to allow reselection of the same file
                      }}
                    />

                    {formik.touched.passportLocal &&
                    formik.errors.passportLocal ? (
                      <span
                        className="text-[10px] text-red-500 -mt-2 leading-none"
                        style={{ fontSize: "10px" }}>
                        (*) {formik.errors.passportLocal}
                      </span>
                    ) : null}
                  </Grid>
                  {user?.exam_type_id == 1 && (
                    <>
                      <Grid item xs={12} sm={12} md={6}>
                        <Box className="">
                          <Label
                            className="text-[11px]"
                            htmlFor="placed_school_lga">
                            LGA of Placement School
                          </Label>
                          <Select
                            name="placed_school_lga"
                            value={formik.values.placed_school_lga}
                            onValueChange={(value) => {
                              formik.setFieldValue("placed_school_lga", value);
                              setPlacementLGA(value);
                            }}
                            className="text-[12px]">
                            <SelectTrigger className="w-[100%] text-xs">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Placement LGA</SelectLabel>
                                {lgaSchools.map((item, index) => (
                                  <SelectItem value={item.name} key={index}>
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {formik.touched.placed_school_lga &&
                          formik.errors.placed_school_lga ? (
                            <span
                              className="text-[10px] text-red-500 -mt-2 leading-none"
                              style={{ fontSize: "10px" }}>
                              (*) {formik.errors.placed_school_lga}
                            </span>
                          ) : null}
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <Box className="">
                          <Label
                            className="text-[11px]"
                            htmlFor="placed_school_id">
                            Placement School
                          </Label>
                          <Select
                            name="placed_school_id"
                            value={formik.values.id}
                            onValueChange={(value) =>
                              formik.setFieldValue("placed_school_id", value)
                            }
                            className="text-[12px]">
                            <SelectTrigger className="w-[100%] text-xs">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Placement School</SelectLabel>
                                {lgaSchools
                                  .filter(
                                    (item) =>
                                      item.name ===
                                      formik.values.placed_school_lga
                                  ) // Filter schools based on chosen name
                                  ?.map((item) =>
                                    item.schools.map((school, index) => (
                                      <SelectItem
                                        value={school.school_id.toString()}
                                        key={index}>
                                        {school.name}
                                      </SelectItem>
                                    ))
                                  )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {formik.touched.placed_school_id &&
                          formik.errors.placed_school_id ? (
                            <span
                              className="text-[10px] text-red-500 -mt-2 leading-none"
                              style={{ fontSize: "10px" }}>
                              (*) {formik.errors.placed_school_id}
                            </span>
                          ) : null}
                        </Box>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box className="overflow-x-scroll">
                <Typography variant="subtitle1" gutterBottom>
                  Test Scores
                </Typography>
                {formik.touched.ca_scores && formik.errors.ca_scores ? (
                  <span
                    className="text-[10px] text-red-500 -mt-2 leading-none"
                    style={{ fontSize: "10px" }}>
                    (*) {formik.errors.ca_scores}
                  </span>
                ) : null}
                <Box>
                  {subjectScores?.map((score, index) => {
                    const isCompulsory = subjects.find(
                      (subject) => subject.id == score.subject_id
                    );

                    return (
                      <Box className="flex items-center space-x-2">
                        <Box>
                          <Label
                            className="text-[11px]"
                            htmlFor={`ca2_score_${index}`}>
                            Subjects
                          </Label>

                          {isCompulsory?.compulsory ? (
                            <Input
                              placeholder={isCompulsory?.name}
                              value={score.name}
                              className="w-[150px] text-xs"
                              readOnly
                            />
                          ) : (
                            <Select
                              name="status"
                              value={score.subject_id.toString()}
                              onValueChange={(value) =>
                                handleSelectChange(index, value)
                              }
                              className="text-[12px]">
                              <SelectTrigger className="w-[150px] text-xs">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Subjects</SelectLabel>
                                  {subjects.map((subject) => (
                                    <SelectItem
                                      key={subject.id}
                                      value={subject.id.toString()}>
                                      {subject.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        </Box>

                        <Box>
                          <Label
                            className="text-[11px]"
                            htmlFor={`ca1_score_${index}`}>
                            CA1
                          </Label>
                          <Input
                            placeholder="Enter CA1 score"
                            name={`ca1_score_${index}`}
                            value={score.ca1_score}
                            onChange={(e) => {
                              const inputValue = parseInt(e.target.value) || 0;
                              const newScores = [...subjectScores];
                              newScores[index].ca1_score = inputValue;
                              setSubjectScores(newScores);
                            }}
                            className="text-[12px] sm:w-[150px] w-[100%]"
                          />
                        </Box>
                        <Box>
                          <Label
                            className="text-[11px]"
                            htmlFor={`ca2_score_${index}`}>
                            CA2
                          </Label>
                          <Input
                            placeholder="Enter CA2 score"
                            name={`ca2_score_${index}`}
                            value={score.ca2_score}
                            onChange={(e) => {
                              const inputValue = parseInt(e.target.value) || 0;
                              const newScores = [...subjectScores];
                              newScores[index].ca2_score = inputValue;
                              setSubjectScores(newScores);
                            }}
                            className="text-[12px] sm:w-[150px] w-[100%]"
                          />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box className="flex justify-end space-x-2 mt-10">
            {schoolStatus?.is_registration_active === false ? (
              <Box className="flex justify-end p-5 mt-10 bg-red-800 rounded-md ">
                <Typography className="text-white">
                  <span className="text-white-800">(*)</span> Registeration is
                  currenly closed
                </Typography>
              </Box>
            ) : (
              <Button
                type=""
                disabled={loading || isLoading}
                onClick={formik.handleSubmit}>
                {loading || isLoading ? "Please wait..." : " Edit Student"}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EditStudentForm;
