import { describe, expect, it, vi, beforeEach } from "vitest";

import type { User } from "@prisma/client";

import { Context } from "@Database/Core/Context";
import { UnitOfWOrk } from "@Database/Core/UnitOfWork";
import { UserFactory } from "@Database/Factories/UserFactory";
import { UpdateUserUseCase } from "@UseCases/User/UpdateUser/UpdateUserUseCase";

describe(("update user use case"), () => {
  let user1: User;

  const uow = new UnitOfWOrk(Context);
  const useCase = new UpdateUserUseCase(uow);

  beforeEach(async () => {
    user1 = await UserFactory.build({ id: 1, password: "12345678" });
  });

  // ======================== Tests Section ============================

  it("should successfully update the user when found", async () => {
    vi.spyOn(uow.user, "findById").mockResolvedValue(user1);
    vi.spyOn(uow.user, "update").mockResolvedValue(user1);

    const user = await useCase.execute({ ...user1 });
    expect(user.email).toEqual(user1.email);
  });

  it("should throw an error when the user to update is not found", async () => {
    vi.spyOn(uow.user, "findById").mockResolvedValue(null);
    vi.spyOn(uow.user, "update").mockResolvedValue(user1);

    await expect(useCase.execute({ ...user1 }))
      .rejects.toThrowError("User not found");
  });
});