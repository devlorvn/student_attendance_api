import { IToken } from "src/common/utils/generateJwt.ulti";
import { Student } from "src/modules/student/entities/student.entity";

export interface ITokenPayload extends IToken {
  key: Student["mssv"];
}

export interface IRefreshTokenPayload extends IToken {
  key: Student["mssv"];
}

export interface RequestWithUser extends Request {
  user: Student;
}
