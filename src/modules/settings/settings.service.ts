import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";
import { SettingsRepository } from "./repositories/settings.repository";

@Injectable()
export class SettingsService {
  constructor(private readonly repository: SettingsRepository) {}

  async create(createSettingDto: CreateSettingDto, userId: string) {
    if (!createSettingDto)
      throw new BadRequestException("Invalid setting data");
    if (!userId) throw new BadRequestException("User ID is required");

    return await this.repository.createSetting(createSettingDto, userId);
  }

  async findAll() {
    return this.repository.findAllSettings();
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Setting not found");
    return this.repository.findSettingById(id);
  }

  async update(id: string, updateSettingDto: UpdateSettingDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateSettingDto)
      throw new BadRequestException("Setting data update invalid");

    return this.repository.findSettingById(id);
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Setting not found");
    return this.repository.deleteSetting(id);
  }
}
