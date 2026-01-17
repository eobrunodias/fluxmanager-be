import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";
import { Setting } from "./entities/setting.entity";

@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post(":userId")
  create(
    @Param("userId", ParseUUIDPipe) userId: string,
    @Body() createSettingDto: CreateSettingDto,
  ): Promise<Setting> {
    return this.settingsService.create(createSettingDto, userId);
  }

  @Get()
  findAll(): Promise<Setting[]> {
    return this.settingsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Setting> {
    return this.settingsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    return this.settingsService.update(id, updateSettingDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<Setting> {
    return this.settingsService.remove(id);
  }
}
