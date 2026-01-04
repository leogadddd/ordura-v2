import { PrismaClient } from '../../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
export declare const prisma: PrismaClient<{
    adapter: PrismaPg;
    log: ("info" | "query" | "warn" | "error")[];
}, "info" | "query" | "warn" | "error", import("generated/prisma/runtime/client").DefaultArgs>;
