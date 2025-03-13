import { describe, expect, it, vi } from "vitest";

import { Context } from "@Database/Context";
import { UnitOfWOrk } from "@Database/UnitOfWork";
import { UserFactory } from "@Database/Factories/UserFactory";
import { TokenFactory } from "@Database/Factories/TokenFactory";
import { ForgetPasswordEmail } from "@Emails/ForgetPasswordEmail";
import { ResetTokenService } from "@Services/ResetTokenService/Service";

import { ForgetPasswordUseCase } from "@UseCases/Auth/ForgetPassword/ForgetPasswordUseCase";

describe("forget password use case", () => {
  const uow = new UnitOfWOrk(Context);
  const useCase = new ForgetPasswordUseCase(uow);

  it("should generate a reset token and send an email when the user exists", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const token1 = await TokenFactory.build({ id: 1, userId: 1, token: "mock-token" });

    vi.spyOn(uow.token, "upsert").mockResolvedValue(token1);
    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(user1);
    vi.spyOn(ResetTokenService, "generate").mockReturnValue(token1.token);
    
    vi.spyOn(ForgetPasswordEmail.prototype, "send").mockImplementation(async () => {});

    await useCase.execute({ ...user1 });

    expect(ResetTokenService.generate).toHaveBeenCalled();
    expect(ForgetPasswordEmail.prototype.send).toHaveBeenCalled();

    expect(uow.token.upsert).toHaveBeenCalledWith({
      token: token1.token,
      userId: user1.id,
    });
  });

  it("should throw an error when the user does not exist", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(null);

    await expect(useCase.execute({ ...user1 }))
      .rejects.toThrowError("User not found");
  });
});