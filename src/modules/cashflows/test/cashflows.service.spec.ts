import { Test, TestingModule } from "@nestjs/testing";
import { CashflowsService } from "../cashflows.service";

describe("CashflowService", () => {
  let service: CashflowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashflowsService],
    }).compile();

    service = module.get<CashflowsService>(CashflowsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
