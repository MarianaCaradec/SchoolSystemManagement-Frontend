export enum UserRole {
    ADMIN = "Admin",
    TEACHER = "Teacher",
    STUDENT = "Student"
}

export interface UserForm {
    email: string;
    password: string;
    roleName?: string;
}

export interface UserToBeUpdatedForm {
    id?: number;
    email?: string;
    password?: string;
    roleName?: string;
}

export interface AuthenticatedUser { //AuthDto in backend
    id: number,
    email: string;
    role: UserRole;
    roleName: string;
    hasProfile: boolean;
}

export interface StudentForm { //StudentInputDto in backend
    name: string;
    surname: string;
    birthDate: Date;
    address: string;
    mobileNumber: number;
    userId: AuthenticatedUser.id;
    classId: number;
}

export interface Student { //StudentResponseDto in backend
    id: number;
    name: string;
    surname: string;
    birthDate: Date;
    address: string;
    mobileNumber: number;
    emailRole: AuthenticatedUser;
    class: Class;
    attendances: Attendance[];
    grades: Grade[];
}

export interface TeacherForm { //TeacherInputDto in backend
    name: string;
    surname: string;
    birthDate: Date;
    address: string;
    mobileNumber: number;
    userId: AuthenticatedUser.id;
}

export interface Class { //ClassDto in backend
    id: number;
    course: string;
    divition: string;
    teacherIds: number[];
    studentIds: number[];
}

export interface Attendance { //AttendanceDto in backend
    id: number;
    date: Date;
    present: boolean;
    studentId?: number;
    teacherId?: number;
    studentUserId?: AuthenticatedUser.id;
    teacherUserId?: AuthenticatedUser.id;
}

export interface Grade { //GradeDto in backend
    id: number;
    value: number;
    date: Date;
    studentId: number;
    subjectId: number;
    subjectName: string;
}
