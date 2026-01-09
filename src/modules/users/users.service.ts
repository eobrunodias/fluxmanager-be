import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./repositories/users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    if (!createUserDto)
      throw new BadRequestException("Request body is required");
    return await this.repository.createUser(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.findAllUsers();
  }

  async findOne(id: string): Promise<User> {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.findUserById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!id) throw new BadRequestException("Id is required");
    return await this.repository.updateUser(id, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    if (!id) throw new BadRequestException("Id is required");
    return await this.repository.deleteUser(id);
  }
}
