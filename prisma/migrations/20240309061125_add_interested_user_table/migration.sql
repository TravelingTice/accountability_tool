-- CreateTable
CREATE TABLE "InterestedUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "feature" TEXT NOT NULL,

    CONSTRAINT "InterestedUser_pkey" PRIMARY KEY ("id")
);
