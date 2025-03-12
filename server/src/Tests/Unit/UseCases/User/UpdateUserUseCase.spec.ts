import { describe, expect, it, vi } from "vitest";

import { Context } from "@Database/Context";
import { UnitOfWOrk } from "@Database/UnitOfWork";
import { UserFactory } from "@Database/Factories/UserFactory";
import { UpdateUserUseCase } from "@UseCases/User/UpdateUser/UpdateUserUseCase";

import type { UpdateUserCommand } from "@UseCases/User/UpdateUser/UpdateUserCommand";

describe(("update user use case"), () => {
  const uow = new UnitOfWOrk(Context);
  const useCase = new UpdateUserUseCase(uow);

  it("should successfully update the user when found", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const localCommand: UpdateUserCommand = { ...user1 };

    vi.spyOn(uow.user, "findById").mockResolvedValue(user1);
    vi.spyOn(uow.user, "update").mockResolvedValue(user1);

    const user = await useCase.execute(localCommand);
    expect(user.email).toEqual(user1.email);
  });

  it("should throw an error when the user to update is not found", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const localCommand: UpdateUserCommand = { ...user1 };

    vi.spyOn(uow.user, "findById").mockResolvedValue(null);
    vi.spyOn(uow.user, "update").mockResolvedValue(user1);

    await expect(useCase.execute(localCommand))
      .rejects.toThrowError("User not found");
  });
});