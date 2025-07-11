export interface Attendance {
    id: number;
    date: Date;
    present: boolean;
    studentId: number;
}

export interface Grade {
    id: number;
    value: number;
    subjectName: string;
    studentId: number;
}

export interface Class {
    id: number;
    course: string;
    divition: string;
    teacherIds: number[];
    studentIds: number[];
}

export enum UserRole {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student"
}

export interface AuthenticatedUser {
    email: string;
    role: UserRole;
    roleName: string;
}

export interface Student {
    id: number;
    name: string;
    surname: string;
    birthDate: Date;
    address: string;
    emailRole: AuthenticatedUser;
    mobileNumber: number;
    class: Class;
    attendances: Attendance[];
    grades: Grade[];
}

export interface UserForm {
    email: string;
    password: string;
    roleName?: string;
}