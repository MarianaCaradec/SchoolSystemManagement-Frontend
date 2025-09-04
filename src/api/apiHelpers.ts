import api from "../api/baseCall";
import type { StudentForm, TeacherForm } from "../utils/types";

// Register a new user
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

// Login and logout an existing user
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

// Create profile fot student and teacher
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

// Update user, student, teacher, class, attendance, grade
export const updateUser = async (userId: number, userEmail: string, userPassword: string, userRoleName: string) => {
    try {
        const response = await api.patch(`api/user/${userId}`, 
            {
                email: userEmail ? userEmail : "",
                password: userPassword ? userPassword : "",
                roleName: userRoleName ? userRoleName : ""
            },
            {withCredentials: true}
        );
        
        return response.data || null;
    } catch (error) {
        console.error("Error updating user", error);
        return null;
    }
}

// Get all users, students, teachers, classes, attendances, grades
export const getStudents = async () => {
    try {
        const response = await api.get(`/api/student`);

        return response.data || [];
    } catch (error) {
        console.error("Error calling students data:", error);
        return null;
    }
};

// Get by id student, teacher, class, attendance, grade
export const getStudentById = async (studentId: number) => {
    try {
        const response = await api.get(`/api/student/${studentId}`)
        
        return response.data || null;
    } catch (error) {
        console.error("Error calling student by ID:", error);
        return null;
    }
}

