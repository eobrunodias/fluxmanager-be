import { CategoriesModule } from "./categories/categories.module";
import { InvoicesModule } from "./invoices/invoices.module";
import { OrdersModule } from "./orders/orders.module";
import { ProductsModule } from "./products/products.module";
import { SuppliersModule } from "./suppliers/suppliers.module";
import { UsersModule } from "./users/users.module";
import { InventoryMovementsModule } from "./inventory-movements/inventory-movements.module";
import { StockModule } from "./stock/stock.module";
import { PaymentsModule } from "./payments/payments.module";
import { OrderItemsModule } from "./order-items/order-items.module";
import { AuthModule } from "./auth/auth.module";
import { CashflowsModule } from "./cashflows/cashflows.module";
import { ClientsModule } from "./clients/clients.module";
import { SettingsModule } from "./settings/settings.module";

export const featureModules = [
  UsersModule,
  ProductsModule,
  InvoicesModule,
  OrdersModule,
  SuppliersModule,
  CategoriesModule,
  InventoryMovementsModule,
  StockModule,
  PaymentsModule,
  OrderItemsModule,
  AuthModule,
  CashflowsModule,
  ClientsModule,
  SettingsModule,
];
