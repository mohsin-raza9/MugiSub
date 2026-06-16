import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  // Try to use DATABASE_URL from process.env if available
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    // During Next.js build, process.env.DATABASE_URL might not be fully loaded or 
    // it's not provided yet. We create a dummy pool just so the PrismaClient 
    // constructor doesn't throw. But the client won't actually be used.
    const dummyPool = new Pool({ connectionString: "postgresql://postgres:postgres@localhost:5432/dummy" });
    const dummyAdapter = new PrismaPg(dummyPool);
    return new PrismaClient({ adapter: dummyAdapter });
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
