import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  async findAllUsers() {
    return this.repository.find();
  }

  async findUserById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findUserByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById(id);

    const updatedUser = await this.repository.preload({
      ...updateUserDto,
      ...user,
    });

    if (updatedUser) return this.repository.save(updatedUser);
  }

  async deleteUser(id: string) {
    return await this.repository.delete(id);
  }
}
