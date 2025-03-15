import { describe, expect, it, vi } from "vitest";

import { Context } from "@Database/Core/Context";
import { UnitOfWOrk } from "@Database/Core/UnitOfWork";
import { UserFactory } from "@Database/Factories/UserFactory";
import { ListUsersUseCase } from "@UseCases/User/ListUsers/ListUsersUseCase";

describe(("list all users use case"), () => {
  const uow = new UnitOfWOrk(Context);
  const useCase = new ListUsersUseCase(uow);
  const pagination = { page: 1, limit: 10 };

  // ======================== Tests Section ============================

  it("should return all users when products exist", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const user2 = await UserFactory.build({ id: 2, password: "12345678" });

    vi.spyOn(uow.user, "list").mockResolvedValue([ user1, user2 ]);
    const users = await useCase.execute({ ...pagination });
    expect(users.length).toEqual(2);
  });

  it("should return an empty list when no users exist", async () => {
    vi.spyOn(uow.user, "list").mockResolvedValue([]);
    const users = await useCase.execute({ ...pagination });
    expect(users.length).toEqual(0);
  });
});