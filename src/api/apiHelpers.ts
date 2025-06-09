import api from "../api/baseCall";

export const getStudents = async () => {
    try {
    const response = await api.get(`/api/student?userId=7`);
    return response.data || [];
    } catch (error) {
        console.error("Error calling students data:", error);
        return null;
    }
};

export const getStudentById = async (studentId: number) => {
    try {
        const response = await api.get(`/api/student/${studentId}?userId=7`)
        return response.data || null;
    } catch (error) {
        console.error("Error calling student by ID:", error);
        return null;
    }
}

