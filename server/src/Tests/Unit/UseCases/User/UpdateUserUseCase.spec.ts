import { describe, expect, it, vi } from "vitest";

import { Context } from "@Database/Context";
import { UnitOfWOrk } from "@Database/UnitOfWork";
import { UserFactory } from "@Database/Factories/UserFactory";
import { UpdateUserUseCase } from "@UseCases/User/UpdateUser/UpdateUserUseCase";

import type { UpdateUserCommand } from "@UseCases/User/UpdateUser/UpdateUserCommand";

describe(("update user use case"), () => {
  const uow = new UnitOfWOrk(Context);
  const useCase = new UpdateUserUseCase(uow);

  it("positive", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const localCommand: UpdateUserCommand = { ...user1 };

    vi.spyOn(uow.user, "findById").mockResolvedValue(user1);
    vi.spyOn(uow.user, "update").mockResolvedValue(user1);

    const user = await useCase.execute(localCommand);
    expect(user.email).toEqual(user1.email);
  });

  it("negative", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const localCommand: UpdateUserCommand = { ...user1 };

    vi.spyOn(uow.user, "findById").mockResolvedValue(null);
    vi.spyOn(uow.user, "update").mockResolvedValue(user1);

    const user = await useCase.execute(localCommand);
    expect(user).toBeNull();
  });
});