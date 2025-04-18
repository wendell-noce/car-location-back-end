import { Controller, Param, Delete, Get } from '@nestjs/common';
import { UsersService } from './users.service';

import { ActiveUserId } from 'src/shared/decorators/activeUserId';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
