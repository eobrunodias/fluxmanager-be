import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";
import { SettingsRepository } from "./repositories/settings.repository";
import { UsersRepository } from "../users/repositories/users.repository";
import { Setting } from "./entities/setting.entity";

@Injectable()
export class SettingsService {
  constructor(
    private readonly repository: SettingsRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async create(
    createSettingDto: CreateSettingDto,
    userId: string,
  ): Promise<Setting> {
    if (!createSettingDto)
      throw new BadRequestException("Invalid setting data");
    if (!userId) throw new BadRequestException("User ID is required");

    const user = await this.userRepository.findUserById(userId);

    return await this.repository.createSetting(createSettingDto, user);
  }

  async findAll(): Promise<Setting[]> {
    return this.repository.findAllSettings();
  }

  async findOne(id: string): Promise<Setting> {
    if (!id) throw new BadRequestException("Setting not found");
    return this.repository.findSettingById(id);
  }

  async update(
    id: string,
    updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateSettingDto)
      throw new BadRequestException("Setting data update invalid");

    return this.repository.findSettingById(id);
  }

  async remove(id: string): Promise<Setting> {
    if (!id) throw new BadRequestException("Setting not found");
    return this.repository.deleteSetting(id);
  }
}
