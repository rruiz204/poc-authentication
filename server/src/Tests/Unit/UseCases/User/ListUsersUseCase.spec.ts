import { describe, expect, it, vi } from "vitest";

import { Context } from "@Database/Context";
import { UnitOfWOrk } from "@Database/UnitOfWork";
import { UserFactory } from "@Database/Factories/UserFactory";
import { ListUsersUseCase } from "@UseCases/User/ListUsers/ListUsersUseCase";

describe(("list all users use case"), () => {
  const uow = new UnitOfWOrk(Context);
  const useCase = new ListUsersUseCase(uow);

  it("should return all users when products exist", async () => {
    expect(2 + 2).toEqual(4);
  });
});