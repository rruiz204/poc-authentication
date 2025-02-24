-- CreateTable
CREATE TABLE "Seed" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Seed_name_key" ON "Seed"("name");
