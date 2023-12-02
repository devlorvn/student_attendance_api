import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';
import { CreateUserDto } from './dto/user.dto';
import { UserMongoService } from './user.mongo.service';
import { UserMysqlService } from './user.mysql.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userMySqlService: UserMysqlService,
    private readonly userMongoService: UserMongoService,
    private readonly exceptionService: ExceptionsService,
  ) {}

  @Post(':systemId')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Param('systemId') systemId: string,
  ) {
    try {
      let service = this.getService(systemId);
      const data = await this[service].create(
        createUserDto,
        systemId.toUpperCase(),
      );
      return data;
    } catch (error) {
      throw this.exceptionService.internalServerErrorException({
        message: 'Internal server error',
      });
    }
  }

  @Get(':systemId')
  async findAll(@Param('systemId') systemId: string) {
    try {
      let service = this.getService(systemId);

      const data = await this[service].findAll(systemId.toUpperCase());
      return data;
    } catch (error) {
      throw this.exceptionService.internalServerErrorException({
        message: 'Internal server error',
      });
    }
  }
  getService(systemId: string) {
    let a = Object.keys(this).filter((item) => {
      if (item.toUpperCase().match(systemId.toUpperCase())) {
        return item;
      }
    });

    return a.length ? a[0] : null;
  }
}
