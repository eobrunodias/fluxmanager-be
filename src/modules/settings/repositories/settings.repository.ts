import { InjectRepository } from "@nestjs/typeorm";
import { Setting } from "../entities/setting.entity";
import { Repository } from "typeorm";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { UpdateSettingDto } from "../dto/update-setting.dto";
import { CreateSettingDto } from "../dto/create-setting.dto";
import { User } from "src/modules/users/entities/user.entity";

export class SettingsRepository {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async createSetting(createSettingDto: CreateSettingDto, user: User) {
    const settingExists = await this.settingRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (settingExists) {
      throw new ConflictException("Setting already exists for this user");
    }

    const settingCreated = this.settingRepository.create({
      ...createSettingDto,
      user: user,
    });

    return await this.settingRepository.save(settingCreated);
  }

  async findAllSettings() {
    const settings = await this.settingRepository.find();
    if (!settings || settings.length === 0)
      throw new NotFoundException("No settings found");

    return settings;
  }

  async findSettingById(id: string) {
    const setting = await this.settingRepository.findOneBy({ id });
    if (!setting) throw new NotFoundException("Setting not found");

    return setting;
  }

  async updatedSetting(id: string, updateSettingDto: UpdateSettingDto) {
    const settingPreloaded = await this.settingRepository.preload({
      id,
      ...updateSettingDto,
    });

    if (!settingPreloaded) throw new NotFoundException("Setting not found");

    return await this.settingRepository.save(settingPreloaded);
  }

  async deleteSetting(id: string) {
    const setting = await this.settingRepository.findOneBy({ id });
    if (!setting) throw new NotFoundException("Setting not found");

    await this.settingRepository.delete(setting);

    return setting;
  }
}
