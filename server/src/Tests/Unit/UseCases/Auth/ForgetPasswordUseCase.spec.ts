import { describe, expect, it, vi, beforeEach } from "vitest";

import type { User, Token } from "@prisma/client";

import { Context } from "@Database/Core/Context";
import { UnitOfWOrk } from "@Database/Core/UnitOfWork";
import { UserFactory } from "@Database/Factories/UserFactory";
import { TokenFactory } from "@Database/Factories/TokenFactory";
import { ForgetPasswordEmail } from "@Emails/ForgetPasswordEmail";
import { ResetTokenService } from "@Services/ResetToken/ResetTokenService";

import { ForgetPasswordUseCase } from "@UseCases/Auth/ForgetPassword/ForgetPasswordUseCase";

describe("forget password use case", () => {
  let user1: User, token1: Token;

  const uow = new UnitOfWOrk(Context);
  const useCase = new ForgetPasswordUseCase(uow);

  beforeEach(async () => {
    user1 = await UserFactory.build({ id: 1, password: "12345678" });
    token1 = await TokenFactory.build({ id: 1, userId: 1, token: "mock-token" });
  });

  // ======================== Tests Section ============================

  it("should generate a reset token and send an email when the user exists", async () => {
    vi.spyOn(ResetTokenService, "generate").mockReturnValue(token1.token); 

    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(user1);
    vi.spyOn(uow.token, "upsert").mockResolvedValue(token1);

    vi.spyOn(ForgetPasswordEmail.prototype, "send").mockImplementation(async () => {});

    await useCase.execute({ ...user1 });

    expect(ResetTokenService.generate).toHaveBeenCalled();
    expect(ForgetPasswordEmail.prototype.send).toHaveBeenCalled();
  });

  it("should throw an error when the user does not exist", async () => {
    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(null);

    await expect(useCase.execute({ ...user1 }))
      .rejects.toThrowError("User not found");
  });
});