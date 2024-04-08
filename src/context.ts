import { PrismaClient, Prisma } from "@prisma/client";
import { decodeAuthHeader, AuthTokenPayload } from "./utils/auth";
import { Request } from "express";
import { BaseContext } from "@apollo/server";

export const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error']});

export interface Context extends BaseContext {
  prisma: PrismaClient;
  userId?: number;
}

// Context for v3
export const context = async ({ req }: { req: Request }): Promise<Context> => {
  const token = req && req.headers.authorization ? decodeAuthHeader(req.headers.authorization) : null;
  return {
    prisma,
    userId: token?.userId,
  };
};

//Context for v4
export const createContext = async ({ req }: { req: Request }): Promise<Context> => {
  const token = req && req.headers.authorization ? decodeAuthHeader(req.headers.authorization) : null;
  return {
    prisma: new PrismaClient({log: ['query', 'info', 'warn', 'error']}),
    userId: token?.userId,
  };
};


/**
 * prisma: new PrismaClient({
    /*transactionOptions: {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      maxWait: 30000, // default: 2000
      timeout: 30000, // default: 5000
    },
	log: ['query', 'info', 'warn', 'error'],
}),
 */