import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "src/modules/student/entities/student.entity";
import { Repository } from "typeorm";

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(Student)
    private adminRepository: Repository<Student>
  ) {}

  
}
