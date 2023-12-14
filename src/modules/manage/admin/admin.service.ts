import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Admin from "./entities/admin.entity";
import { Repository } from "typeorm";
import { CreateAdminDto, UpdateAdminDto } from "./dto/admin.dto";

@Injectable()
export default class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>
  ) {}

  // CREATE
  async createAdmin(createAdminDto: CreateAdminDto) {
    const newAdmin = this.adminRepository.create(createAdminDto);
    await this.adminRepository.save(newAdmin);
    return newAdmin;
  }

  // UPDATE
  async updateAdmin(updateAdminDto: UpdateAdminDto) {
    const { id, ...updateData } = updateAdminDto;
    await this.adminRepository.update(id, updateData);
  }

  // GET ALL
  async getAllAdmin() {
    const admins = await this.adminRepository.find();
    return admins;
  }

  // GET BY ID
  async getAdminById(id: string) {
    const user = await this.adminRepository.findOne({ where: { id } });
    if (!user) throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);

    return user;
  }

  // DELETE
  async deleteAdmin(id: string) {
    const result = await this.adminRepository.delete(id);
    if (!result.affected) {
      throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
    }
  }
}
