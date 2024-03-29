import React, { useEffect, useState } from "react";
import { Box, IconButton, InputAdornment } from "@mui/material";
import { Typography } from "antd";
import { useFormik } from "formik";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoginSchema } from "@/lib/schemas";
import { login, reset } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.schoolAuth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        onClose: () => {
          setSubmitting(false);
        },
      });
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [isError, isSuccess, dispatch, message]);

  const formik = useFormik({
    initialValues: {
      school_code: "",
      pin: "",
      exam_type: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <Box className="sm:w-[70%] w-[90%] m-auto">
      <Box className="flex items-center justify-center">
        <Typography
          variant="h2"
          className="hr-lines text-primary font-semibold text-[22px]">
          LOGIN
        </Typography>
      </Box>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Box className="mt-5 w-full space-y-4">
            <Box>
              <Input
                placeholder="e.g. 10000001"
                name="school_code"
                value={formik.values.school_code}
                onChange={formik.handleChange}
                className="sm:text-[13px] text-[13px]"
                onBlur={formik.handleBlur}
              />
              {formik.touched.school_code && formik.errors.school_code ? (
                <span className="sm:text-[10px] text-[13px] text-red-500 leading-none">
                  (*) {formik.errors.school_code}
                </span>
              ) : null}
            </Box>
            <Box>
              <Input
                placeholder="e.g. 3tyXduU"
                name="pin"
                value={formik.values.pin}
                onChange={formik.handleChange}
                className="sm:text-[13px] text-[13px]"
                onBlur={formik.handleBlur}
              />
              {formik.touched.pin && formik.errors.pin ? (
                <span className="sm:text-[10px] text-[13px] text-red-500 leading-none">
                  (*) {formik.errors.pin}
                </span>
              ) : null}
            </Box>
            <Box>
              <Select
                onValueChange={(value) =>
                  formik.setFieldValue("exam_type", value)
                }
                name="exam_type">
                <SelectTrigger className="w-[100%] sm:text-[13px] text-[13px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Exam Type</SelectLabel>
                    {/* <SelectItem value="1">Common Entrance</SelectItem> */}
                    <SelectItem value="2">JSS3</SelectItem>
                    {/* <SelectItem value="3">SS2</SelectItem> */}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {formik.touched.exam_type && formik.errors.exam_type ? (
                <span className="sm:text-[15px] text-[13px] text-red-500 leading-none">
                  (*) {formik.errors.exam_type}
                </span>
              ) : null}
            </Box>

            <Button
              className="w-full"
              type="submit"
              disabled={!formik.isValid || isLoading}>
              {isLoading ? "Please wait..." : "Log In"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
