import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiProperty({ example: "John Doe", description: "Name of the user" })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newCreated = await this.usersService.create(createUserDto);
    if (newCreated) return newCreated;
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
