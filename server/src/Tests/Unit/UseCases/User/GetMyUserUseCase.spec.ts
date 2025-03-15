import { describe, expect, it, vi } from "vitest";

import { Context } from "@Database/Core/Context";
import { UnitOfWOrk } from "@Database/Core/UnitOfWork";
import { UserFactory } from "@Database/Factories/UserFactory";
import { GetMyUserUseCase } from "@UseCases/User/GetMyUser/GetMyUserUseCase";

describe(("get my user use case"), () => {
  const uow = new UnitOfWOrk(Context);
  const useCase = new GetMyUserUseCase(uow);

  // ======================== Tests Section ============================

  it("should return the user when found by ID", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    vi.spyOn(uow.user, "findById").mockResolvedValue(user1);

    const user = await useCase.execute({ userId: user1.id });
    expect(user.id).toEqual(user1.id);
  });

  it("should throw an error when the user is not found", async () => {
    vi.spyOn(uow.user, "findById").mockResolvedValue(null);

    await expect(useCase.execute({ userId: 99 }))
      .rejects.toThrowError("User not found");
  });
});