import { describe, expect, it, vi, beforeEach } from "vitest";

import type { User } from "@prisma/client";

import { Context } from "@Database/Core/Context";
import { UnitOfWOrk } from "@Database/Core/UnitOfWork";
import { JwtService } from "@Services/JwtService/Service";
import { UserFactory } from "@Database/Factories/UserFactory";

import { RegisterUserUseCase } from "@UseCases/Auth/RegisterUser/RegisterUserUseCase";

describe(("update user use case"), () => {
  let user1: User;
  
  const uow = new UnitOfWOrk(Context);
  const useCase = new RegisterUserUseCase(uow);

  beforeEach(async () => {
    user1 = await UserFactory.build({ id: 1, password: "12345678" });
  });

  // ======================== Tests Section ============================

  it("should successfully register a new user and return a token", async () => {
    vi.spyOn(JwtService, "sign").mockResolvedValue("mocked token");
    
    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(null);
    vi.spyOn(uow.user, "create").mockResolvedValue(user1);

    const response = await useCase.execute({ ...user1 });
    expect(response.token).toEqual("mocked token");
  });

  it("should throw an error when the user already exists", async () => {
    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(user1);
    
    await expect(useCase.execute({ ...user1 }))
      .rejects.toThrowError("User already exists");
  });
});