import { Module } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { SettingsController } from "./settings.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Setting } from "./entities/setting.entity";
import { SettingsRepository } from "./repositories/settings.repository";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Setting]), UsersModule],
  controllers: [SettingsController],
  providers: [SettingsService, SettingsRepository],
  exports: [SettingsRepository],
})
export class SettingsModule {}
