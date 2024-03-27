import { Box, IconButton } from "@mui/material";
import { Typography } from "antd";
import React, { useEffect } from "react";
import adminImg from "../../assets/icons/admin.png";
import { sidebar } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "@mui/icons-material/Menu";
import { Close, Logout } from "@mui/icons-material";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import logo from "../../assets/images/eklogo.png";

const Sidebar = ({ setIsSidebar, isSidebar }) => {
  const location = useLocation();

  const handleSidebarToggle = () => {
    if (window.innerWidth < 767) {
      setIsSidebar(false);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    dispatch(logout());
  };
  useEffect(() => {
    window.addEventListener("resize", handleSidebarToggle);
    return () => {
      window.removeEventListener("resize", handleSidebarToggle);
    };
  }, []);

  return (
    <Box
      className="h-screen relative sidebarx overflow-y-scroll border-2 border-gray-100 bg-[#fff] "
      style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      {" "}
      <Box className="relative h-screen">
        <Box className="p-2">
          <Box
            className="flex w-full items-center sm:justify-normal justify-between py-2 bg-white space-x-2 z-10 "
            style={{ position: "sticky", top: 10, zIndex: 1000 }}>
            <img src={logo} alt="" className="sm:w-[30%] w-[15%]" />
            <Box className="text-center">
              <Typography className="capitalize sm:text-[12px] text-[18px] font-bold">
                EKITI STATE EXAMS
              </Typography>
            </Box>
            <Box className="text-center md:hidden block">
              <IconButton
                onClick={() => setIsSidebar(!isSidebar)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer">
                <Close style={{ fontSize: "35px" }} />
              </IconButton>
            </Box>
          </Box>

          <Box className="mt-2 space-x-2 flex items-center p-4 bg-[#919EAB29]">
            <img src={adminImg} alt="admin image" className="w-[30px]" />
            <Box>
              <Typography className="font-bold text-gray-600">
                Ekiti State
              </Typography>
              <Typography className="text-[10px] text-gray-500 -mt-1">
                School Admin
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className=" mt-2">
          {sidebar.map((item, index) => {
            return (
              <Box className="p-2">
                <Box>
                  <Typography className="text-black font-bold mb-1  text-[12px] uppercase">
                    {item.title}
                  </Typography>
                </Box>

                {item.content.map((item2, index2) => (
                  <Link
                    key={index2}
                    onClick={handleSidebarToggle}
                    to={item2.link}
                    className={`flex items-center space-x-2 p-3 mb-1 rounded-lg ${
                      location.pathname.includes(item2.link)
                        ? " bg-gray-100"
                        : "bg-[#fff] hover:bg-gray-100 border-[#fafafa]"
                    }     cursor-pointer`}>
                    <img
                      src={item2.Icon}
                      alt="sidebar icon"
                      className="sm:w-[16px] w-[20px]"
                      style={{
                        filter: location.pathname.includes(item2.link)
                          ? "grayscale(0%) hue-rotate(280deg)"
                          : "grayscale(100%)",
                      }}
                    />
                    <Typography className="-mt-0.5 sm:text-[12px] text-[17px] font-semibold">
                      {item2.Title}
                    </Typography>
                  </Link>
                ))}
              </Box>
            );
          })}
        </Box>

        <Box className=" absolute bottom-0 w-full space-x-4 flex items-center p-4 ">
          <Button
            variant="secondary"
            className="w-full space-x-2"
            onClick={handleLogout}>
            <Logout style={{ color: "red", fontSize: "18px" }} />
            <Typography>Logout </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
