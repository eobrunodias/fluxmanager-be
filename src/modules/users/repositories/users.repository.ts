import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Setting } from "src/modules/settings/entities/setting.entity";
import { Order } from "src/modules/orders/entities/order.entity";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    orders: Order[],
    setting: Setting,
  ): Promise<User> {
    const userExists: User | null = await this.repository.findOneBy({
      email: createUserDto.email,
    });

    if (userExists) throw new ConflictException("User already exists");

    const user: User = this.repository.create({
      ...createUserDto,
      orders: orders,
      setting: setting,
    });

    return await this.repository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    const users: User[] = await this.repository.find();
    if (!users || users.length === 0)
      throw new NotFoundException("Users not found");
    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user: User | null = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User | undefined = await this.findUserById(id);

    const updatedUser = await this.repository.preload({
      ...updateUserDto,
      ...user,
    });

    if (!updatedUser) throw new NotFoundException("User not found");

    return this.repository.save(updatedUser);
  }

  async deleteUser(id: string): Promise<User> {
    const user: User | null = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException("User not found");

    await this.repository.delete(id);

    return user;
  }
}
