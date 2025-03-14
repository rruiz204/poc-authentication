import { describe, expect, it, afterEach } from "vitest";

import { Context } from "@Database/Context";
import { UnitOfWOrk } from "@Database/UnitOfWork";
import { UserFactory } from "@Database/Factories/UserFactory";

describe("user repository", async () => {
  const uow = new UnitOfWOrk(Context);

  afterEach(async () => {
    await Context.user.deleteMany();
  });

  it("", async () => {
    const password = "12345678";

    const user1 = await UserFactory.build({ id: 1, password });
    const user2 = await UserFactory.build({ id: 2, password });
    const user3 = await UserFactory.build({ id: 3, password });

    await Context.user.createMany({ data: [user1, user2, user3] });
    const users = await uow.user.list({ limit: 10, offset: 0 });
    expect(users.length).toEqual(3);
  });

  it("should create a user in the database", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    await uow.user.create({ create: { ...user1 } });

    const user = await Context.user.findFirst({ where: { email: user1.email } });
    expect(user?.email).toEqual(user1.email);
  });

  it("should delete a user in the database", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const created = await Context.user.create({ data: { ...user1 } });

    await uow.user.delete({ id: created.id });
    const counter = await Context.user.count();
    expect(counter).toEqual(0);
  });

  it("should update the data of a user", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const created = await Context.user.create({ data: { ...user1 } });

    const fakeName = "Patrocolo Perez";
    const updated = await uow.user.update({ id: created.id, update: { name: fakeName } });
    expect(updated.name).toEqual(fakeName);
  });

  it("should find a user by its id", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const created = await Context.user.create({ data: { ...user1 } });

    const user = await uow.user.findById(created.id);
    expect(user?.email).toEqual(user1.email);
  });

  it("should find a user by its email", async () => {
    const user1 = await UserFactory.build({ id: 1, password: "12345678" });
    const created = await Context.user.create({ data: { ...user1 } });

    const user = await uow.user.findByEmail(created.email);
    expect(user?.email).toEqual(user1.email);
  });
});