import { describe, expect, it, vi, beforeEach } from "vitest";

import type { User } from "@Models/User";

import { Inversify } from "@Containers/Inversify";
import { UnitOfWork } from "@Database/Core/UnitOfWork";
import { JwtService } from "@Services/Tokens/JwtService";
import { LogicException } from "@Exceptions/LogicException";
import { UserFactory } from "@Database/Factories/UserFactory";
import { BcryptService } from "@Services/Password/BcryptService";

import { EmailLoginUseCase } from "@UseCases/Auth/EmailLogin/EmailLoginUseCase";
import type { EmailLoginCommand } from "@UseCases/Auth/EmailLogin/EmailLoginCommand";

describe("email login use case", () => {
  let user1: User.Entity;
  let command: EmailLoginCommand;

  const uow = Inversify.get(UnitOfWork);
  const useCase = Inversify.get(EmailLoginUseCase);

  beforeEach(async () => {
    user1 = await UserFactory.build({ id: 1 });

    command = {
      email: user1.email,
      password: user1.password,
    };
  });

  it("should login a user with email and password", async () => {
    vi.spyOn(JwtService, "sign").mockResolvedValue("fake token");
    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(user1);
    vi.spyOn(BcryptService, "verify").mockResolvedValue(true);

    const auth = await useCase.execute(command);
    expect(auth.token).toEqual("fake token");
    expect(BcryptService.verify).toHaveBeenCalledWith(command.password, user1.password);
  });

  it("should throw NotFound", async () => {
    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(null);

    await expect(useCase.execute(command))
      .rejects.toThrowError(LogicException.NotFound);
  });

  it("should throw BadCredentials", async () => {
    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(user1);
    vi.spyOn(BcryptService, "verify").mockResolvedValue(false);

    await expect(useCase.execute(command))
      .rejects.toThrowError(LogicException.BadCredentials);
  });
});