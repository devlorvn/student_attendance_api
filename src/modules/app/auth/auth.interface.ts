import { Student } from "src/modules/student/entities/student.entity";

export interface ITokenPayload {
  mssv: Student["mssv"];
  createdAt: Date;
  expireIn: Date;
}

export interface IRefreshTokenPayload {
  token: string;
  createdAt: Date;
  expireIn: Date;
}

export interface RequestWithUser extends Request {
  user: Student;
}
