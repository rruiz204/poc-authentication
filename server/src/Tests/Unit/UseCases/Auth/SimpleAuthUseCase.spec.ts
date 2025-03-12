import { describe, expect, it, vi } from "vitest";

import { Context } from "@Database/Context";
import { UnitOfWOrk } from "@Database/UnitOfWork";
import { JwtService } from "@Services/JwtService/Service";
import { HashService } from "@Services/HashService/Service";
import { UserFactory } from "@Database/Factories/UserFactory";

import { SimpleAuthUseCase } from "@UseCases/Auth/SimpleAuth/SimpleAuthUseCase";
import type { SimpleAuthCommand } from "@UseCases/Auth/SimpleAuth/SimpleAuthCommand";

describe(("simple authentication use case"), () => {
  const uow = new UnitOfWOrk(Context);
  const useCase = new SimpleAuthUseCase(uow);

  it("should return a valid token when authentication is successful", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const command: SimpleAuthCommand = { ...user1 };

    vi.spyOn(JwtService, "sign").mockResolvedValue("mocked token");
    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(user1);
    vi.spyOn(HashService, "verify").mockResolvedValue(true);

    const response = await useCase.execute(command);
    expect(response.token).toEqual("mocked token");
  });

  it("should throw an error when the user is not found", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const command: SimpleAuthCommand = { ...user1 };

    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(null);

    await expect(useCase.execute(command))
      .rejects.toThrowError("User not found");
  });

  it("should throw an error when the password is incorrect", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const command: SimpleAuthCommand = { ...user1 };

    vi.spyOn(uow.user, "findByEmail").mockResolvedValue(user1);
    vi.spyOn(HashService, "verify").mockResolvedValue(false);

    await expect(useCase.execute(command))
      .rejects.toThrowError("Invalid password");
  });
});