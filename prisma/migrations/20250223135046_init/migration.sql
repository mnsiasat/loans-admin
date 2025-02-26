CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "SequelizeMeta" (
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "loans" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "applicantName" VARCHAR(255) NOT NULL,
    "requestedAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "status" "Status" DEFAULT 'PENDING',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);
