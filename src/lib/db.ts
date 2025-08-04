import { PrismaClient } from "./prisma";

// Global olarak Prisma Client'i tanımla (Development'ta hot reload sırasında bağlantı sorunları yaşanmaması için)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
