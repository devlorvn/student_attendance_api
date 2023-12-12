import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import PositionAdminService from './positionAdmin.service';
import {
  CreatePositionAdminDto,
  UpdatePositionAdminDto,
} from './dtos/positionAdmin.dto';

@Controller('positions')
export default class PositionAdminController {
  constructor(private readonly positionAdminService: PositionAdminService) {}

  @Get()
  getAllPositionAdmin() {
    return this.positionAdminService.getAllPositionAdmin();
  }

  @Get(':id')
  getPositionAdminById(@Param('id') id: string) {
    return this.positionAdminService.getPositionAdminById(id);
  }

  @Post()
  createPositionAdmin(@Body() position: CreatePositionAdminDto) {
    return this.positionAdminService.createPositionAdmin(position);
  }

  @Put(':id')
  updatePositionAdmin(@Body() position: UpdatePositionAdminDto) {
    return this.positionAdminService.updatePositionAdmin(position);
  }

  @Delete(':id')
  deletePositionAdmin(@Param('id') id: string) {
    return this.positionAdminService.deletePositionAdmin(id);
  }
}
