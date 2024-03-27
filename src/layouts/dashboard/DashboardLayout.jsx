import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { getRegStatus } from "@/features/auth/authSlice";
import {
  getAllRawSchools,
  getAllSchools,
} from "@/features/schoolsLga/schoolLgaSlice";
import {
  getAllStudents,
  getAllSubjects,
} from "@/features/students/studentSlice";
import { useSyncGlobalContext } from "@/lib/Context";
import SyncLoading from "@/lib/SyncLoader";
import SyncText from "@/lib/SyncText";
import { getAllStudentsFromLocalDB } from "@/lib/db";
import { Box } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const [isSidebar, setIsSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767 && isSidebar) {
        setIsSidebar(false);
      }
      if (window.innerWidth > 767) {
        setIsSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebar]);

  useLayoutEffect(() => {
    if (window.innerWidth > 767) {
      setIsSidebar(true);
    }
  }, []);

  const {
    syncDataWithDb,
    setSyncingText,
    syncing,
    syncingText,
    isOnline,
    setIsOnline,
  } = useSyncGlobalContext();
  const { students, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.students
  );
  const [dbStudent, setDBStudents] = useState();

  window.removeEventListener("online", syncDataWithDb);
  window.removeEventListener("offline", () =>
    setSyncingText("Offline mode, no network currently detected")
  );

  const fetchLocal = async () => {
    const local = await getAllStudentsFromLocalDB();

    if (local) {
      setDBStudents(local);
    }
  };

  useEffect(() => {
    if (isError && navigator.onLine === true && message.includes("Network")) {
      setSyncingText("Offline mode, no network currently detected");
      setIsOnline(false);
    }

    if (isSuccess) {
      setIsOnline(true);
    }
  }, [isError, isSuccess, navigator]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.onLine) {
      dispatch(getAllStudents());
      dispatch(getAllSubjects());
      dispatch(getAllSchools());
      dispatch(getAllRawSchools());
      dispatch(getRegStatus());
    } else {
      setSyncingText("Offline mode, no network currently detected");
    }
    fetchLocal();
  }, [navigator.online]);

  window.addEventListener("offline", () =>
    setSyncingText("Offline mode, no network currently detected")
  );
  window.addEventListener("online", () => {
    fetchLocal();
    setSyncingText("Connected, You are back online");
  });

  return (
    <div>
      <Box
        className={`flex flex-wrap h-screen overflow-y-scroll ${
          isSidebar ? "overflow-y-hidden" : "overflow-y-scroll"
        }`}>
        <Box
          data-aos="slide-right"
          data-aos-duration="1200"
          data-aos-easing="ease-in-sine"
          className={`sidebar transit  bg-white z-30 ${
            isSidebar ? "showSidebar  " : "sm:w-[0%]"
          }`}
          sx={{
            left: {
              xs: isSidebar ? "0" : "-100%",
              sm: isSidebar ? "0" : "-100%", // Keep sidebar hidden for small screens
            },
          }}>
          <Sidebar setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
        </Box>

        <Box
          className={`${
            isSidebar ? "header" : "sm:w-[100%]"
          } header transit  bg-[#919EAB29] w-[100%]`}>
          <Header
            setIsSidebar={setIsSidebar}
            isSidebar={isSidebar}
            dbStudent={dbStudent}
          />
          <Box className="relative ">
            {syncingText && <SyncText text={syncingText} />}
            <Outlet />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default DashboardLayout;
