import { Test, TestingModule } from "@nestjs/testing";
import { CashflowsController } from "../cashflows.controller";
import { CashflowsService } from "../cashflows.service";

describe("CashflowController", () => {
  let controller: CashflowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashflowsController],
      providers: [CashflowsService],
    }).compile();

    controller = module.get<CashflowsController>(CashflowsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
