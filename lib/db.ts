import { PrismaClient } from '@prisma/client';

// Use a global variable to reuse the PrismaClient in development (to prevent hot reload issues)
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;