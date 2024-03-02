-- CreateTable
CREATE TABLE "Pledge" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "consequence" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "partnerName" TEXT NOT NULL,
    "partnerEmail" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pledge_pkey" PRIMARY KEY ("id")
);
