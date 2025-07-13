import { PrismaClient } from '@/generated/prisma';
import { createClient } from '@libsql/client';

const globalForPrisma = global as unknown as { 
  prisma: PrismaClient;
  turso: ReturnType<typeof createClient>;
};

// Create Turso client for direct usage
export const turso = globalForPrisma.turso || (process.env.TURSO_DATABASE_URL ? createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
}) : null);

// Keep Prisma for local development
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
  if (turso) globalForPrisma.turso = turso;
} 