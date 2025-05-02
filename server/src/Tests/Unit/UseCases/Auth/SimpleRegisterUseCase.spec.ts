import { describe, expect, it, vi, beforeEach } from "vitest";

import type { User } from "@Models/User";

import { Context } from "@Database/Core/Context";
import { UnitOfWOrk } from "@Database/Core/UnitOfWork";
import { JwtService } from "@Services/Tokens/JwtService";
import { LogicException } from "@Exceptions/LogicException";
import { UserFactory } from "@Database/Factories/UserFactory";
import { BcryptService } from "@Services/Password/BcryptService";

import { SimpleRegisterUseCase } from "@UseCases/Auth/SimpleRegister/SimpleRegisterUseCase";
import type { SimpleRegisterCommand } from "@UseCases/Auth/SimpleRegister/SimpleRegisterCommand";

describe("simple register use case", () => {
  let user1: User.Entity;

  const uow = new UnitOfWOrk(Context);
  const useCase = new SimpleRegisterUseCase(uow);
  let command: SimpleRegisterCommand;

  beforeEach(async () => {
    user1 = await UserFactory.build({ id: 1 });

    command = {
      name: user1.name,
      email: user1.email,
      active: user1.active,
      password: user1.password,
    };
  });

  it("should register a new user", async () => {
    vi.spyOn(BcryptService, "hash").mockResolvedValue("fake hash");
    vi.spyOn(JwtService, "sign").mockResolvedValue("fake token");

    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(null);
    vi.spyOn(uow.user, "create").mockResolvedValue(user1);

    const auth = await useCase.execute(command);
    expect(auth.token).toEqual("fake token");
    expect(BcryptService.hash).toHaveBeenCalledWith(command.password);
  });

  it("should throw Redundancy", async () => {
    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(user1);

    await expect(useCase.execute(command))
      .rejects.toThrowError(LogicException.Redundancy);
  });
});