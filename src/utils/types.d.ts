interface Attendance {
    id: number;
    date: Date;
    present: boolean;
    studentId: number;
}

interface Grade {
    id: number;
    value: number;
    subjectName: string;
    studentId: number;
}

interface Class {
    id: number;
    course: string;
    divition: string;
    teacherIds: number[];
    studentIds: number[];
}

enum UserRole {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student"
}

interface User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
}

interface Student {
    id: number;
    name: string;
    surname: string;
    birthDate: Date;
    address: string;
    email: string;
    phone: number;
    userRole: UserRole;
    class: Class;
    attendances: Attendance[];
    grades: Grade[];
}