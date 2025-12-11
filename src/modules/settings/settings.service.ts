import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";
import { Setting } from "./entities/setting.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly repository: Repository<Setting>,
  ) {}

  async create(createSettingDto: CreateSettingDto, userId: string) {
    if (!createSettingDto)
      throw new BadRequestException("Invalid setting data");
    if (!userId) throw new BadRequestException("User ID is required");

    const hasSetting = await this.repository.findOneBy({
      user: { id: userId },
    });

    if (hasSetting)
      throw new BadRequestException("User already has a setting configured");

    const setting = {
      ...createSettingDto,
      user: { id: userId },
    };

    const settingEntity = this.repository.create(setting);
    return await this.repository.save(settingEntity);
  }

  async findAll() {
    const settings = await this.repository.find();
    if (!settings || settings.length === 0)
      throw new BadRequestException("No settings found");

    return settings;
  }

  async findOne(id: string) {
    const setting = await this.repository.findOneBy({ id });
    if (!setting) throw new BadRequestException("Setting not found");

    return setting;
  }

  async update(id: string, updateSettingDto: UpdateSettingDto) {
    const setting = await this.repository.findOneBy({ id });
    if (!setting) throw new BadRequestException("Setting not found");

    const updatedSetting = {
      ...setting,
      ...updateSettingDto,
    };

    const preloadedSetting = await this.repository.preload(updatedSetting);
    if (!preloadedSetting) throw new ConflictException("Setting not preloaded");

    const savedSetting = await this.repository.save(preloadedSetting);
    if (!savedSetting) throw new ConflictException("Setting not updated");

    return savedSetting;
  }

  async remove(id: string) {
    const setting = await this.repository.findOneBy({ id });

    if (!setting) throw new BadRequestException("Setting not found");
    await this.repository.remove(setting);

    return setting;
  }
}
