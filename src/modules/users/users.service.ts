import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  private id: number = 0;
  private database: CreateUserDto[] = [];

  create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    this.id += 1;

    const newUser = {
      id: this.id,
      name,
      email,
      password,
    };

    this.database.push(newUser);

    return newUser;
  }

  findAll() {
    return this.database;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
