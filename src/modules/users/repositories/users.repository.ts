import { Injectable, NotFoundException } from "@nestjs/common";
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
    const existingUser = await this.repository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) throw new NotFoundException("Email already exists");

    const user = this.repository.create(createUserDto);

    return await this.repository.save(user);
  }

  async findAllUsers() {
    const users = await this.repository.find();
    if (!users) throw new NotFoundException("Users not found");
    return users;
  }

  async findUserById(id: string) {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException("User not found");
    return user;
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
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException("User not found");

    await this.repository.delete(id);

    return user;
  }
}
