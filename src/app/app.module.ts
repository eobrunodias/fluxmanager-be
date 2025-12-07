import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "../modules/auth/auth.module";
import { UsersModule } from "../modules/users/users.module";
import { OrdersModule } from "../modules/orders/orders.module";
import { OrderItemsModule } from "../modules/order-items/order-items.module";
import { StockModule } from "../modules/stock/stock.module";
import { PaymentsModule } from "../modules/payments/payments.module";
import { ClientsModule } from "../modules/clients/clients.module";
import { ProductsModule } from "../modules/products/products.module";
import { SuppliersModule } from "../modules/suppliers/suppliers.module";
import { CategoriesModule } from "../modules/categories/categories.module";
import { SettingsModule } from "../modules/settings/settings.module";
import { CashflowModule } from "../modules/cashflow/cashflow.module";
import { InvoicesModule } from "../modules/invoices/invoices.module";
import { InventoryMovementsModule } from "../modules/inventory-movements/inventory-movements.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    OrdersModule,
    OrderItemsModule,
    StockModule,
    PaymentsModule,
    ClientsModule,
    ProductsModule,
    SuppliersModule,
    CategoriesModule,
    SettingsModule,
    CashflowModule,
    InvoicesModule,
    InventoryMovementsModule,
    ConfigModule.forRoot({
      isGlobal: true, // deixa o .env disponível no app todo
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: "postgres",
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT || "5432", 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DB,
          synchronize: process.env.DB_SYNCHRONIZE === "1",
          autoLoadEntities: process.env.DB_AUTOLOADENTITIES === "1",
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
