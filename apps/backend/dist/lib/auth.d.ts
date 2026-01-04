import { FastifyRequest, FastifyReply } from 'fastify';
export declare function hashPassword(password: string): Promise<string>;
export declare function comparePassword(password: string, hash: string): Promise<boolean>;
export declare function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
