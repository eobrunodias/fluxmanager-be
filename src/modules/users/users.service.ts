import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./repositories/users.repository";
import { SettingsRepository } from "../settings/repositories/settings.repository";
import { OrdersRepository } from "../orders/repositories/orders.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly orderRepository: OrdersRepository,
    private readonly settingRepository: SettingsRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto)
      throw new BadRequestException("Request body is required");

    const { settingId } = createUserDto;

    const orders = await this.orderRepository.findAllOrders();
    const setting = await this.settingRepository.findSettingById(settingId);

    return await this.userRepository.createUser(createUserDto, orders, setting);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAllUsers();
  }

  async findOne(id: string): Promise<User> {
    if (!id) throw new BadRequestException("Id is required");
    return this.userRepository.findUserById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!id) throw new BadRequestException("Id is required");
    return await this.userRepository.updateUser(id, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    if (!id) throw new BadRequestException("Id is required");
    return await this.userRepository.deleteUser(id);
  }
}
