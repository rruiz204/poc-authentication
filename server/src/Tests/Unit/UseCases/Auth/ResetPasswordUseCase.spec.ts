import { describe, expect, it, vi } from "vitest";

import { Context } from "@Database/Context";
import { UnitOfWOrk } from "@Database/UnitOfWork";
import { HashService } from "@Services/HashService/Service";
import { UserFactory } from "@Database/Factories/UserFactory";
import { TokenFactory } from "@Database/Factories/TokenFactory";
import { ResetPasswordEmail } from "@Emails/ResetPasswordEmail";

import { ResetPasswordUseCase } from "@UseCases/Auth/ResetPassword/ResetPasswordUseCase";

describe("forget password use case", () => {
  const uow = new UnitOfWOrk(Context);
  const useCase = new ResetPasswordUseCase(uow);

  it("should update the user password and delete the token when the token is valid", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const token1 = await TokenFactory.build({ id: 1, userId: user1.id });

    vi.spyOn(HashService, "hash").mockResolvedValue(user1.password);
    vi.spyOn(uow.token, "findByToken").mockResolvedValue(token1);
    vi.spyOn(uow.token, "delete").mockResolvedValue(token1);
    vi.spyOn(uow.user, "update").mockResolvedValue(user1);

    vi.spyOn(ResetPasswordEmail.prototype, "send").mockImplementation(async () => {});

    await useCase.execute({ token: token1.token, password: user1.password });

    expect(HashService.hash).toHaveBeenCalled();
    expect(ResetPasswordEmail.prototype.send).toHaveBeenCalled();

    expect(uow.user.update).toHaveBeenCalledWith({
      id: user1.id, update: { password: user1.password }
    });
  });
  
  it("should throw an error when the token is not found", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const token1 = await TokenFactory.build({ id: 1, userId: user1.id });

    vi.spyOn(uow.token, "findByToken").mockResolvedValue(null);

    await expect(useCase.execute({ token: token1.token, password: user1.password }))
      .rejects.toThrowError("Token not found");
  });
});