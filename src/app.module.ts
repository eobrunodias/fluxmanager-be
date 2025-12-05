import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { StockModule } from './stock/stock.module';
import { PaymentsModule } from './payments/payments.module';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CategoriesModule } from './categories/categories.module';
import { SettingsModule } from './settings/settings.module';
import { CashflowModule } from './cashflow/cashflow.module';

@Module({
  imports: [AuthModule, UsersModule, OrdersModule, OrderItemsModule, StockModule, PaymentsModule, ClientsModule, ProductsModule, SuppliersModule, CategoriesModule, SettingsModule, CashflowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
