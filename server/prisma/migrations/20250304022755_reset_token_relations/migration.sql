/*
  Warnings:

  - You are about to drop the column `user_id` on the `ResetToken` table. All the data in the column will be lost.
  - Added the required column `userId` to the `ResetToken` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ResetToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ResetToken" ("id", "token") SELECT "id", "token" FROM "ResetToken";
DROP TABLE "ResetToken";
ALTER TABLE "new_ResetToken" RENAME TO "ResetToken";
CREATE UNIQUE INDEX "ResetToken_userId_key" ON "ResetToken"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
