import Dexie from "dexie";

const user = JSON.parse(localStorage.getItem("SchoolAdminUser"));

// Define IndexedDB database
const db = new Dexie(`school_db_${user?.school?.school_code}`);
db.version(1).stores({
  students:
    "++id, firstname, lastname, othername, date_of_birth, state_of_origin, lga, exam_type_id, passport,placed_school_lga, placed_school_id,  ca_scores",
});

// Add a student to IndexedDB
export const addStudentToLocalDB = async (studentData) => {
  // Get current students data from IndexedDB
  const currentStudents = await getAllStudentsFromLocalDB();

  // Add new student data to the array
  const updatedStudents = [...currentStudents, studentData];

  // Store the updated array in IndexedDB
  await db.students.clear(); // Clear the existing data
  await db.students.bulkAdd(updatedStudents); // Add the updated data
};

// Remove a student from IndexedDB
export const removeStudentFromLocalDB = async (studentId) => {
  await db.students.delete(studentId); // Delete the student with the specified ID
};

// Get all students from IndexedDB
export const getAllStudentsFromLocalDB = async () => {
  return await db.students.toArray();
};

// Update student data in IndexedDB
export const updateStudentInLocalDB = async (studentId, updatedData) => {
  console.log("Updating student with ID:", studentId);

  // Get current students data from IndexedDB
  const currentStudents = await getAllStudentsFromLocalDB();
  console.log("Current students:", currentStudents);

  // Find the student to update
  const studentIndex = currentStudents.findIndex(
    (student) => student.id == studentId
  );
  console.log("Student index:", studentIndex);

  if (studentIndex === -1) {
    throw new Error("Student not found");
  }

  // Update the student data
  const updatedStudents = [...currentStudents];
  updatedStudents[studentIndex] = {
    ...updatedStudents[studentIndex],
    ...updatedData,
  };

  console.log("Updated students array:", updatedStudents);

  // Store the updated array in IndexedDB
  await db.students.clear(); // Clear the existing data
  await db.students.bulkAdd(updatedStudents); // Add the updated data

  console.log("Student updated successfully.");

  return updatedStudents[studentIndex];
};

export const deleteStudentFromLocalDB = async (studentId) => {
  console.log("Deleting student with ID:", studentId);

  // Get current students data from IndexedDB
  const currentStudents = await getAllStudentsFromLocalDB();
  console.log("Current students:", currentStudents);

  // Find the index of the student to delete
  const studentIndex = currentStudents.findIndex(
    (student) => student.id == studentId
  );
  console.log("Student index:", studentIndex);

  if (studentIndex === -1) {
    throw new Error("Student not found");
  }

  // Remove the student from the array
  const updatedStudents = currentStudents.filter(
    (student) => student.id != studentId
  );
  console.log("Updated students array:", updatedStudents);

  // Store the updated array in IndexedDB
  await db.students.clear(); // Clear the existing data
  await db.students.bulkPut(updatedStudents); // Update the data without clearing

  console.log("Student deleted successfully.");

  return updatedStudents;
};
