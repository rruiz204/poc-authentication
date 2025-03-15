import { describe, expect, it, vi, beforeEach } from "vitest";

import type { User } from "@prisma/client";

import { Context } from "@Database/Core/Context";
import { JwtService } from "@Services/JwtService";
import { HashService } from "@Services/HashService";
import { UnitOfWOrk } from "@Database/Core/UnitOfWork";
import { UserFactory } from "@Database/Factories/UserFactory";

import { SimpleAuthUseCase } from "@UseCases/Auth/SimpleAuth/SimpleAuthUseCase";

describe(("simple authentication use case"), () => {
  let user1: User;

  const uow = new UnitOfWOrk(Context);
  const useCase = new SimpleAuthUseCase(uow);

  beforeEach(async () => {
    user1 = await UserFactory.build({ id: 1, password: "12345678" });
  });

  // ======================== Tests Section ============================

  it("should return a valid token when authentication is successful", async () => {
    vi.spyOn(JwtService, "sign").mockResolvedValue("mocked token");
    vi.spyOn(HashService, "verify").mockResolvedValue(true);

    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(user1);

    const response = await useCase.execute({ ...user1 });
    expect(response.token).toEqual("mocked token");
  });

  it("should throw an error when the user is not found", async () => {
    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(null);

    await expect(useCase.execute({ ...user1 }))
      .rejects.toThrowError("User not found");
  });

  it("should throw an error when the password is incorrect", async () => {
    vi.spyOn(HashService, "verify").mockResolvedValue(false);

    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(user1);

    await expect(useCase.execute({ ...user1 }))
      .rejects.toThrowError("Invalid password");
  });
});