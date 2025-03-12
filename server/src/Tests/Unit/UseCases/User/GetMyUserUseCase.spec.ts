import { describe, expect, it, vi } from "vitest";

import { Context } from "@Database/Context";
import { UnitOfWOrk } from "@Database/UnitOfWork";
import { UserFactory } from "@Database/Factories/UserFactory";
import { GetMyUserUseCase } from "@UseCases/User/GetMyUser/GetMyUserUseCase";

import type { GetMyUserQuery } from "@UseCases/User/GetMyUser/GetMyUserQuery";

describe(("get my user use case"), () => {
  const uow = new UnitOfWOrk(Context);
  const useCase = new GetMyUserUseCase(uow);

  it("should return the user when found by ID", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const localQuery: GetMyUserQuery = {  userId: user1.id };
    vi.spyOn(uow.user, "findById").mockResolvedValue(user1);

    const user = await useCase.execute(localQuery);
    expect(user.id).toEqual(user1.id);
  });

  it("should throw an error when the user is not found", async () => {
    const localQuery: GetMyUserQuery = { userId: 99 };
    vi.spyOn(uow.user, "findById").mockResolvedValue(null);

    await expect(useCase.execute(localQuery))
      .rejects.toThrowError("User not found");
  });
});