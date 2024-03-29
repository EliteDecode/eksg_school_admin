import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import overviewImg from "../assets/icons/dashboard.png";
import schoolImg from "../assets/icons/education.png";
import adminImg from "../assets/icons/admin.png";
import settings from "../assets/icons/settings-gears.png";
import profile from "../assets/icons/profile.png";
import schoolimg from "../assets/icons/education.png";
import teachersImg from "../assets/icons/teach.png";
import usersImg from "../assets/icons//man.png";
import earningsImg from "../assets/icons/card-payment.png";
import studentsImg from "../assets/icons/student.png";
import addImg from "../assets/icons/add.png";
import parentImg from "../assets/icons/parents.png";
import classesImg from "../assets/icons/online-learning.png";
import resultImg from "../assets/icons/results.png";
import calenderImg from "../assets/icons/calendar.png";
import gradeSystemImg from "../assets/icons/stadistics.png";

export const sidebar = [
  {
    title: "Overview",
    content: [
      {
        Title: "Dashboard",
        Icon: overviewImg,
        link: "home",
      },
    ],
  },
  {
    title: "User Management",
    content: [
      {
        Title: "Register Student",
        Icon: addImg,
        link: "register",
      },
      {
        Title: "All Students",
        Icon: studentsImg,
        link: "students",
      },
    ],
  },
  {
    title: "School Management",
    content: [
      // {
      //   Title: "Classes",
      //   Icon: classesImg,
      //   link: "classes",
      // },
      // {
      //   Title: "Subjects",
      //   Icon: schoolImg,
      //   link: "subjects",
      // },
      {
        Title: "Subject Analysis",
        Icon: gradeSystemImg,
        link: "subject-analysis",
      },
      {
        Title: "Broadsheet",
        Icon: classesImg,
        link: "/broadsheet",
      },

      {
        Title: "Results",
        Icon: resultImg,
        link: "results",
      },
    ],
  },
];

export const registeredSchoolsData = [
  { name: "January", uv: 0, pv: 150, amt: 150 },
  { name: "February", uv: 150, pv: 200, amt: 350 },
  { name: "March", uv: 200, pv: 180, amt: 380 },
  { name: "April", uv: 180, pv: 220, amt: 400 },
  { name: "May", uv: 220, pv: 250, amt: 470 },
  { name: "June", uv: 250, pv: 280, amt: 530 },
  { name: "July", uv: 280, pv: 300, amt: 580 },
  { name: "August", uv: 300, pv: 320, amt: 620 },
  { name: "September", uv: 320, pv: 280, amt: 600 },
  { name: "October", uv: 280, pv: 260, amt: 540 },
  { name: "November", uv: 260, pv: 230, amt: 490 },
  { name: "December", uv: 230, pv: 200, amt: 430 },
];

export const transactionsData = [
  { name: "January", uv: 0, pv: 5000, amt: 5000 },
  { name: "February", uv: 5000, pv: 7500, amt: 12500 },
  { name: "March", uv: 7500, pv: 6200, amt: 13700 },
  { name: "April", uv: 6200, pv: 6900, amt: 13100 },
  { name: "May", uv: 6900, pv: 8100, amt: 15000 },
  { name: "June", uv: 8100, pv: 7300, amt: 15400 },
  { name: "July", uv: 7300, pv: 8600, amt: 15900 },
  { name: "August", uv: 8600, pv: 9200, amt: 17800 },
  { name: "September", uv: 9200, pv: 8400, amt: 17600 },
  { name: "October", uv: 8400, pv: 7900, amt: 16300 },
  { name: "November", uv: 7900, pv: 7100, amt: 15000 },
  { name: "December", uv: 7100, pv: 6500, amt: 13600 },
];

export const usersData = [
  { name: "January", uv: 0, pv: 1800, amt: 1800 },
  { name: "February", uv: 1000, pv: 1200, amt: 2200 },
  { name: "March", uv: 1200, pv: 1100, amt: 2300 },
  { name: "April", uv: 1100, pv: 1300, amt: 2400 },
  { name: "May", uv: 1300, pv: 1500, amt: 2800 },
  { name: "June", uv: 1500, pv: 1600, amt: 3100 },
  { name: "July", uv: 1600, pv: 1700, amt: 3300 },
  { name: "August", uv: 1700, pv: 1800, amt: 3500 },
  { name: "September", uv: 1800, pv: 1700, amt: 3500 },
  { name: "October", uv: 1700, pv: 1600, amt: 3300 },
  { name: "November", uv: 1600, pv: 1400, amt: 3000 },
  { name: "December", uv: 1400, pv: 1200, amt: 2600 },
];

export const schoolsTableData = [
  {
    id: "1",
    name: "Ekiti State University",
    city: "Ado Ekiti",
    paymentStatus: "Paid",
    users: 1500,
  },
  {
    id: "2",
    name: "Federal Polytechnic Ado-Ekiti",
    city: "Ado Ekiti",
    paymentStatus: "Paid",
    users: 1200,
  },
  {
    id: "3",
    name: "College of Health Sciences and Technology, Ijero Ekiti",
    city: "Ijero Ekiti",
    paymentStatus: "Pending",
    users: 800,
  },
  {
    id: "4",
    name: "Federal University Oye-Ekiti",
    city: "Oye Ekiti",
    paymentStatus: "Paid",
    users: 2000,
  },
  {
    id: "5",
    name: "Ekiti State University Teaching Hospital, Ado Ekiti",
    city: "Ado Ekiti",
    paymentStatus: "Pending",
    users: 600,
  },
  {
    id: "6",
    name: "Afe Babalola University",
    city: "Ado Ekiti",
    paymentStatus: "Paid",
    users: 1800,
  },
  {
    id: "7",
    name: "Ekiti State College of Agriculture and Technology, Isan Ekiti",
    city: "Isan Ekiti",
    paymentStatus: "Paid",
    users: 500,
  },
  {
    id: "8",
    name: "Federal Government Girls' College, Efon-Alaaye",
    city: "Efon-Alaaye",
    paymentStatus: "Pending",
    users: 300,
  },
  {
    id: "9",
    name: "Ekiti Anglican Diocese Comprehensive High School, Ado Ekiti",
    city: "Ado Ekiti",
    paymentStatus: "Paid",
    users: 700,
  },
  {
    id: "10",
    name: "Divine Mercy College, Ado-Ekiti",
    city: "Ado Ekiti",
    paymentStatus: "Paid",
    users: 400,
  },
  {
    id: "11",
    name: "Comprehensive High School, Ayede Ekiti",
    city: "Ayede Ekiti",
    paymentStatus: "Pending",
    users: 200,
  },
  {
    id: "12",
    name: "Olaoluwa Muslim Grammar School, Ado Ekiti",
    city: "Ado Ekiti",
    paymentStatus: "Paid",
    users: 1000,
  },
  {
    id: "13",
    name: "Baptist High School, Igede Ekiti",
    city: "Igede Ekiti",
    paymentStatus: "Pending",
    users: 450,
  },
  {
    id: "14",
    name: "Ekiti Parapo College, Ido Ekiti",
    city: "Ido Ekiti",
    paymentStatus: "Paid",
    users: 550,
  },
  {
    id: "15",
    name: "Holy Child College, Ikere Ekiti",
    city: "Ikere Ekiti",
    paymentStatus: "Paid",
    users: 650,
  },
];

export const NotificationDashboard = [
  {
    title: "New Class Added",
    admin: "Tope Alabi",
    timeline: "3 hours ago",
  },
  {
    title: "Student Enrollment",
    admin: "Sammy Jamilola",
    timeline: "Yesterday",
  },
  {
    title: "Assignment Submission",
    admin: "Tope Alabi",
    timeline: "2 days ago",
  },
  {
    title: "Exam Reminder",
    admin: "Damilola Yetunde",
    timeline: "3 days ago",
  },
  {
    title: "Teacher Announcement",
    admin: "Johnson Babalola",
    timeline: "1 week ago",
  },
  // {
  //   title: "Upcoming Event",
  //   admin: "Don't forget the Science Fair coming up on Friday!",
  //   timeline: "2 weeks ago",
  // },
  // {
  //   title: "Parent-Teacher Meeting",
  //   description:
  //     "Reminder: Parent-teacher meetings scheduled for next Thursday. Please sign up.",
  //   timeline: "3 weeks ago",
  // },
];

export const teachersData = [
  {
    id: 1,
    firstname: "Chinwe",
    lastname: "Okafor",
    email: "chinwe.okafor@example.com",
    phonenumber: "+2348012345678",
    gender: "female",
    classes_taken: ["JSS1", "JSS2", "SS1", "SS2"].join(", "),
    subjects_taken: ["Mathematics", "Physics"].join(", "),
    class_teacher: "JSS1",
  },
  {
    id: 2,
    firstname: "Yusuf",
    lastname: "Abubakar",
    email: "yusuf.abubakar@example.com",
    phonenumber: "+2348023456789",
    gender: "male",
    classes_taken: ["JSS1", "JSS3", "SS1", "SS2"].join(", "),
    subjects_taken: ["English", "Biology"].join(", "),
    class_teacher: "JSS3",
  },
  {
    id: 3,
    firstname: "Olamide",
    lastname: "Adebayo",
    email: "olamide.adebayo@example.com",
    phonenumber: "+2348034567890",
    gender: "female",
    classes_taken: ["JSS1", "JSS2", "SS2"].join(", "),
    subjects_taken: ["Chemistry", "Economics"].join(", "),
    class_teacher: "SS2",
  },
  {
    id: 4,
    firstname: "Emeka",
    lastname: "Okonkwo",
    email: "emeka.okonkwo@example.com",
    phonenumber: "+2348045678901",
    gender: "male",
    classes_taken: ["JSS2", "SS1", "SS2"].join(", "),
    subjects_taken: ["Geography", "History"].join(", "),
    class_teacher: "SS1",
  },
  {
    id: 5,
    firstname: "Bisi",
    lastname: "Adewale",
    email: "bisi.adewale@example.com",
    phonenumber: "+2348056789012",
    gender: "female",
    classes_taken: ["JSS1", "SS1"].join(", "),
    subjects_taken: ["French", "Agricultural Science"].join(", "),
    class_teacher: "JSS1",
  },
  {
    id: 6,
    firstname: "Yakubu",
    lastname: "Mohammed",
    email: "yakubu.mohammed@example.com",
    phonenumber: "+2348067890123",
    gender: "male",
    classes_taken: ["JSS2", "SS2"].join(", "),
    subjects_taken: ["Government", "Commerce"].join(", "),
    class_teacher: "JSS2",
  },
  {
    id: 7,
    firstname: "Adaeze",
    lastname: "Nwosu",
    email: "adaeze.nwosu@example.com",
    phonenumber: "+2348078901234",
    gender: "female",
    classes_taken: ["JSS3", "SS1"].join(", "),
    subjects_taken: ["Literature", "Fine Arts"].join(", "),
    class_teacher: "SS1",
  },
  {
    id: 8,
    firstname: "Ibrahim",
    lastname: "Ogundipe",
    email: "ibrahim.ogundipe@example.com",
    phonenumber: "+2348089012345",
    gender: "male",
    classes_taken: ["JSS1", "SS1"].join(", "),
    subjects_taken: ["Computer Science", "Technical Drawing"].join(", "),
    class_teacher: "SS1",
  },
  {
    id: 9,
    firstname: "Folake",
    lastname: "Olaniyan",
    email: "folake.olaniyan@example.com",
    phonenumber: "+2348090123456",
    gender: "female",
    classes_taken: ["SS1", "SS2"].join(", "),
    subjects_taken: ["Home Economics", "Physical Education"].join(", "),
    class_teacher: "SS2",
  },
  {
    id: 10,
    firstname: "Chukwudi",
    lastname: "Eze",
    email: "chukwudi.eze@example.com",
    phonenumber: "+2348101234567",
    gender: "male",
    classes_taken: ["JSS2", "SS2"].join(", "),
    subjects_taken: ["Civic Education", "Health Education"].join(", "),
    class_teacher: "JSS2",
  },
  {
    id: 11,
    firstname: "Amina",
    lastname: "Yahaya",
    email: "amina.yahaya@example.com",
    phonenumber: "+2348112345678",
    gender: "female",
    classes_taken: ["JSS3", "SS1"].join(", "),
    subjects_taken: ["Islamic Studies", "Christian Religious Studies"].join(
      ", "
    ),
    class_teacher: "SS1",
  },
  {
    id: 12,
    firstname: "Tunde",
    lastname: "Adekunle",
    email: "tunde.adekunle@example.com",
    phonenumber: "+2348123456789",
    gender: "male",
    classes_taken: ["JSS3", "SS2"].join(", "),
    subjects_taken: ["Yoruba", "Igbo"].join(", "),
    class_teacher: "SS2",
  },
  {
    id: 13,
    firstname: "Blessing",
    lastname: "Ibrahim",
    email: "blessing.ibrahim@example.com",
    phonenumber: "+2348134567890",
    gender: "female",
    classes_taken: ["JSS2", "SS2"].join(", "),
    subjects_taken: ["Music", "Visual Arts"].join(", "),
    class_teacher: "JSS2",
  },
  {
    id: 14,
    firstname: "Nnamdi",
    lastname: "Okafor",
    email: "nnamdi.okafor@example.com",
    phonenumber: "+2348145678901",
    gender: "male",
    classes_taken: ["JSS1", "SS1"].join(", "),
    subjects_taken: ["Basic Science", "Basic Technology"].join(", "),
    class_teacher: "JSS1",
  },
  {
    id: 15,
    firstname: "Toyin",
    lastname: "Ojo",
    email: "toyin.ojo@example.com",
    phonenumber: "+2348156789012",
    gender: "female",
    classes_taken: ["SS1", "SS2"].join(", "),
    subjects_taken: ["Government", "Literature"].join(", "),
    class_teacher: "SS2",
  },
  {
    id: 16,
    firstname: "Usman",
    lastname: "Aliyu",
    email: "usman.aliyu@example.com",
    phonenumber: "+2348167890123",
    gender: "male",
    classes_taken: ["JSS1", "JSS3", "SS1"].join(", "),
    subjects_taken: ["Physics", "Chemistry"].join(", "),
    class_teacher: "JSS3",
  },
  {
    id: 17,
    firstname: "Aisha",
    lastname: "Bello",
    email: "aisha.bello@example.com",
    phonenumber: "+2348178901234",
    gender: "female",
    classes_taken: ["JSS1", "SS1", "SS2"].join(", "),
    subjects_taken: ["Biology", "English"].join(", "),
    class_teacher: "SS1",
  },
  {
    id: 18,
    firstname: "Chinedu",
    lastname: "Okeke",
    email: "chinedu.okeke@example.com",
    phonenumber: "+2348189012345",
    gender: "male",
    classes_taken: ["JSS2", "SS2"].join(", "),
    subjects_taken: ["Agricultural Science", "French"].join(", "),
    class_teacher: "JSS2",
  },
  {
    id: 19,
    firstname: "Bimpe",
    lastname: "Olawale",
    email: "bimpe.olawale@example.com",
    phonenumber: "+2348190123456",
    gender: "female",
    classes_taken: ["JSS3", "SS1"].join(", "),
    subjects_taken: ["Economics", "Chemistry"].join(", "),
    class_teacher: "SS1",
  },
  {
    id: 20,
    firstname: "Abdul",
    lastname: "Suleiman",
    email: "abdul.suleiman@example.com",
    phonenumber: "+2348201234567",
    gender: "male",
    classes_taken: ["JSS1", "JSS2", "SS1", "SS2"].join(", "),
    subjects_taken: ["Mathematics", "Biology"].join(", "),
    class_teacher: "JSS1",
  },
];

export const subjectsList = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Economics",
  "Agricultural Science",
  "Commerce",
  "Government",
  "Civic Education",
  "Fine Arts",
  "Islamic Studies",
  "Christian Religious Studies",
  "Technical Drawing",
  "Home Economics",
  "Physical Education",
  "Music",
  "Visual Arts",
  "Basic Science",
  "Basic Technology",
  "Yoruba",
  "Igbo",
  "French",
  "Computer Science",
  "Literature",
  "Health Education",
  "Music",
  "Visual Arts",
  "Technical Drawing",
];

export const admins = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    status: 1, // Active
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    status: 0, // Inactive
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alexjohnson@example.com",
    status: 1, // Active
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emilybrown@example.com",
    status: 1, // Active
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michaelwilson@example.com",
    status: 0, // Inactive
  },
];
