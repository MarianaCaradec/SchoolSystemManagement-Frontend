import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import type { StudentForm } from "../utils/types";
import { createStudentProfile, createTeacherProfile } from "../api/apiHelpers";

const CompleteProfile = () => {
  const { redirectByRole } = useAuthContext();
  const user = useAuthContext().user;

  const [teacherData, setTeacherData] = useState({
    name: "",
    surname: "",
    birthDate: new Date(),
    address: "",
    mobileNumber: 0,
    userId: user?.id || 0,
  });
  const [studentData, setStudentData] = useState<StudentForm>({
    name: "",
    surname: "",
    birthDate: new Date(),
    address: "",
    mobileNumber: 0,
    userId: user?.id || 0,
    classId: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      console.error("No authenticated user found.");
      return;
    }

    if (!studentData) {
      console.error("Student data is not set.");
      return;
    }

    const teacherPayload = {
      ...teacherData,
      birthDate: studentData.birthDate
        ? new Date(studentData.birthDate).toISOString().split("T")[0]
        : "",
      userId: user.id,
    };

    const teacherResponse = await createTeacherProfile(teacherPayload as any);

    if (teacherResponse) {
      setTeacherData(teacherResponse.data);
      await redirectByRole(user);
    } else {
      console.error("Failed to create teacher profile.");
    }

    const studentPayload = {
      ...studentData,
      birthDate: studentData.birthDate
        ? new Date(studentData.birthDate).toISOString().split("T")[0]
        : "",
      userId: user.id,
      classId: studentData.classId,
    };

    const studentResponse = await createStudentProfile(studentPayload as any);

    if (studentResponse) {
      setStudentData(studentResponse.data);
      await redirectByRole(user);
    } else {
      console.error("Failed to create student profile.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={studentData?.name}
          onChange={(e) =>
            setStudentData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={studentData?.surname}
          onChange={(e) =>
            setStudentData((prev) => ({
              ...prev,
              surname: e.target.value,
            }))
          }
          placeholder="Surname"
          required
        />
        <input
          type="date"
          value={
            studentData?.birthDate
              ? new Date(studentData.birthDate).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) =>
            setStudentData((prev) => ({
              ...prev,
              birthDate: new Date(e.target.value),
            }))
          }
          placeholder="Birth date"
          required
        />
        <input
          type="text"
          value={studentData?.address}
          onChange={(e) =>
            setStudentData((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
          placeholder="Address"
          required
        />
        <input
          type="number"
          value={studentData?.mobileNumber}
          onChange={(e) =>
            setStudentData((prev) => ({
              ...prev,
              mobileNumber: Number(e.target.value),
            }))
          }
          placeholder="Mobile number"
          required
        />
        <input
          type="number"
          value={studentData.classId}
          onChange={(e) =>
            setStudentData((prev) => ({
              ...prev,
              classId: Number(e.target.value),
            }))
          }
          placeholder="Class ID"
          required
        />
        <button type="submit">Create my profile</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
