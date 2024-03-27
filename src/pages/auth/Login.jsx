import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import LoginForm from "@/components/Forms/LoginForm";
import loginBg from "../../assets/images/bg.jpg";

const Login = () => {
  return (
    <Box className="h-screen overflow-hidden bg-[#f7f7f7] loginBg">
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Box className="text-center p-5 rounded-md bg-white sm:w-[100%] w-[100%] m-auto">
            <Typography className="sm:text-[30px] text-[20px] capitalize font-bold">
              Ekiti State School admin portal
            </Typography>
          </Box>

          <Box className="h-screen mt-24">
            <Box className=" sm:w-[79%] w-[90%] m-auto py-12 rounded-md bg-[white] shadow-md border">
              <LoginForm />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="sm:block hidden">
          <Box className="logbg h-screen"></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
