import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const { name, email, password } = createUserDto;

    const exists = await this.repository.findOneBy({ email });
    if (exists) throw new BadRequestException("Email already exists");

    const newUser = {
      name,
      email,
      password,
    };

    return await this.repository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.repository.find();

    if (!users) throw new BadRequestException("Users not found");

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    if (!user) throw new BadRequestException("User not found");

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const user = await this.repository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) throw new BadRequestException("User not found");

    return this.repository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    if (!user) throw new BadRequestException("User not found");

    await this.repository.delete({ id });
    return user;
  }
}
