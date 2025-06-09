import { useEffect, useState } from "react";
import { getStudentById, getStudents } from "../../api/apiHelpers";

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsList = await getStudents();
        console.log("Rendered Students:", students);
        const detailedStudents = await Promise.all(
          studentsList.map(async (student: Student) => {
            const detailedStudent = await getStudentById(student.id);
            return detailedStudent || student; // Fallback to the original student if details are not found
          })
        );
        setStudents(detailedStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
        return [];
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Students List</h2>
      <ul>
        {students?.map((student) => (
          <li key={`student-${student.id}`}>
            {student.name}- {student.surname} - {student.birthDate?.toString()}{" "}
            -{student.address} - {student.email} - {student.phone} - Role:{" "}
            {student.userRole} - Class: {student.class?.course}{" "}
            {student.class?.divition}
            {student.attendances?.length > 0 &&
              student.attendances.map((attendance, index) => {
                return (
                  <div key={`attendance-${student.id}-${index}`}>
                    <p>
                      Attendance: {attendance.date.toString()} - Status:
                      {attendance.present ? "Present" : "Absent"}
                    </p>
                  </div>
                );
              })}
            {student.grades?.length > 0 &&
              student.grades.map((grade, index) => {
                return (
                  <div key={`grade-${student.id}-${index}`}>
                    <p>
                      Grade: {grade.subjectName} - Score: {grade.value}
                    </p>
                  </div>
                );
              })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
