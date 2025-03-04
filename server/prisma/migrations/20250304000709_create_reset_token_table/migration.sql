-- CreateTable
CREATE TABLE "ResetToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL
);
