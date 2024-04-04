import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getAllStudentsFromLocalDB, removeStudentFromLocalDB } from "./db"; // Import the removeStudentFromLocalDB function
import { registerStudent } from "@/features/students/studentSlice";
import { useDispatch, useSelector } from "react-redux";

const AppContext = React.createContext();

const SyncProvider = ({ children }) => {
  const [syncing, setSyncing] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [syncedCount, setSyncedCount] = useState(0);
  const [syncingText, setSyncingText] = useState("");
  const [dbStudent, setDbStudent] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.schoolAuth);

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const syncDataWithDb = async () => {
    if (navigator.onLine) {
      setSyncing(true);
      const offlineStudents = await getAllStudentsFromLocalDB();
      setDbStudent(offlineStudents);
      if (offlineStudents.length === 0) {
        setSyncing(false);
        setSyncingText("All data are currently updated...");
      } else {
        for (const student of offlineStudents) {
          const formdata = new FormData();
          formdata.append("file", student.passportLocal);
          formdata.append("upload_preset", "kosdm4mr");

          try {
            const response = await axios.post(
              "https://api.cloudinary.com/v1_1/dir6oqkix/image/upload",
              formdata
            );

            if (response && response.data && response.data.url) {
              const registerStudentResponse = await axios.post(
                "https://api.eksexams.com/api/students",
                {
                  ...student,
                  passport: response.data.url,
                  exam_type_id: user.exam_type_id,
                },
                config
              );

              if (registerStudentResponse) {
                // Remove the student from IndexedDB after successful registration
                await removeStudentFromLocalDB(student.id);
              }
            } else {
              console.log("Error uploading passport for student:", student);
            }
          } catch (error) {
            console.error("Error uploading passport:", error);
          }
        }
        setSyncing(false);
        setSyncingText("Upload completed successfully...");
      }
    } else {
      setSyncing(false);
      console.log("Offline students:", offlineStudents);
      console.log("Can't sync, device is offline.");
    }
  };

  return (
    <AppContext.Provider
      value={{
        syncing,
        setSyncingText,
        syncingText,
        syncDataWithDb,
        setIsOnline,
        isOnline,
        dbStudent,
      }}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export const useSyncGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, SyncProvider };
