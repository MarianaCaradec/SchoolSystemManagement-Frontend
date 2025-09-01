import api from "../api/baseCall";
import type { StudentForm, TeacherForm } from "../utils/types";

export const register = async (email: string, password: string, roleName: string) => {
    try {
        const response = await api.post("api/auth/register", {
            email,
            password,
            roleName    
        }, {
            withCredentials: true
        });

        return response.data || null;
    } catch (error) {
        console.error("Error during registration:", error);
        return null;
    }
}

export const createStudentProfile = async (studentData: StudentForm) => {
    try {
        const response = await api.post("api/student", 
            studentData, 
            {withCredentials: true}
        );

        return response.data || null;
    } catch (error) {
        console.error("Error creating student profile:", error);
        return null;
    }
}

export const createTeacherProfile = async (teacherData: TeacherForm) => {
    try {
        const response = await api.post("api/teacher", 
            teacherData, 
            {withCredentials: true}
        );

        return response.data || null;
    } catch (error) {
        console.error("Error creating teacher profile:", error);
        return null;
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post("api/auth/login", {
            email,
            password
        }, {
            withCredentials: true
        });

        return response.data || null;
    } catch (error) {
        console.error("Error during login:", error);
        return null;
    }
}

export const logout = async () => {
    try {
        const response = await api.post("api/auth/logout", {}, 
            {
            withCredentials: true
        });

        return response.data || null;
    } catch (error) {
        console.error("Error during logout:", error);
        return null;
    }
}

export const getStudents = async () => {
    try {
        const response = await api.get(`/api/student`);

        return response.data || [];
    } catch (error) {
        console.error("Error calling students data:", error);
        return null;
    }
};

export const getStudentById = async (studentId: number) => {
    try {
        const response = await api.get(`/api/student/${studentId}`)
        
        return response.data || null;
    } catch (error) {
        console.error("Error calling student by ID:", error);
        return null;
    }
}

