import { describe, expect, it, vi } from "vitest";

import { Context } from "@Database/Context";
import { UnitOfWOrk } from "@Database/UnitOfWork";
import { JwtService } from "@Services/JwtService/Service";
import { UserFactory } from "@Database/Factories/UserFactory";

import { RegisterUserUseCase } from "@UseCases/Auth/RegisterUser/RegisterUserUseCase";
import type { RegisterUserCommand } from "@UseCases/Auth/RegisterUser/RegisterUserCommand";

describe(("update user use case"), () => {
  const uow = new UnitOfWOrk(Context);
  const useCase = new RegisterUserUseCase(uow);

  it("should successfully register a new user and return a token", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const command: RegisterUserCommand = { ...user1 };

    vi.spyOn(JwtService, "sign").mockResolvedValue("mocked token");
    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(null);
    vi.spyOn(uow.user, "create").mockResolvedValue(user1);

    const response = await useCase.execute(command);
    expect(response.token).toEqual("mocked token");
  });

  it("should throw an error when the user already exists", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const command: RegisterUserCommand = { ...user1 };

    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(user1);
    
    await expect(useCase.execute(command))
      .rejects.toThrowError("User already exists");
  });
});